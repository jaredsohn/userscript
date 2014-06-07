/*
Rewrites Yahoo! Fantasy Baseball recent transactions to include links to add players. This script adds an action column
to the recent transactions on the main page and the transactions page. This column shows plus signs next to any dropped players.
This makes it easier to snatch up a player that someone else has let go before everyone else in the league.

Limitations:
This script will exclude any dropped players that have since been added, but can only determine this on the same page. Any
players that were added on another page will still show a link. These will give you an error when you try to finalize adding these
players.

*/

// ==UserScript==
// @name          Yahoo Fantasy Baseball-Add Player from Recent Transactions 1.0
// @namespace     N/A
// @description   Rewrites Yahoo! Fantasy Baseball recent transactions to include links to add players.
// @include       http://baseball.fantasysports.yahoo.com/*
// ==/UserScript==


var playerArray=new Array();

function inArray(value){
    for (var i in playerArray) {
       if (parseInt(playerArray[i]) == parseInt(value)) {
           return true;
       }
    }
    return false;
};


(function() {
    
    var AddPlusLink = '<a href="/b2/8397/addplayer?apid=PLAYERID"><img style="width: 14px; height: 14px;" title="Add player" src="http://us.i1.yimg.com/us.yimg.com/i/us/sp/fn/default/full/add.gif" alt="Add player" border="0"></a>';
    var newform ="";

    if (document.getElementById('recenttransactions') != null){
        var el_name ='recenttransactions';
    }else if (document.getElementById('transactions') != null){
        var el_name='transactions';
    }else{
        return 0;
    }

    var oldform = document.getElementById(el_name).innerHTML;
    var rows = oldform.split("<tr");

    for ( var i in rows ){   //javascript foreach loop

        if (i==1){
            rows[i] = rows[i].replace(/<th>.*?Type.*?<\/th>/, "<th>Action</th><th>Type</th>");
        }

        var playerID = rows[i].match(/\d{4,5}/);
        var tempLink = AddPlusLink.replace("PLAYERID", playerID);

        if (rows[i].match(/Drop\b/)){  //Matches dropped player transactions

            if (inArray(playerID) != true){  //checks to make sure the player has not been added since he was dropped (only works on same page)
                var newcol = rows[i].match(/<\/a>.*?<\/td>.*?<td>/i);
                rows[i] = "<tr" + rows[i].replace(/<\/a>.*?<\/td>.*?<td>/i, newcol + tempLink + "</td><td>");
            }else{
                var newcol = rows[i].match(/<\/a>.*?<\/td>.*?<td>/i);
                rows[i] = "<tr" + rows[i].replace(/<\/a>.*?<\/td>.*?<td>/i, newcol + "&nbsp</td><td>");
            }

        }else if (rows[i].match(/Add\b/)){  //Matches added player transactions
            playerArray.push(playerID);     //add the player ID to the array
            var newcol = rows[i].match(/<\/a>.*?<\/td>.*?<td>/i);
            rows[i] = "<tr" + rows[i].replace(/<\/a>.*?<\/td>.*?<td>/i, newcol + "&nbsp</td><td>");

        }else if (rows[i].match(/Trade\b/)){  //Matches completed trades between managers
            var newcol = rows[i].match(/<\/a>.*?<\/td>.*?<td>/i);
            rows[i] = "<tr" + rows[i].replace(/<\/a>.*?<\/td>.*?<td>/i, newcol + "&nbsp</td><td>");

        }else{   //Matches all changes to league settings and changes to manager's trading block info
            var newcol = rows[i].match('<td><span class="user-id">');
            rows[i] = "<tr" + rows[i].replace('<td><span class="user-id">', "<td>&nbsp</td>" + newcol);
        }

        newform = newform + rows[i];
    }
    document.getElementById(el_name).innerHTML=(newform);
})();

