// ==UserScript==
// @name Steam Market Helper
// @description Automatically purchase items when they're below your budget, or just let the script agree to the SSA for you, so you can purchase in one click!
// @author SMH
// @copyright SMH, 2014

// @version 3.61

// @updateURL http://userscripts.org/scripts/source/174037.meta.js
// @downloadURL http://userscripts.org/scripts/source/174037.user.js

// @homepage http://userscripts.org/scripts/show/174037
// @icon http://s3.amazonaws.com/uso_ss/icon/174037/large.jpg

// @include http://steamcommunity.com/market/listings/*
// @include https://steamcommunity.com/market/listings/*
// @include http://steamcommunity.com/market/*
// @include https://steamcommunity.com/market/*

// SMH update history - minor updates (e.g. x.x1 or x.1a) are not listed.

// @history 3.6 : Fixed accidental purchase bug (hopefully...).
// @history 3.5 : Added 'override reload' option.
// @history 3.4 : Added a built-in console log, and updated logging code accordingly.
// @history 3.3 : Added a built-in help page, and the ability to stop the script with 'esc'.
// @history 3.2 : Data is displayed in input boxes across reloads, added 'stop' and 'reset' buttons, and enabled repeat purchases in 'newly listed' mode.
// @history 3.1 : Added 'related game' option to 'newly listed' mode, and fake detection.
// @history 3.0 : Added support for the 'newly listed' tab, a 'profit' option, notifications, 'devmode', and a ticking countdown timer for refreshes.
// @history 2.6 : Restructured the entire script to make room for future improvements, and added 'no-listing mode'.
// @history 2.5 : Added significantly better error detection.
// @history 2.4 : Improved the way currency is handled.
// @history 2.0 : Now uses 'sessionStorage' instead of URL variables.
// @history 1.5 : Added support for more languages and currencies.
// @history 1.4 : Added injected form for setting options, instead of manual URL variables.
// @history 1.2 : Added support for auto-buying and auto-reloading.
// @history 1.1 : Added support for budgeting.
// @history 1.0 : Initial release.

// @run-at document-end
// ==/UserScript==

"use strict";

var devMode = false; // Enable devMode if you want to work on Steam Market Helper. While devMode is enabled, purchases are not made, but the rest of the script remains functional.
var overrideReload = false; // Enable if you have an extension active that auto-reloads Chrome when internet errors occur.

var version = "3.61";
var smhLogo = "http://s3.amazonaws.com/uso_ss/icon/174037/large.jpg";
var smhURL = "http://userscripts.org/scripts/show/174037";
var pageSuccess;
var listingOverride;

var smhParameters = " \
<div id=\"Steam_Market_Helper\"> \
</br>My budget (no currency symbol!):</br> \
<input type=\"text\" name=\"budget\" id=\"budget\" value=\""+ ((sessionStorage.budget != "" && sessionStorage.budget != undefined) ? (sessionStorage.budget) : "0") +"\" maxlength=\"16\"> </br> \
</br>Minimum profit (no currency symbol!):</br> \
<input type=\"text\" name=\"profit\" id=\"profit\" value=\""+ ((sessionStorage.profit != "" && sessionStorage.profit != undefined) ? (sessionStorage.profit) : "0") +"\" maxlength=\"16\"> </br></br> \
<input type=\"checkbox\" name=\"autobuy\" id=\"autobuy\" value=\"true\""+ ((sessionStorage.autobuy == "true") ? "checked=\"checked\"" : "") +"\"> Auto-Buy </br> \
<input type=\"checkbox\" name=\"autoreload\" id=\"autoreload\" value=\"true\""+ ((sessionStorage.autoreload == "true") ? "checked=\"checked\"" : "") +"\"> Auto-Reload </br> \
<input type=\"checkbox\" name=\"repeatpurchase\" id=\"repeatpurchase\" value=\"true\""+ ((sessionStorage.repeatpurchase == "true") ? "checked=\"checked\"" : "") +"\"> Enable repeat purchases </br></br> \
Max Purchases: <input type=\"text\" name=\"maxpurchases\" id=\"maxpurchases\" value=\""+ ((sessionStorage.maxpurchases != "" && sessionStorage.maxpurchases != undefined) ? (sessionStorage.maxpurchases) : "1") +"\" maxlength=\"3\"> </br></br> \
<input type=\"checkbox\" name=\"slowmode\" id=\"slowmode\" value=\"true\""+ ((sessionStorage.slowmode == "true") ? "checked=\"checked\"" : "") +"\"> Use slow mode (limits refresh speed) </br> \
&nbsp;&nbsp;&nbsp;&nbsp; Min wait: <input type=\"text\" name=\"minwait\" id=\"minwait\" value=\""+ ((sessionStorage.minwait != "" && sessionStorage.minwait != undefined) ? (sessionStorage.minwait) : "4") +"\" maxlength=\"3\"> </br> \
&nbsp;&nbsp;&nbsp;&nbsp; Max wait: <input type=\"text\" name=\"maxwait\" id=\"maxwait\" value=\""+ ((sessionStorage.maxwait != "" && sessionStorage.maxwait != undefined) ? (sessionStorage.maxwait) : "8") +"\" maxlength=\"3\"> </br></br> \
<input type=\"checkbox\" name=\"confirm\" id=\"confirm\" value=\"true\""+ ((sessionStorage.confirm == "true") ? "checked=\"checked\"" : "") +"\"> I confirm I want to purchase this item </br></br> \
<button id=\"submit\" style=\"width:125px\">Start</button>&nbsp;&nbsp;&nbsp;&nbsp;<button id=\"stop\" style=\"width:100px\">Stop</button>&nbsp;&nbsp;&nbsp;&nbsp;<button id=\"reset\" style=\"width:100px\">Reset</button> </br></br> \
<span style=\"font-size:10px;\">Steam Market Helper v" + version + "</span> </br> \
<span id=\"notificationenable\" style=\"font-size:10px;cursor:pointer;\">Click here to enable notifications.</span> \
<input type=\"hidden\" name=\"currentpurchaseid\" id=\"currentpurchaseid\" value=\""+ ((sessionStorage.currentpurchaseid != "" && sessionStorage.currentpurchaseid != undefined) ? (sessionStorage.currentpurchaseid) : "1") +"\" maxlength=\"3\"> </br></br>  \
</div> \
";

