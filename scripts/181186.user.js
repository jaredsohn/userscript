// ==UserScript==
// @name        Awaiting Games
// @namespace   http://userscripts.org
// @description Indicates on the Side Menu the number of games where it's your turn.
// @include       *www.conquerclub.com*
// @version     1
// @grant       none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

function getPlayerID()
//returns the playerid for the currently logged on user.
//player id is extracted from the document cookie string where it is stored in format "phpbb3_jer7c_u=657485"
//returns null if no player is logged in
{
    
    var playerid = document.cookie;     
    playerid = playerid.split("phpbb3_jer7c_u=")[1]
    playerid = playerid.split(";")[0];
    if (playerid == "1") playerid = "";
    return playerid;
}

function getFromApi(url)
//function to query the CC API for the specified url. 
//returns a DOMParser object containing the XML
{
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    return xmlhttp.responseXML;
}

function awaitingGameCount(pid)
//accesses conquer club api, returns all the active games for the player userid=pid, counts how many are awaiting turn
//for current player and returns the total.
{
    var xmlDoc = getFromApi("http://www.conquerclub.com/api.php?mode=gamelist&u=" + pid + "&gs=A");
    var xdom = xmlDoc.getElementsByTagName("api")[0].getElementsByTagName("games")[0].getElementsByTagName("game");
    var count = 0;

    for (var i=0; i < xdom.length; i++)
    {   
        var xdom2 = xdom[i].getElementsByTagName("players")[0].getElementsByTagName("player");
        for (var i2=0; i2 < xdom2.length; i2++)
        {
            var status = xdom2[i2].attributes.getNamedItem("state").nodeValue;
            var playerid = xdom2[i2].childNodes[0].nodeValue;
            if (status == "Ready") if (playerid == pid) count ++;
        }
    }
    return count;
}

//Start of Script
var pid = getPlayerID();    // get id of logged in player
if (pid !="")       //if pid="" then not logged in        
{
    var numAwGames = awaitingGameCount(pid);    //count number of games awaiting turn
    if (numAwGames > 0)      //do nothing if no games awaiting
    {
        $("a[href='player.php?mode=mygames1'],a[href='/player.php?mode=mygames1']").each(function()     //select relevant element with JQuery
        {                                                                                               //matching href link attribute - Jquery is necessary becasuse the My Games element has no "id" attribute
            if (this.text == "My Games")        //so it doesn't change the Active[nn] button at the top which points to the same link.
            {
                $(this).text('My Games (' + numAwGames + ')');      //insert new text into HTML Doc
                $(this).css("font-weight","Bold");                  //make text bold
            }
        });
    }
}