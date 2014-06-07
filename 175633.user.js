// ==UserScript==
// @name       ShhhPlatinium
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.tagged.com/apps/pets*
// @copyright  2012+, You
// ==/UserScript==
var x, y, value, max_value, entries, li_entries, buyer, prev_buyer_1, prev_buyer_2, my_id, seconds, playerCount, min_players, players;
var dummy;
max_value = "$216,314,904,159,748,851,056,514,094";
min_players = "30";
// my id: 0000000000
window.addEventListener("load", function(e) {
    window.setInterval(function() {
        playerCount = unsafeWindow.document.getElementsByClassName("playerCount");
        players = playerCount.item(0).firstChild.textContent;
        if(players.length < min_players.length || (players.length == min_players.length && players < min_players)){
            unsafeWindow.console.log("Exiting playerCount:" + players);
            return;
        }
        if(players.length < 3 && players < "30"){
           dummy = 1;
           return;
        } else if(players.length < 3 && players < "45"){
            max_value = "$32,153,832,150,000,000,000,000,000";
        } else if(players.length < 3 && players < "60"){
            max_value = "$62,658,722,541,234,765,000,000,000";
        } else if(players.length < 3 && players < "75"){
            max_value = "$75,817,054,274,894,065,650,000,000";
        }else if(players.length < 3 && players < "90") {
            max_value = "$91,738,635,672,621,819,436,500,000"; 
        }else if(players.length == 3 && players < "100"){
            max_value = "$111,003,749,163,872,401,518,165,000"; 
        }else if(players.length == 3 && players < "110"){
            max_value = "$147,745,990,137,114,166,420,677,615"; 
        }
        x = unsafeWindow.document.getElementsByTagName("li");   
        y = unsafeWindow.document.getElementsByClassName("value");
        seconds = unsafeWindow.document.getElementsByClassName("countdown");
        //unsafeWindow.console.log("CASH sec length" + seconds.length);
        if(seconds.length == 2){
            if(seconds.item(0).firstChild.textContent < "2.0"){
                //unsafeWindow.console.log("CASH TOO LITTLE secs:" + seconds.item(0).firstChild.textContent);
                return;
            } else {
                //unsafeWindow.console.log("CASH ENOUGH secs:" + seconds.item(0).firstChild.textContent);
            }
        }
       
       
        entries = unsafeWindow.document.getElementsByClassName("entries");
        if(entries.length > 0) {
            li_entries = entries.item(0).getElementsByTagName("li");  
            //       unsafeWindow.console.log("CASH entries:" + li_entries.length);   
            if(li_entries.length > 1){
                if(li_entries.item(0).getAttribute("data-id") == buyer){
                    return;  
                }
                //            unsafeWindow.console.log("CASH buyer:" + li_entries.item(0).getAttribute("data-id"));
                prev_buyer_2 = prev_buyer_1;
                prev_buyer_1 = buyer;
                buyer = li_entries.item(0).getAttribute("data-id");
               
                if(buyer == prev_buyer_2) {
                    return;  
                }
            } else {
                return;
            }
           
    }
   
    if(y.length == 5){   
        value = y.item(0).firstChild.firstChild.title;
        //unsafeWindow.console.log("CASH value too high:" + value + ":max value:" + max_value+":");
        if(value.length < max_value.length || (value.length == max_value.length && value < max_value)){
            unsafeWindow.cashrun_buy.click();
        } else {
            //unsafeWindow.console.log("CASH value too high:" + value);
        }
    }
}, 1000);
}, false);