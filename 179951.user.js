// ==UserScript==
// @name        BTC Guild USD Display Helper
// @namespace   5d51bb45-1c6e-49b1-ab37-338c42d269e3
// @description Shows USD Values in some areas of the site, pulled from MtGox's weighted average
// @include     https://www.btcguild.com/*
// @version     1.1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var lastDayEarningsBtc, acctBalanceBtc;

// change this to your auto-payment amount
var paymentThreshold = 0.01;

// setting this to true will obfuscate real amounts for the purpose of demonstrating the script.
var screenshotMode = false;

var mtGoxRe = /Weighted Avg:<span>\$([0-9\.]+)<\/span>/;

function addUsdAmtToBtcAmt(node, amount) {
    if( screenshotMode ) {
        node.textContent = " 1.23456789";
        amount = 123.45678;
    }
    node.textContent = node.textContent + " ($" + amount.toFixed(2) + ")";
    node.title = node.title + "\nUSD: $" + amount.toFixed(3);
}

function log(message) {
    //message = "[BTC Guild BTC->USD UserScript] " + message;
    //console.log(message);
}

function addBubble(titleText, valueText, tooltipText) {
   	log("addBubble(" + titleText + "," + valueText + "," + tooltipText + "); called");
    var lafDiv, a, b;
    
    lafDiv = document.createElement('div');
    lafDiv.id = "loginAsFloat";
    lafDiv.setAttribute('style', "float: right; background-color: #FFF; margin-top: 10px; margin-right: 20px; border-radius: 4px; padding: 5px;");
    
    a = document.createElement('a');
    a.href = '#';
    a.setAttribute('class', 'south');
    a.setAttribute('title',tooltipText);
    
    b = document.createElement('b');
    b.textContent = titleText;
    
    a.appendChild(b);
    lafDiv.appendChild(a);
    
    lafDiv.appendChild(document.createTextNode(" " + valueText));
    
    //log(document.getElementById('loginAsFloat'));
    document.getElementById('loginAsFloat').parentElement.appendChild(lafDiv);
}

function addBtcToUsdRateBalloon(exchRate) {
    addBubble("Rate (Mt. Gox)", 
              "$" + exchRate,
              "The BTC to USD (weighted average) exchenge rate at Mt. Gox");
}

// get the 24 h earnings
function amend24HourEarnings(usdRate) {
    var snapshot;
    
    snapshot = document.evaluate(
        "//a[@class='south']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    
    if( snapshot.snapshotLength > 0 ) {
        log('found ' + snapshot.snapshotLength + " matches" );
        
        for( var i = 0; i < snapshot.snapshotLength; i++) {
            
            var item, theOne, theNode, usdEarnings, btcEarnings;
            
            item = snapshot.snapshotItem(i);
            //log( item.firstChild.innerHTML );
            if( "24 Hour Earnings" == item.firstChild.innerHTML ) {
                theOne = item.firstChild;
                //log("found the one..." + theOne.innerHTML);
                theNode = item.nextSibling;
                btcEarnings = theNode.textContent.trim();
                lastDayEarningsBtc = parseFloat(btcEarnings);
                usdEarnings = usdRate * btcEarnings;
                //log("earnings: $" + usdEarnings.toFixed(4));
                
                addUsdAmtToBtcAmt(theNode, usdEarnings);
                //theNode.textContent = theNode.textContent + " ($" + usdEarnings.toFixed(3) + ")";
            }
        }
    }    
}

// get all of the "west" amounts on the dashboard
function amendLeftDashboard(usdRate) {
    
    for( var i = 3; i <= 5; i++ ) {
        
        var west5, balNode, balBtc, balUsd;
        
        west5 = document.getElementById("west" + i);
        balNode = west5.parentNode.parentNode.children.item(1);
        balNode.parentElement.setAttribute('style', "white-space: nowrap");
        balBtc = parseFloat(balNode.textContent.trim());
        if( west5.parentNode.parentNode.children.item(0).textContent == "Account Balance" ) {
            acctBalanceBtc = balBtc;
            log("account balance updated");
        }
        balUsd = balBtc * usdRate;
        
        addUsdAmtToBtcAmt(balNode, balUsd);
    }
}

function addTimeToPayout() {
    log("addTimeToPayout called");
    log("acctBalanceBtc: " + acctBalanceBtc);
    var timeToPayout = (parseFloat(paymentThreshold) - acctBalanceBtc) / lastDayEarningsBtc;
    addBubble("Time to Payout", "about " + timeToPayout.toFixed(2) + " days", "How long before the account balance reaches .01 BTC (estimate).");
}

log('functions loaded OK');

GM_xmlhttpRequest({
    method: "GET",
    url: "https://www.mtgox.com/",
    onload: function(response) {
        
        var groups, mtGoxRate;
        
        groups = mtGoxRe.exec(response.responseText);
        log(groups);
        if( groups.length > 1 ) {
            mtGoxRate = parseFloat(groups[1]);
            
            addBtcToUsdRateBalloon(mtGoxRate);
            amend24HourEarnings(mtGoxRate);
            amendLeftDashboard(mtGoxRate);
            addTimeToPayout();
        }
    }
});