var smhParameters_m = " \
<div id=\"Steam_Market_Helper_nl\"> \
<div class=\"market_search_sidebar_contents\"> \
<h2 class=\"market_section_title\">SMH (BETA) </h2> </br> \
I'm looking for:</br> \
<input type=\"text\" name=\"itemname\" id=\"itemname\" value=\""+ ((sessionStorage.itemname != "" && sessionStorage.itemname != undefined) ? (sessionStorage.itemname) : "")  +"\" maxlength=\"64\"> (Item Name)</br> \
<input type=\"text\" name=\"gamename\" id=\"gamename\" value=\""+ ((sessionStorage.itemgame != "" && sessionStorage.itemgame != undefined) ? (sessionStorage.itemgame) : "") +"\" maxlength=\"64\"> (Related Game)</br> </br> \
My budget (no currency symbol!):</br> \
<input type=\"text\" name=\"budget\" id=\"budget\" value=\""+ ((sessionStorage.budget != "" && sessionStorage.budget != undefined) ? (sessionStorage.budget) : "0") +"\" maxlength=\"16\"> </br></br> \
<input type=\"checkbox\" name=\"autobuy\" id=\"autobuy\" value=\"true\""+ ((sessionStorage.autobuy == "true") ? "checked=\"checked\"" : "") +"\"> Auto-Buy </br> \
<input type=\"checkbox\" name=\"autoreload\" id=\"autoreload\" value=\"true\""+ ((sessionStorage.autoreload == "true") ? "checked=\"checked\"" : "") +"\"> Auto-Reload </br> \
<input type=\"checkbox\" name=\"repeatpurchase\" id=\"repeatpurchase\" value=\"true\""+ ((sessionStorage.repeatpurchase == "true") ? "checked=\"checked\"" : "") +"\"> Enable repeat purchases </br></br> \
Max purchases: <input type=\"text\" name=\"maxpurchases\" id=\"maxpurchases\" value=\""+ ((sessionStorage.maxpurchases != "" && sessionStorage.maxpurchases != undefined) ? (sessionStorage.maxpurchases) : "1") +"\" maxlength=\"3\"> </br></br> \
<input type=\"checkbox\" name=\"slowmode\" id=\"slowmode\" value=\"true\""+ ((sessionStorage.slowmode == "true") ? "checked=\"checked\"" : "") +"\"> Use slow mode (limits refresh speed) </br> \
&nbsp;&nbsp;&nbsp;&nbsp; Min wait: <input type=\"text\" name=\"minwait\" id=\"minwait\" value=\""+ ((sessionStorage.minwait != "" && sessionStorage.minwait != undefined) ? (sessionStorage.minwait) : "4") +"\" maxlength=\"3\"> </br> \
&nbsp;&nbsp;&nbsp;&nbsp; Max wait: <input type=\"text\" name=\"maxwait\" id=\"maxwait\" value=\""+ ((sessionStorage.maxwait != "" && sessionStorage.maxwait != undefined) ? (sessionStorage.maxwait) : "8") +"\" maxlength=\"3\"> </br></br> \
<input type=\"checkbox\" name=\"confirm\" id=\"confirm\" value=\"true\""+ ((sessionStorage.confirm == "true") ? "checked=\"checked\"" : "") +"\"> I confirm I want to purchase this item </br></br> \
<button id=\"submit\" style=\"width:150px\">Start</button> </br> <button id=\"stop\" style=\"width:150px\">Stop</button> </br> <button id=\"reset\" style=\"width:150px\">Reset</button> </br></br> \
<span style=\"font-size:10px;\">Steam Market Helper v" + version + "</span> \
<input type=\"hidden\" name=\"currentpurchaseid\" id=\"currentpurchaseid\" value=\""+ ((sessionStorage.currentpurchaseid != "" && sessionStorage.currentpurchaseid != undefined) ? (sessionStorage.currentpurchaseid) : "1") +"\" maxlength=\"3\"> </br></br>  \
</div> \
</div> \
</div>";

var smhHelp = " \
<div id=\"smhHelp\" style=\"border:solid 3px rgb(125,125,125);position:fixed;left:50%;top:50%;background-color:rgb(75,75,75);z-index:2000;height:600px;margin-top:-300px;width:700px;margin-left:-350px;visibility:hidden;-webkit-box-shadow:0 8px 20px 5px rgba(0,0,0,0.75);font-family:Verdana;color:rgb(220,220,220);font-size:14px;overflow-y:hidden;\"> \
<div id=\"smhHelp_pad\" style=\"padding:20px\"> \
<div id=\"smhHelp_logo\ style=\"display:block;margin-left:auto;margin-right:auto;\"> <a href=\""+smhURL+"\"><img src=\""+smhLogo+"\" width=\"128\" height=\"128\" style=\"display:block;margin:0 auto;-webkit-border-radius:15px;-webkit-box-shadow: 0px 0px 10px #707070;\"></a> </div> \
<div id=\"smhHelp_maintitle\" style=\"text-align:center;font-size:26px;font-weight:bold;\"\> Steam Market Helper v"+version+" </div></br> \
<div id=\"smhHelp_intro\" style=\"text-align:center;\"> This is a run-down of the features of Steam Market Helper, and how to use them.</br>Listed here is each configurable parameter with an example, and long description.</br>At the bottom is a F.A.Q. - please read it before asking for assistance on the forum.</div></br> \
<b>Item Name : 'Mann Co. Supply Crate Key'</b></br>Takes the exact name of the item you want to purchase. You must enter the full name, including any special symbols, or else Steam Market Helper will not find the item you want. Partial matches will be ignored (e.g. 'Knife X' won't match 'Knife XX'). </br></br> \
<b>Related Game : 'Team Fortress 2'</b></br>Takes the exact name of the game from which your item belongs. Again, you must enter the entire name including symbols, and partial matches will be ignored. </br></br> \
<b>My Budget : '3.14'</b></br>Takes the maximum amount you are willing to spend on the item. If the cheapest item currently available costs more than your budget, it will not be purchased. You do not need to enter your currency as this will be detected automatically. Note that budget is formatted with a period, and not a comma. </br></br> \
<b>Minimum Profit : '0.20'</b></br>Takes the amount of profit you want to make from buying/selling the item. Profit is calculated by taking the sale price of the cheapest item, and subtracting it from the sale price of the 2nd cheapest item. This setting is a 'best case scenario' - after taxes you may not get the profit you entered here. Remember, you are still responsible for actually selling the item. Steam Market Helper provides this as a guide only. </br></br> \
<b>Auto-Buy</b></br>When enabled, the item will be purchased for you as long as it costs less than your budget. If disabled, then Steam Market Helper will simply check the SSA agree button, and you must click buy manually. </br></br> \
<b>Auto-Reload</b></br>When enabled, the page will be refreshed automatically if the item you want is over-budget (or if the item can't be found when on the Newly Listed tab). </br></br> \
<b>Enable Repeat Purchases</b></br>When enabled, Steam Market Helper will continuously purchase under-budget items for you. You should use this in conjunction with the 'Max Purchases' setting. </br></br> \
<b>Max Purchases : '20'</b></br>Takes the maximum number of items you want the script to purchase for you. All items will be purchased at or under budget, so ensure you have enough money in your Steam wallet before using this option. Only active if you have 'Enable Repeat Purchases' checked. </br></br> \
<b>Use Slow Mode</b></br>When enabled, Steam Market Helper will wait a random amount of time between the 'Min Wait' and 'Max Wait' values before refreshing the page. This option is there for your safety. If you choose to leave it disabled, be aware that you are significantly more likely to face a ban or suspension. </br></br> \
<b>Min Wait & Max Wait : '10 & 20'</b></br>Takes the minimum and maximum amount of time you want to wait between refreshes. A wait time will be randomly generated that is between these two values. Used in conjunction with 'Use Slow Mode'. </br></br> \
<b>I Confirm I Want to Purchase this Item</b></br>MUST be enabled in order for Steam Market Helper to purchase items for you. Checking this box means you agree that any actions performed by Steam Market Helper are entirely your own responsibility. </br></br> \
<div id=\"smhHelp_faqtitle\" style=\"text-align:center;font-size:30px;font-weight:bold;\"\> F.A.Q. </div></br> \
<b>Will I get banned using Steam Market Helper?</b></br>This depends on <i>you</i>. If you use Steam Market Helper sensibly then the risk of being banned is essentially zero. However, if you insist on running the script as fast as possible for hours on end, well... I think you can guess what might happen. </br></br> \
<b>Is Steam Market Helper safe?</b></br>Hopefully, you will have read the source code before you downloaded Steam Market Helper (you should always review userscripts before adding them to your browser). If you have browsed the code, you'll see that Steam Market Helper is completely safe. It does not access any website other than the Steam Market, it does not have access to your login details, and it does not store any data permanently. </br></br> \
<b>The script isn't detecting my currency, what should I do?</b></br>Almost all currency errors are because of scripts conflicting with Steam Market Helper. Please ensure you aren't using any other scripts that modify the Steam Market. </br></br> \
<b>I'm getting 'No Data Received', what causes this?</b></br>Steam goes down. A lot. If you're getting 'No Data Received' then it's because Steam is failing, not the script. Unfortunately, errors like this can't be detected by scripts, so a fix will almost certainly never be available. </br></br> \
</div></div>";

