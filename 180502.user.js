// ==UserScript==
// @name       Trova Membri Alleanza (Empire Legacy)
// @updateURL  http://userscripts.org/scripts/show/180502
// @downloadURL http://userscripts.org/scripts/source/180502.user.js
// @include    http://uni121.ogame.it/game/index.php?page=highscore
// @version    0.2
// @description  enter something useful
// @match      http://www.google.it/
// @copyright  2012+, You
// ==/UserScript==

// aaa
var maxPos = 0;
var numMembers = 0;

function searchFunc()
{
    var table = document.getElementById("ranks");
    var tbody = table.getElementsByTagName("tbody");
    var lines = tbody[0].getElementsByTagName("tr");
	var text = "";
    
    var position = (lines[0].getElementsByClassName("position")[0].innerHTML).replace(/\n+/g, '');
    var position1 = position.replace(/[ ]+/g, '');
    var input = document.getElementById("myInput");
    
    //alert(position1 + " - " + maxPos);
    
    //if(position1>maxPos)
    //{
        for(i=0; i<lines.length; i++)
        {
            var alleanza = lines[i].getElementsByClassName("name")[0].getElementsByTagName("a")[0].innerHTML;
            var alleanza1 = alleanza.substring(alleanza.indexOf("[") + 1);
            var alleanza2 = alleanza1.substring(0,alleanza1.indexOf(']'));
            var username = (lines[i].getElementsByClassName("name")[0].getElementsByClassName("playername")[0].innerHTML).replace(/\n+/g, '');
            var username1 = username.substring(20+0);
            var position = (lines[i].getElementsByClassName("position")[0].innerHTML).replace(/\n+/g, '');
            var position1 = position.replace(/[ ]+/g, '');
            var link = lines[i].getElementsByClassName("name")[0].getElementsByClassName("dark_highlight_tablet")[0].href;
            
            if(alleanza2==input.value)
            {
                var newRaw = $('<tr class="myRaw"><td style="border:solid 1px;width:50px;">'+position1+'</td><td style="border:solid 1px;width:150px;"><a href="'+link+'" target="_blank">'+username1+'</a></td></tr>');
                $('#myInsideTable').append(newRaw);
                maxPos = position1;
                numMembers = numMembers + 1;
                //text = text + alleanza2 + " -- " + username1 + " -- " + position1 + "\n";
            }
        }
    	document.getElementById('myNumMemb').innerHTML = numMembers;
    //}
    //alert(text);
}

function clearFunc()
{
    $(".myRaw").remove();
    maxPos = 0;
    numMembers = 0;
    document.getElementById('myNumMemb').innerHTML = 0;
}

(function(){
    
    var linksDiv = document.getElementById("links");
    var newTable = document.createElement("div");
    newTable.setAttribute('id','myTable');
    newTable.setAttribute('style',"display:block;position:absolute;width:200px;height:auto;left:-30px;background:white;border:2px;top:"+(linksDiv.offsetHeight+380)+"px;");
	$("#links").after(newTable);
    
    var insideInput = $('<input id="myInput" style="width:150px;height:30px;"></input>');    
    $("#myTable").append(insideInput);
    
    var clearButton = $('<button id="myClearButton" type="button" style="position:absolute;right:0px;top:0px;width:50px;height:40px;">Pulisci</button>')
    var searchButton = $('<button id="mySearchButton" type="button" style="width:150px;height:30px;">Cerca</button>')
    var numMemb = $('<p id="myNumMemb" style="color:#000;position:absolute;top:45px;right:10px;width:20px;height:20px;">0</p>')

    $("#myTable").append(clearButton);
    $("#myTable").append(searchButton);
    $("#myTable").append(numMemb);
    $("#myClearButton").click(clearFunc);
    $("#mySearchButton").click(searchFunc);
    
    var insideTable = $('<table style="color:#000;" id="myInsideTable"></table>');
    $("#myTable").append(insideTable);
    
    $('#myInsideTable').append($('<tr><td style="border:solid 1px;width:50px;"><font color="#0000FF">Pos</font></td><td style="border:solid 1px;width:150px;"><font color="#0000FF">Giocatore</font></td></tr>'));
})();