// ==UserScript==
// @name        Calculate Value
// @namespace   http://fr33dan.tumblr.com
// @description Calculates the cookies per second per cookie value of new purchases
// @include     http://orteil.dashnet.org/experiments/cookie/
// @version     1.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==


function getItemCount(itemName){
    return $("#buy" + itemName).children(".amount").text();
};
var updateFunction = function() {
    $("[id^='buy']").each(function(){
        var textContainer = $(this).children("b");
        var oldContainerText = textContainer.text();
        
        var firstDash = oldContainerText.indexOf("-");
        
        var lastDash = oldContainerText.indexOf("-",firstDash + 1);
        var cost;
        var containerLabelText;
        if(lastDash === -1){
            cost = oldContainerText.substring(firstDash + 1);
            containerLabelText = oldContainerText + " ";
        } else
        {
            cost = oldContainerText.substring(firstDash + 1, lastDash);
            containerLabelText = oldContainerText.substring(0, lastDash);
        }
        cost = cost.trim();
        var oldFullCost = oldContainerText.substring(oldContainerText.indexOf(cost));
        cost = cost.replace(/\,/g,"");
        
        //GM_log("Found cost | " + cost);
        var cookiePerSecond;
        switch($(this).attr("id"))
        {
            case "buyCursor":
            cookiePerSecond = 1.0;
            break;
            case "buyGrandma":
            cookiePerSecond = 4.0;
            if(getItemCount("Factory"))
                cookiePerSecond++;
            if(getItemCount("Mine"))
                cookiePerSecond += 2;
            if(getItemCount("Shipment"))
                cookiePerSecond += 3;
            if(getItemCount("Alchemy lab"))
                cookiePerSecond += 4;
            if(getItemCount("Portal"))
                cookiePerSecond += 5;
                
            break;
            case "buyFactory":
            cookiePerSecond = 20.0;
            break;
            case "buyMine":
            cookiePerSecond = 50.0;
            break;
            case "buyShipment":
            cookiePerSecond = 100.0;
            break;
            case "buyAlchemy lab":
            cookiePerSecond = 500.0;
            break;
            case "buyPortal":
            cookiePerSecond = 6666.0;
            break;
            case "buyTime machine":
            cookiePerSecond = 123456.0;
            break;
        }
        //alert(cookiePerSecond + "\n" + oldFullCost + "\n" + newCost);
        cookiePerSecond = cookiePerSecond/5;
        
        
        //GM_log("Found CPS value | " + cookiePerSecond);
        var value = cookiePerSecond/cost;
        
        var newCost = cost + " - " + value.toExponential(1);
        var newHTML = textContainer.html().replace(oldFullCost,newCost);
        textContainer.html(newHTML);
        
        
        
        //textContainer.text(containerLabelText + "- " + value.toExponential(1));
    });
    $("[id^='buy']").click(function(){
        setTimeout(updateFunction,100);
    });
};

setTimeout(function waitForPanel(){
    if($("[id^='buy']").length)
    {
        $("[id^='buy']").click(function(){
            setTimeout(updateFunction,100);
        });
        updateFunction();
    }
    else
    {
        setTimeout(waitForPanel,50);
    }
},50);