var smhConsole = " \
<div id=\"smhConsole\" style=\"border:solid 3px rgb(125,125,125);position:fixed;left:50%;top:50%;background-color:rgb(75,75,75);z-index:2001;height:500px;margin-top:-250px;width:900px;margin-left:-450px;visibility:hidden;-webkit-box-shadow:0 8px 20px 5px rgba(0,0,0,0.75);font-family:Verdana;color:rgb(220,220,220);font-size:14px;overflow-y:hidden;\"> \
<div id=\"smhConsole_pad\" style=\"padding:20px\"> \
<div id=\"smhConsole_maintitle\" style=\"text-align:center;font-size:26px;font-weight:bold;\"\> Steam Market Helper v"+version+" - Console </div></br> \
<div id=\"smhConsole_output\" style=\"text-align:left;font-family:Monospace;\"></div></br> \
</div></div>";

// <b>NAME : 'EXAMPLE'</b></br>DESCRIPTION </br></br> \

window.pagebody = document.getElementById("global_header");
window.pagebody.innerHTML += smhHelp + " " + smhConsole;
window.smhconsole = document.getElementById("smhConsole_output");

function init() {
    var browser_raw = navigator.userAgent;
    
    if (browser_raw.indexOf("Chrome") !== -1) {
        window.browser = "chrome";
    } else  if (browser_raw.indexOf("Firefox") !== -1) {
        window.browser = "firefox";
    } else {
        window.browser = browser_raw;
    }
    
    if (window.browser == "chrome") {      
        var tableMessages = [];
        function getElementsByClassName(classname, node)  {
            if(!node) {
                node = document.getElementsByTagName("body")[0];
            }
            
            var _regexp = new RegExp('\\b' + classname + '\\b');
            var _elements = node.getElementsByTagName("*");
            
            for(var i=0, j=_elements.length; i<j; i++) {
                if(_regexp.test(_elements[i].className)) { 
                    tableMessages.push(_elements[i]);
                }
            }
            return tableMessages;
        }
        
        tableMessages = getElementsByClassName('market_listing_table_message');
        
        if(tableMessages.length > 0){
            pageSuccess = false;
            
            if (tableMessages[0].innerHTML.indexOf("There are no listings for this item.") != -1) {
                listingOverride = true;
                
                consoleLog("SMH detected that there are no items currently available.");   
            } else {
                listingOverride = false;
                
                consoleLog("SMH detected an error. Reloading in 3 seconds...");
                consoleLog("SessionStorage is uneffected. Purchases will continue as normal.");
                
                setTimeout(function(){ sessionStorage.reload = "true"; window.location.reload(false); },(3000));
            }
        } else {
            pageSuccess = true;
        }
        
        window.pagebody = document.getElementById("global_header");
        window.listPrices = document.getElementsByClassName('market_listing_price_with_fee');
        window.itemDescription = document.getElementById('largeiteminfo');
        window.buyNowButtons = document.getElementsByClassName('item_market_action_button_green');
        window.agreeToSSA = document.getElementById('market_buynow_dialog_accept_ssa');
        window.costOutput = document.getElementById('market_buynow_dialog_totals_total');
        window.dialogTitle = document.getElementById('market_buynow_dialog_title');
        window.errorContainer = document.getElementById('market_buynow_dialog_error_text');
        
    } else if (window.browser == "firefox") {
        // Firefox still doesn't work.
        // Can't get costOutput or dialogTitle because of updating issues. A mutation observer can solve this, but that's not happening any time soon (or ever).
        // If you're trying to use Steam Market Helper and Firefox, you're gonna have a bad time.
        
        window.header = document.getElementById('global_header');
        window.header.innerHTML = "<span style=\"font-size:28px;font-weight:bold;color:red;\">STEAM MARKET HELPER IS NOT COMPATIBLE WITH FIREFOX!</br><a href=\"https://www.google.com/intl/en/chrome/browser/\">PLEASE DOWNLOAD GOOGLE CHROME! (CLICK FOR DOWNLOAD PAGE)</a></span>";
        
        alert("Firefox is not compatible with Steam Market Helper.\nSteam Market Helper is not available.");
    } else {
        alert("You're using an unsupported browser.\nSteam Market Helper is not available.");
    }
}

function detect_smh() {
    if (sessionStorage.reload == "true" || overrideReload == true) {       
        consoleLog("SMH Version:", version);
        consoleLog("This page was retrieved using Steam Market Helper.");
        
        sessionStorage.reload = "false";
    } else {      
        consoleLog("SMH Version:", version);
        consoleLog("This page was retrieved manually.");
        
        sessionStorage.clear();
        sessionStorage.reload = "false";
    }
    
    if (!sessionStorage.currentpurchaseid) {
        sessionStorage.currentpurchaseid = 1;   
    }   
    
}

