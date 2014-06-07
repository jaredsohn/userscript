// ==UserScript==
// @name       Aniforce Add Card
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://ani-mini.net/g16/addCard.php*
// @copyright  2012+, You
// ==/UserScript==

document.body.innerHTML = '<center>   your id<input id="gameId" value="464"/><br><br>single card<input id="single"/><br><br>whole character<input id="smart"/><br><br>start<input id="start"/><br>stop<input id="stop"/><br><br>amount<input id="amount" value="2"/><br><br><button id="send">submit</button>    </center>'; 
document.getElementById("send").onclick = function(){
    var gameId = document.getElementById("gameId").value;
    var single = document.getElementById("single").value;
    var smart = document.getElementById("smart").value;
    var start = document.getElementById("start").value;
    var stop = document.getElementById("stop").value;
    var amount = document.getElementById("amount").value;
    var baseURL = "http://ani-mini.net/g16/addCard.php?myId=" + gameId + "&card=',";
    var cards = single || [];
    if(!gameId || (!single && !smart && !start && !stop))
        return;
    if(single){
        if(amount != 1)   
            cards += "," + single;
    }
    if(smart){
        start = (Math.ceil(smart/15) - 1) * 15 + 1;
        stop = start + 14;
    }
    if(!single && start && stop){
        for(var i=Number(start); i<=Number(stop); i++){
            cards.push(i);
            if(amount != 1)
                cards.push(i);
        }
        cards = cards.join(",");
    }
    window.location.href = baseURL + cards + "'";
    //console.log( baseURL + cards + "'");
};