function setup_smh_default() {   
    var smhTitle = "<span style=\"font-size:24px;font-weight:bold;color:#fff;\">Steam Market Helper</span>";
    
    try {
        var cheapestItem = window.listPrices[0].innerHTML;
        var secondCheapestItem = window.listPrices[1].innerHTML;
        
        var cheapestItem = cheapestItem.replace(/[^\d.-]/g, '').replace(',', '.');
        var secondCheapestItem = secondCheapestItem.replace(/[^\d.-]/g, '').replace(',', '.');
    } catch (error) {
        var cheapestItem = 0;
        var secondCheapestItem = 0;
        
        consoleLog("SMH Warning:", "Error getting prices; profit cannot be determined.");
    }
    
    window.potentialProfit = parseFloat(secondCheapestItem - cheapestItem);
    
    window.itemDescription.innerHTML += "</br><hr>" + smhTitle + smhParameters;    
    window.buyNowButtons[0].click();
    window.agreeToSSA.checked = true;
    window.totalCost = window.costOutput.innerHTML; 
    
    if (window.totalCost.indexOf('£') !== -1) {
        window.currency = [["pounds","£"]];
    } else if (window.totalCost.indexOf('R$') !== -1) {
        window.currency = [["real","R$"]];
    } else if (window.totalCost.indexOf('$') !== -1) {
        window.currency = [["dollars","$"]];
    } else if (window.totalCost.indexOf('€') !== -1) {
        window.currency = [["euros","€"]];
    } else if (window.totalCost.indexOf('\u0443') !== -1) {
        window.currency = [["rubles","R"]];
    } else {
        window.currency = [["Could not be determined","X"]];
    }
    
    if (window.currency[0][0] == "pounds") {
        window.rawCost = window.totalCost.split('£')[1];
    } else if (window.currency[0][0] == "real") {
        var rawCost_real = window.totalCost.split('R$ ')[1];
        window.rawCost = rawCost_real.replace(',' , '.');
    } else if (window.currency[0][0] == "dollars") {
        window.rawCost = window.totalCost.split('$')[1];
    } else if (window.currency[0][0] == "euros") {
        var rawCost_euro = window.totalCost.split('€')[0];
        window.rawCost = rawCost_euro.replace(',' , '.');
    } else if (window.currency[0][0] == "rubles") {
        var rawCost_ruble = window.totalCost.split(' ')[0];
        window.rawCost = rawCost_ruble.replace(',' , '.');
    } else {
        window.rawCost = 0;
    }
}

function checkForErrors() {
    var errorMessage = [
        "You cannot purchase this item because somebody else has already purchased it.",
        "There was a problem purchasing your item. The listing may have been removed. Refresh the page and try again.",
        "There was an error getting listings for this item. Please try again later.",
        "No puedes comprar este artículo porque ya lo ha comprado otro usuario.",
        "Se ha producido un problema al comprar tu artículo. Puede que se haya eliminado la publicación. Actualiza la página e inténtalo de nuevo.",
        "Se ha producido un error al obtener las publicaciones de este artículo. Por favor, inténtalo de nuevo más tarde.",
        "Sie können diesen Artikel nicht kaufen, da er bereits von jemand anderem gekauft wurde.",
        "Beim Kauf Ihres Artikels ist ein Problem aufgetreten. Das Angebot wurde möglicherweise entfernt. Aktualisieren Sie die Seite und versuchen Sie es erneut.",
        "Você não pode comprar este item porque outra pessoa já o comprou.",
        "Ocorreu um problema com a compra do seu item. É possível que a lista tenha sido removida. Atualize a página e tente novamente.",
        "Não podes comprar este item porque outra pessoa já o comprou.",
        "Ocorreu um problema com a compra do teu item. É possível que o anúncio do item tenha sido removido. Atualiza a página e tenta novamente.",
        "Vous ne pouvez pas acheter cet objet car celui-ci a déjà été acheté par un autre utilisateur.",
        "Un problème est survenu lors de l'achat de l'objet. Il se peut que l'offre ait été supprimée. Actualisez la page puis réessayez."
    ];
    
    for (var i = 0; i < errorMessage.length; i++) {
        if (window.errorContainer.innerHTML.indexOf(errorMessage[i]) != -1) {
            return true;   
        }
    }
}

function checkPurchaseSuccess() {   
    if (checkForErrors()) {
        window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:red;\">Purchase failed. Retrying...</span>";
        
        consoleLog("Purchase attempt failed! Retrying...");
        
        sessionStorage.reload = "true";
        window.location.reload(false);
    } else {
        if (sessionStorage.repeatpurchase == "true" && Number(sessionStorage.maxpurchases) != 1 && Number(sessionStorage.currentpurchaseid) < Number(sessionStorage.maxpurchases)) {
            if (sessionStorage.currentpurchaseid) {
                sessionStorage.currentpurchaseid = Number(sessionStorage.currentpurchaseid) + 1;
                
                if (sessionStorage.slowmode == "true") {
                    if (Number(sessionStorage.maxwait) > Number(sessionStorage.minwait)) {
                        var delay = Math.floor(Math.random() * (Number(sessionStorage.maxwait) - Number(sessionStorage.minwait) + 1)) + Number(sessionStorage.minwait);    
                        consoleLog("Delay by:", delay);
                        
                    } else {
                        var delay = 3;
                        consoleLog("Invalid options were chosen for the delay. Using 3 second default.");
                        
                    }
                    
                    window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:#66CC00;\">Item purchased (" + (Number(sessionStorage.currentpurchaseid) - 1) + " of " + Number(sessionStorage.maxpurchases) + "). Continuing in " + delay + " seconds... </span>";
                    showNotification(smhLogo, "Item Purchased", "SMH just purchased an item for you!\nStatus: " + (Number(sessionStorage.currentpurchaseid) - 1) + " of " + Number(sessionStorage.maxpurchases) + " completed.");
                    setTimeout(function(){ sessionStorage.reload = "true"; window.location.reload(false); },(delay*1000));
                } else {
                    window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:#66CC00;\">Item purchased (" + (Number(sessionStorage.currentpurchaseid) - 1) + " of " + Number(sessionStorage.maxpurchases) + "). Continuing in 3 seconds... </span>";
                    showNotification(smhLogo, "Item Purchased", "SMH just purchased an item for you!\nStatus: " + (Number(sessionStorage.currentpurchaseid) - 1) + " of " + Number(sessionStorage.maxpurchases) + " completed.");
                    setTimeout(function(){ sessionStorage.reload = "true"; window.location.reload(false); },3000);
                }
            } else {
                sessionStorage.currentpurchaseid = 1;
            }
        } else {
            window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:#66CC00;\">SMH: " + Number(sessionStorage.maxpurchases) + " item/s purchased! </span>"; 
            
            sessionStorage.clear();
            sessionStorage.currentpurchaseid = 1;
            
            showNotification(smhLogo, "Purchase Complete", "SMH has finished purchasing your item/s.\nThank you for using Steam Market Helper.");
        }
    }
}

function smh() { 
    if (sessionStorage.budget == null || sessionStorage.budget == undefined || window.rawCost == 0) {        
        window.dialogTitle.innerHTML = "<span style=\"color:#0f0;\">SMH v" + version + " initialized! Close this dialog to configure Steam Market Helper.</span>";
        window.costOutput.innerHTML = "<span style=\"font-size:48px;font-weight:bold;color:white;\">" + window.totalCost + "</span> </br>Not cheap enough?</br>Hit F5 to refresh.";
    } else if (parseFloat(sessionStorage.budget) - window.rawCost >= 0) {
        window.costOutput.innerHTML = "<span style=\"font-size:48px;font-weight:bold;color:#66CC00;\">" + window.totalCost + "</span>";
        window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:#66CC00;\">This item is within your budget!</span>";
        
        if (window.potentialProfit >= sessionStorage.profit) {
            if (sessionStorage.autobuy == "true") {
                if (sessionStorage.confirm == "true") {
                    var purchaseButton = document.getElementById('market_buynow_dialog_purchase');
                    
                    window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:yellow;\">Attempting purchase " + Number(sessionStorage.currentpurchaseid) + " of " + Number(sessionStorage.maxpurchases) + ". Please wait...</span>";
                    
                    if (!devMode) {
                        purchaseButton.click();
                    }
                    
                    setTimeout(checkPurchaseSuccess,8000);
                } else {
                    window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:red;\"> You didn't confirm autobuy. Please manual purchase instead! </span>";
                }
            } else {
                // Don't autobuy.
            }
        } else {
            window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:red;\"> Not enough profit to be made (" + window.currency[0][1] + Number(window.potentialProfit).toFixed(2) + ").</span>";
            window.agreeToSSA.checked = false;
            
            if (sessionStorage.slowmode == "true") {
                if (parseFloat(sessionStorage.maxwait) > parseFloat(sessionStorage.minwait)) {
                    var delay = Math.floor(Math.random() * (parseFloat(sessionStorage.maxwait) - parseFloat(sessionStorage.minwait) + 1)) + parseFloat(sessionStorage.minwait);    
                    consoleLog("Delay by:", delay);
                    
                } else {
                    var delay = 5;
                    consoleLog("Invalid options were chosen for the delay. Using 5 second default.");
                    
                }
                
                setInterval(function () { 
                    delay--; 
                    
                    if (delay > 1) {
                        window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:red;\"> Not enough profit to be made (" + window.currency[0][1] + Number(window.potentialProfit).toFixed(2) + "). Reloading in " + delay + " seconds... </span>";
                    } else if (delay == 1) {
                        window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:red;\"> Not enough profit to be made (" + window.currency[0][1] + Number(window.potentialProfit).toFixed(2) + "). Reloading in " + delay + " second... </span>";
                    } else {
                        window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:red;\"> Not enough profit to be made (" + window.currency[0][1] + Number(window.potentialProfit).toFixed(2) + "). Reloading... </span>";
                    }
                    
                    setTimeout(function(){ sessionStorage.reload = "true"; window.location.reload(false); },(delay*1000));
                }, 1000);
            } else {
                sessionStorage.reload = "true";
                window.location.reload(false); 
            }
        }
    } else {
        window.costOutput.innerHTML = "<span style=\"font-size:48px;font-weight:bold;color:red;\">" + window.totalCost + "</span>";  
        window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:red;\">This item is outside your budget.</span>";
        
        if (sessionStorage.autoreload == "true") {
            var tempCost = parseFloat(Math.round(Math.abs(window.rawCost - Number(sessionStorage.budget)) * 100) / 100).toFixed(2);
            
            window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:red;\"> " + Number(sessionStorage.currentpurchaseid) + " of " + Number(sessionStorage.maxpurchases) + " | This item is " + window.currency[0][1] + tempCost + " too expensive.</span>";
            
            if (sessionStorage.slowmode == "true") {
                if (parseFloat(sessionStorage.maxwait) > parseFloat(sessionStorage.minwait)) {
                    var delay = Math.floor(Math.random() * (parseFloat(sessionStorage.maxwait) - parseFloat(sessionStorage.minwait) + 1)) + parseFloat(sessionStorage.minwait);    
                    consoleLog("Delay by:", delay);
                    
                } else {
                    var delay = 5;
                    consoleLog("Invalid options were chosen for the delay. Using 5 second default.");
                    
                }
                
                setInterval(function () { 
                    delay--; 
                    
                    if (delay > 1) {
                        window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:red;\"> " + Number(sessionStorage.currentpurchaseid) + " of " + Number(sessionStorage.maxpurchases) + " | This item is " + window.currency[0][1] + tempCost + " too expensive. Reloading in " + delay + " seconds... </span>";
                    } else if (delay == 1) {
                        window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:red;\"> " + Number(sessionStorage.currentpurchaseid) + " of " + Number(sessionStorage.maxpurchases) + " | This item is " + window.currency[0][1] + tempCost + " too expensive. Reloading in " + delay + " second... </span>";
                    } else {
                        window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:red;\"> " + Number(sessionStorage.currentpurchaseid) + " of " + Number(sessionStorage.maxpurchases) + " | This item is " + window.currency[0][1] + tempCost + " too expensive. Reloading... </span>";
                    }
                    
                    setTimeout(function(){ sessionStorage.reload = "true"; window.location.reload(false); },(delay*1000));
                }, 1000);
            } else {
                sessionStorage.reload = "true";
                window.location.reload(false); 
            }
        } else {
            // Don't auto-reload.
        }
        
        window.agreeToSSA.checked = false;
    }   
}

function log() {
    consoleLog("Web Browser:", window.browser);
    consoleLog("Currency:", window.currency[0][1], window.currency[0][0]);
    consoleLog("Item:", sessionStorage.itemname);
    consoleLog("Budget:", parseFloat(sessionStorage.budget));
    consoleLog("Req. Profit:", parseFloat(sessionStorage.profit));
    consoleLog("Within Budget:", parseFloat(sessionStorage.budget - window.rawCost) >= 0, "by", parseFloat(sessionStorage.budget - window.rawCost));
    consoleLog("Auto-Buy:", sessionStorage.autobuy);
    consoleLog("Auto-Reload:", sessionStorage.autoreload);
    consoleLog("Repeat Purchases:", sessionStorage.repeatpurchase);
    consoleLog("Maximum Purchases:", Number(sessionStorage.maxpurchases));
    consoleLog("Current Purchase ID:", Number(sessionStorage.currentpurchaseid));
    consoleLog("Use Slow Mode:", sessionStorage.slowmode);
    consoleLog("Minimum Wait:", sessionStorage.minwait);
    consoleLog("Maximum Wait:", sessionStorage.maxwait);
    consoleLog("Confirmed:", sessionStorage.confirm);  
}

function params_enable() {
    document.getElementById('submit').onclick = function() {
        sessionStorage.budget = document.getElementById('budget').value;
        sessionStorage.profit = document.getElementById('profit').value;
        sessionStorage.autobuy = document.getElementById('autobuy').checked;
        sessionStorage.autoreload = document.getElementById('autoreload').checked;
        sessionStorage.repeatpurchase = document.getElementById('repeatpurchase').checked;
        sessionStorage.currentpurchaseid = document.getElementById('currentpurchaseid').value;
        sessionStorage.maxpurchases = document.getElementById('maxpurchases').value;
        sessionStorage.slowmode = document.getElementById('slowmode').checked;
        sessionStorage.minwait = document.getElementById('minwait').value;
        sessionStorage.maxwait = document.getElementById('maxwait').value;
        sessionStorage.confirm = document.getElementById('confirm').checked;
        
        sessionStorage.reload = "true";
        window.location.reload(false);
    };
    
    document.getElementById('stop').onclick = function() {
        sessionStorage.reload = "false";
        sessionStorage.autobuy = "false";
        sessionStorage.autoreload = "false";
        window.location.reload(false);
    };
    
    document.getElementById('reset').onclick = function() {
        sessionStorage.clear();
        sessionStorage.reload = "false";
        window.location.reload(true);
    };
    
    document.getElementById('notificationenable').onclick = function() {      
        showNotification("https://cdn1.iconfinder.com/data/icons/onebit/PNG/onebit_34.png", "Steam Market Helper", "Yay! Notifications are enabled.");        
    };
    
    document.onkeydown = function(e) {
        if (!e) { 
            e = event; 
        }
        
        if(e.keyCode == 27) {          
            sessionStorage.reload = "false";  
            sessionStorage.autobuy = "false";  
            sessionStorage.autoreload = "false";  
            window.location.reload(false); 
        }
        
        if (document.activeElement.id != "itemname" && document.activeElement.id != "gamename" && document.activeElement.id != "budget" && document.activeElement.id != "profit" && document.activeElement.id != "maxpurchases" && document.activeElement.id != "minwait" && document.activeElement.id != "maxwait" && document.activeElement.id != "market_listing_filter_search_box") {           
            if (e.keyCode == 72) {
                if (document.getElementById('smhHelp').style.visibility == 'hidden') {
                    document.getElementById('smhHelp').style.visibility = 'visible';
                    document.getElementById('smhHelp').style.overflowY = 'scroll';
                    if (document.getElementById('smhConsole').style.visibility == 'hidden') {
                        document.getElementById('smhConsole').style.overflowY = 'hidden';
                    }
                } else {
                    document.getElementById('smhHelp').style.visibility = 'hidden';
                    document.getElementById('smhHelp').style.overflowY = 'hidden';
                }
            } else if (e.keyCode == 67) {
                if (document.getElementById('smhConsole').style.visibility == 'hidden') {
                    document.getElementById('smhConsole').style.visibility = 'visible';
                    document.getElementById('smhConsole').style.overflowY = 'scroll';
                } else {
                    document.getElementById('smhConsole').style.visibility = 'hidden'; 
                    document.getElementById('smhConsole').style.overflowY = 'hidden';
                }
            }
                }
    }
}

function params_enable_m() {
    document.getElementById('submit').onclick = function() {
        sessionStorage.itemname = document.getElementById('itemname').value;
        sessionStorage.itemgame = document.getElementById('gamename').value;
        sessionStorage.budget = document.getElementById('budget').value;
        sessionStorage.autobuy = document.getElementById('autobuy').checked;
        sessionStorage.autoreload = document.getElementById('autoreload').checked;
        sessionStorage.repeatpurchase = document.getElementById('repeatpurchase').checked;
        sessionStorage.currentpurchaseid = document.getElementById('currentpurchaseid').value;
        sessionStorage.maxpurchases = document.getElementById('maxpurchases').value;
        sessionStorage.slowmode = document.getElementById('slowmode').checked;
        sessionStorage.minwait = document.getElementById('minwait').value;
        sessionStorage.maxwait = document.getElementById('maxwait').value;
        sessionStorage.confirm = document.getElementById('confirm').checked;
        
        sessionStorage.reload = "true";
        window.location.reload(false);
    };
    
    document.getElementById('stop').onclick = function() {
        sessionStorage.reload = "false";
        sessionStorage.autobuy = "false";
        sessionStorage.autoreload = "false";
        window.location.reload(false);
    };
    
    document.getElementById('reset').onclick = function() {
        sessionStorage.clear();
        sessionStorage.reload = "false";
        window.location.reload(true);
    };
    
    document.onkeydown = function(e) {
        if (!e) { 
            e = event; 
        }
        
        if(e.keyCode == 27) {          
            sessionStorage.reload = "false";  
            sessionStorage.autobuy = "false";  
            sessionStorage.autoreload = "false";  
            window.location.reload(false); 
        }
        
        if (document.activeElement.id != "itemname" && document.activeElement.id != "gamename" && document.activeElement.id != "budget" && document.activeElement.id != "maxpurchases" && document.activeElement.id != "minwait" && document.activeElement.id != "maxwait" && document.activeElement.id != "findItemsSearchBox") {           
            if (e.keyCode == 72) {
                if (document.getElementById('smhHelp').style.visibility == 'hidden') {
                    document.getElementById('smhHelp').style.visibility = 'visible';
                    document.getElementById('smhHelp').style.overflowY = 'scroll';
                    if (document.getElementById('smhConsole').style.visibility == 'hidden') {
                        document.getElementById('smhConsole').style.overflowY = 'hidden';
                    }
                } else {
                    document.getElementById('smhHelp').style.visibility = 'hidden';
                    document.getElementById('smhHelp').style.overflowY = 'hidden';
                }
            } else if (e.keyCode == 67) {
                if (document.getElementById('smhConsole').style.visibility == 'hidden') {
                    document.getElementById('smhConsole').style.visibility = 'visible';
                    document.getElementById('smhConsole').style.overflowY = 'scroll';
                } else {
                    document.getElementById('smhConsole').style.visibility = 'hidden'; 
                    document.getElementById('smhConsole').style.overflowY = 'hidden';
                }
            }
                
                }
    }
}

function smh_nolisting() {
    var nolistingPanel = document.getElementById('searchResultsTable');
    nolistingPanel.innerHTML += "<span style=\"font-size:24px;font-weight:bold;color:#fff;\">Steam Market Helper</span>" + smhParameters + "</br>" + "<span style=\"font-size:14px;font-weight:bold;color:red;\">Note: you won't be able to stop SMH reloading the page if you use Auto-Reload!</br>You must close the tab/window and navigate back here to change settings!</span> </br></br>";
    
    consoleLog("No-Listing Mode:", "Overriding currency as POUNDS.");
    
    window.currency = [["pounds","£"]];
    
    if(sessionStorage.autoreload == "true") {
        var nolistingMessage = document.getElementsByClassName('market_listing_table_message');
        nolistingMessage[0].innerHTML += "</br></br><span style=\"font-family:monospace;font-size:14px;font-weight:bold;color:green;\">> Still no item! Reloading... </span>";
        
        if (sessionStorage.slowmode == "true") {
            if (parseFloat(sessionStorage.maxwait) > parseFloat(sessionStorage.minwait)) {
                var delay = Math.floor(Math.random() * (parseFloat(sessionStorage.maxwait) - parseFloat(sessionStorage.minwait) + 1)) + parseFloat(sessionStorage.minwait);    
                consoleLog("Delay by:", delay);
            } else {
                var delay = 5;
                consoleLog("Invalid options were chosen for the delay. Using 5 second default.");
            }
            
            setTimeout(function(){ sessionStorage.reload = "true"; window.location.reload(false); }, delay*1000);  
        } else {
            sessionStorage.reload = "true";
            window.location.reload(false); 
        }
    }
}

function init_m() {
    
    window.marketTabs = document.getElementsByClassName('market_tab_well_tab_contents');
    window.marketTabs[3].click();
    
    window.showMore_nl = document.getElementById('sellListingsMore');
    showMore_nl.click();
    
    window.items = document.getElementsByClassName('market_listing_item_name_link');
    window.itemgames = document.getElementsByClassName('market_listing_game_name');
    window.purchaseButtons = document.getElementsByClassName('item_market_action_button_contents');
    
    window.sidebar = document.getElementById('sideBar');
    window.sidebar.innerHTML = smhParameters_m + sidebar.innerHTML;
}

function smh_m() {
    
    consoleLog("Item:", sessionStorage.itemname);
    consoleLog("Game:", sessionStorage.itemgame);
    consoleLog("Budget:", parseFloat(sessionStorage.budget));
    consoleLog("Auto-Buy:", sessionStorage.autobuy);
    consoleLog("Auto-Reload:", sessionStorage.autoreload);
    consoleLog("Repeat Purchases:", sessionStorage.repeatpurchase);
    consoleLog("Maximum Purchases:", Number(sessionStorage.maxpurchases));
    consoleLog("Current Purchase ID:", Number(sessionStorage.currentpurchaseid));
    consoleLog("Use Slow Mode:", sessionStorage.slowmode);
    consoleLog("Minimum Wait:", sessionStorage.minwait);
    consoleLog("Maximum Wait:", sessionStorage.maxwait);
    consoleLog("Confirmed:", sessionStorage.confirm);  
    
    window.marketTitle = document.getElementsByClassName('market_section_title');
    window.dialogTitle = document.getElementById('market_buynow_dialog_title');
    window.errorContainer = document.getElementById('market_buynow_dialog_error_text');
    
    window.placeholderItemName = sessionStorage.itemname;
    window.placeholderItemGame = sessionStorage.itemgame;
    
    window.fakedetected = false;
    window.invalidatereload = false;
    
    if (window.placeholderItemName != undefined && window.placeholderItemName != "") {
        
        consoleLog("SMH is looking for a", "'" + window.placeholderItemName + "'", ((window.placeholderItemGame == "") ? "(and skipping game name)." : "from '" + window.placeholderItemGame + "'."));
        window.foundItemIndex;
        
        var numItems = (window.items.length <= 20) ? (window.items.length) : (20);
        
        for (var i = 0; i < numItems; i++) {
            
            var priceDisplay = document.getElementsByClassName('market_listing_price market_listing_price_with_fee')[i].innerHTML;
                        
            if (priceDisplay.indexOf('£') != -1 || priceDisplay.indexOf('$') != -1 || priceDisplay.indexOf('R$') != -1 || priceDisplay.indexOf('€') != -1 || priceDisplay.indexOf('\u0443') != -1) {
                // Continue as normal...         
            } else {
                consoleLog(i, "is SOLD! The indexes of the items on this page are now invalid!");         
                window.invalidatereload = true;   
            }
            
            if (items[i].innerHTML == window.placeholderItemName) {
                if(window.placeholderItemGame != "") {
                    if(itemgames[i+10].innerHTML == window.placeholderItemGame) {
                        consoleLog("Item", ((i <= 9) ? ("0" + i) : "" + i), "is", "'" + window.items[i].innerHTML + "' from '" + window.itemgames[i+10].innerHTML + "'.");
                        
                        consoleLog(" > Found the item you're looking for at index", ((i <= 9) ? ("0" + i) : "" + i), "...");
                        consoleLog(" > Marking its index for purchase.");
                        
                        
                        window.foundItemIndex = i + 1;
                    } else {
                        consoleLog("Item", ((i <= 9) ? ("0" + i) : "" + i), "is", "'" + window.items[i].innerHTML + "' from '" + window.itemgames[i+10].innerHTML + "'.");
                        consoleLog(" > It looks like the item at index", ((i <= 9) ? ("0" + i) : "" + i), "is a fake. Skipping...");
                        window.fakedetected = true;
                    }
                } else {
                    consoleLog("Item", ((i <= 9) ? ("0" + i) : "" + i), "is", "'" + window.items[i].innerHTML + "' from '" + window.itemgames[i+10].innerHTML + "'."); 
                    
                    consoleLog(" > Found the item you're looking for at index", ((i <= 9) ? ("0" + i) : "" + i), "...");
                    consoleLog(" > Marking its index for purchase.");
                    
                    
                    window.foundItemIndex = i + 1;
                }
            } else {
                consoleLog("Item", ((i <= 9) ? ("0" + i) : "" + i), "is", "'" + window.items[i].innerHTML + "' from '" + window.itemgames[i+10].innerHTML + "'.");   
            }
        }
        
        if (window.placeholderItemName == "#smhdebug#") {
            window.foundItemIndex = Math.floor((Math.random()*20)+1);        
            consoleLog("Debug token detected.", "Script will match item...", window.foundItemIndex-1);
        }
        
        if (window.foundItemIndex && !window.invalidatereload) {
            
            var itemName_final = document.getElementsByClassName('market_listing_item_name_link');
            var gameName_final = document.getElementsByClassName('market_listing_game_name');
            
            consoleLog(itemName_final[window.foundItemIndex-1].innerHTML, gameName_final[window.foundItemIndex+9].innerHTML);
            
            if(window.purchaseButtons[window.foundItemIndex]) {
                window.purchaseButtons[window.foundItemIndex].click();
                
                window.agreeToSSA_nl = document.getElementById('market_buynow_dialog_accept_ssa');
                window.purchaseButton_nl = document.getElementById('market_buynow_dialog_purchase');
                window.costOutput_nl = document.getElementById('market_buynow_dialog_totals_total');
                
                agreeToSSA_nl.checked = true;
                
                window.totalCost_nl = window.costOutput_nl.innerHTML;
                
                if (window.totalCost_nl.indexOf('£') !== -1) {
                    window.currency_nl = [["pounds","£"]];
                } else if (window.totalCost_nl.indexOf('R$') !== -1) {
                    window.currency_nl = [["real","R$"]];
                } else if (window.totalCost_nl.indexOf('$') !== -1) {
                    window.currency_nl = [["dollars","$"]];
                } else if (window.totalCost_nl.indexOf('€') !== -1) {
                    window.currency_nl = [["euros","€"]];
                } else if (window.totalCost_nl.indexOf('\u0443') !== -1) {
                    window.currency_nl = [["rubles","R"]];
                } else {
                    window.currency_nl = [["Could not be determined","X"]];
                }
                
                if (window.currency_nl[0][0] == "pounds") {
                    window.rawCost_nl = window.totalCost_nl.split('£')[1];
                } else if (window.currency_nl[0][0] == "real") {
                    var rawCost_real = window.totalCost_nl.split('R$ ')[1];
                    window.rawCost_nl = rawCost_real.replace(',' , '.');
                } else if (window.currency_nl[0][0] == "dollars") {
                    window.rawCost_nl = window.totalCost_nl.split('$')[1];
                } else if (window.currency_nl[0][0] == "euros") {
                    var rawCost_euro = window.totalCost_nl.split('€')[0];
                    window.rawCost_nl = rawCost_euro.replace(',' , '.');
                } else if (window.currency_nl[0][0] == "rubles") {
                    var rawCost_ruble = window.totalCost_nl.split(' ')[0];
                    window.rawCost_nl = rawCost_ruble.replace(',' , '.');
                } else {
                    window.rawCost_nl = 0;
                }
                
                if (sessionStorage.budget - parseFloat(window.rawCost_nl) >= 0 ) {
                    if (sessionStorage.autobuy == "true") {
                        if (sessionStorage.confirm == "true") {
                            var purchaseButton = document.getElementById('market_buynow_dialog_purchase');
                            
                            window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:yellow;\">Attempting purchase " + Number(sessionStorage.currentpurchaseid) + " of " + Number(sessionStorage.maxpurchases) + ". Please wait...</span>";
                            
                            if (!devMode) {
                                purchaseButton.click();
                            }
                            
                            setTimeout(checkPurchaseSuccess,8000);
                        } else {
                            window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:yellow;\">Purchase not confirmed. Can't auto-buy without confirmation!</span>";
                            showNotification(smhLogo, "URGENT: Confirmation Required!", "You did not confirm that SMH was allowed\nto purchase. Please purchase manually!");
                        }
                    } else {
                        window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:#66CC00;\">This item is in budget!</span>";
                        
                    }
                } else {
                    
                    consoleLog("Item out of budget.");
                    
                    if (sessionStorage.autoreload == "true") {
                        if (sessionStorage.slowmode == "true") {
                            if (parseFloat(sessionStorage.maxwait) > parseFloat(sessionStorage.minwait)) {
                                var delay = Math.floor(Math.random() * (parseFloat(sessionStorage.maxwait) - parseFloat(sessionStorage.minwait) + 1)) + parseFloat(sessionStorage.minwait);    
                                consoleLog("Delay by:", delay);                                
                            } else {
                                var delay = 5;
                                consoleLog("Invalid options were chosen for the delay. Using 5 second default.");
                                
                            }
                            
                            setInterval(function () { 
                                delay--; 
                                
                                window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:red;\">This item is out of budget. Reloading in " + delay + " seconds...</span>";
                                
                                setTimeout(function(){ sessionStorage.reload = "true"; window.location.reload(false); },(delay*1000));
                            }, 1000);
                        } else {
                            window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:red;\">This item is out of budget. Reloading...</span>";
                            sessionStorage.reload = "true";
                            window.location.reload(false); 
                        }
                    } else {
                        window.dialogTitle.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:red;\">This item is out of budget.</span>";
                    }
                }
            } else {               
                consoleLog("Couldn't click the button at index '" + window.foundItemIndex + ".");
            }    
        } else {
            
            consoleLog("Sorry, there's no", "'" + window.placeholderItemName + "'", "currently available.");
            consoleLog("Please remember that matches must be EXACT!");
            
            if (!window.fakedetected && !window.invalidatereload) {
                window.marketTitle[3].innerHTML = "<span style=\"color:yellow;\">SMH: No '" + window.placeholderItemName + "' found.<\span>";
            } else if (!window.invalidatereload) {
                window.marketTitle[3].innerHTML = "<span style=\"color:red;\">SMH: Fake '" + window.placeholderItemName + "' deteced!<\span>";
            } else {
                window.marketTitle[3].innerHTML = "<span style=\"color:red;\">SMH: Indexes invalid!<\span>";
            }
            
            if (sessionStorage.autoreload == "true") {
                if (sessionStorage.slowmode == "true") {
                    if (parseFloat(sessionStorage.maxwait) > parseFloat(sessionStorage.minwait)) {
                        var delay = Math.floor(Math.random() * (parseFloat(sessionStorage.maxwait) - parseFloat(sessionStorage.minwait) + 1)) + parseFloat(sessionStorage.minwait);    
                        consoleLog("Delay by:", delay);
                        
                    } else {
                        var delay = 5;
                        consoleLog("Invalid options were chosen for the delay. Using 5 second default.");
                        
                    }
                    
                    setInterval(function () { 
                        delay--; 
                        
                        if (delay > 1) {
                            window.marketTitle[3].innerHTML = "<span style=\"color:red;\">SMH: Reloading in " + delay + " seconds...<\span>";
                        } else if (delay == 1) {
                            window.marketTitle[3].innerHTML = "<span style=\"color:red;\">SMH: Reloading in " + delay + " second...<\span>";
                        } else if (delay <= 0) {
                            window.marketTitle[3].innerHTML = "<span style=\"color:red;\">SMH: Reloading...<\span>";
                        }
                            
                            setTimeout(function(){ sessionStorage.reload = "true"; window.location.reload(false); },(delay*1000));
                    }, 1000);
                } else {
                    sessionStorage.reload = "true";
                    window.location.reload(false); 
                }
            }
        }
    } else {
        consoleLog("No item chosen.");   
    }
}

function showNotification(_img, _title, _text) {
    
    var notificationsAllowed = window.webkitNotifications.checkPermission();
    
    if (notificationsAllowed == 0) {
        
        var notification = window.webkitNotifications.createNotification(_img, _title, _text);
        notification.show();
        
        notification.onclick = function () {
            notification.close();
        }
        
        setTimeout(function(){
            notification.cancel();
        },5000);
        
    } else {
        window.webkitNotifications.requestPermission();
    }   
}

function consoleLog() {
    var output = "";
    var now = new Date();
    var timestamp = ((now.getHours() < 10) ? "0" + now.getHours() : now.getHours()) + ":" + ((now.getMinutes() < 10) ? "0" + now.getMinutes() : now.getMinutes()) + ":" + ((now.getSeconds() < 10) ? "0" + now.getSeconds() : now.getSeconds()) + " |SMH|";
    
    for (i = 0; i < arguments.length; i++) {
        output += arguments[i] + " ";
    }
    
    if (arguments.length == 1 && arguments[0] == "") {
        window.smhconsole.innerHTML += "</br>";
        console.log("");
    } else {
        window.smhconsole.innerHTML += timestamp + " " + output + "</br>";
        console.log(timestamp, output); 
    }
}

if (devMode) {
    consoleLog("DEVELOPMENT MODE ENABLED! PURCHASES ARE INACTIVE");   
}

if (overrideReload) {
    consoleLog("OVERRIDE RELOAD ENABLED")
}

if (window.location.href.match("market/listings")) {
    
    init();
    
    if (pageSuccess) {   
        consoleLog("SMH starting normally...");
        
        detect_smh();
        setup_smh_default();
        smh();
        params_enable();
        
        log();
        
    } else if (listingOverride) {   
        consoleLog("SMH starting in no-listing mode...");
        
        detect_smh();
        smh_nolisting();
        params_enable();
        
        log();
        
    } else {
        //window.location.reload(false);
    }
} else {
    consoleLog("SMH starting in market mode...");
    consoleLog("This feature is in beta. It may have some issues.");
    
    init_m();
    setTimeout(smh_m, 1000);
    
    params_enable_m()
}