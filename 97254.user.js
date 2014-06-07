// ==UserScript==
// @name T67 GLB Power Ranker
// @version 1.0.0
// @namespace Toccata6767&Kjoe51689
// @description Calculates the power ranking of a league
// @include http://goallineblitz.com/game/league.pl?*
// ==/UserScript==

var rowsDone = 0;
var winMatrix = new Array(32);
var teams;
var count;
var gamesPlayed;

window.setTimeout( function() { RunPowerRanker(); }, 1000);

// Create button to allow user to get the power rankings
function RunPowerRanker()
{    
    count = 0;
gamesPlayed = 0;
    var targetDiv = document.getElementById('conferences');
  
    // Create a div to surround the button  
    var newDiv = document.createElement('div');  
    newDiv.setAttribute('id', 'autoCheckOrder'); 
  
    // Create the button and set its attributes  
    var inputButton = document.createElement('input');  
    inputButton.name = 'autoCheckOrderButton';  
    inputButton.type = 'button';  
    inputButton.value = 'Power Ranking';  
    inputButton.setAttribute("onclick", "checkForOrders();");
    inputButton.addEventListener('click', runScript, false);  
  
    // Append the button to the div  
    newDiv.appendChild(inputButton);  
    targetDiv.parentNode.insertBefore(newDiv, targetDiv);  

    //add horizontal rule
    var hr = document.createElement('hr');
    targetDiv.parentNode.insertBefore(hr, targetDiv);
    
    //Create Count Check
    updateCount();

}

function runScript()
{
    setCount();
    GenerateTeamArray();   
    GenerateWinMatrix(0);
    
}

function setCount()
{
    var targetDiv = document.getElementById('conferences');

    // Create a div to surround the button  
    var newDiv = document.createElement('div');  
    newDiv.setAttribute('id', 'autoCheckOrder1'); 

    var myA = document.createElement("p");
    myA.setAttribute("class","newDiv");
if(count<100){
    myA.innerHTML = parseInt(count) + "%";
  }
    // Append the button to the div  
    newDiv.appendChild(myA);  
    targetDiv.parentNode.insertBefore(newDiv, targetDiv); 

}

function updateCount()
{
    if(count<100){
        var targetDiv = document.getElementById('autoCheckOrder1');

        // Create a div to surround the button  
        var newDiv = document.createElement('div');  
        newDiv.setAttribute('id', 'autoCheckOrder1'); 

        var myA = document.createElement("p");
        myA.setAttribute("id","newDiv");
        myA.innerHTML = parseInt(count) + '%';

        newDiv.appendChild(myA);
        //targetDiv.appendChild(myA);
        targetDiv.innerHTML = "";
        targetDiv.parentNode.insertBefore(newDiv, targetDiv);
    }
}

function Team(teamID, teamURL, teamName, teamPower, teamWin, teamLoss) 
{  
    this.teamID = teamID;
    this.teamURL = teamURL;
    this.teamName = teamName;
    this.teamPower = teamPower;
    this.teamWin = teamWin;
    this.teamLoss = teamLoss;
}

function GenerateTeam(teamElement)
{
    var teamURL = String(teamElement);
    var teamIDindex = teamURL.indexOf("team_id");
    var teamID = teamURL.substring(teamIDindex + 8);
    var teamName = teamElement.innerHTML;
    var team = new Team(teamID, teamURL, teamName, 0,0,0);
    
    count = count + 1;
    updateCount()

    return team;
}

function GenerateTeamArray()
{
    var conferences = document.getElementById('conferences');
    var alpha = getElementsByClass('conference_table')[0];
    var zeta = getElementsByClass('conference_table')[1];
    var alphaTeams = alpha.getElementsByTagName("a");
    var zetaTeams = zeta.getElementsByTagName("a");
    
    var teamsArr = new Array(32);
   
    if(alphaTeams.length > 16)
    {
        for(i = 0; i < 16; i++)
        {
            teamsArr[i] = GenerateTeam(alphaTeams[1+2*i]);
            teamsArr[i+16] = GenerateTeam(zetaTeams[1+2*i]);
        }
    }
    else
    {
        for(i = 0; i < 16; i++)
        {
            teamsArr[i] = GenerateTeam(alphaTeams[i]);
            teamsArr[i+16] = GenerateTeam(zetaTeams[i]);
        }
    }
    
    teams = teamsArr;

    count = count + 10;
    updateCount()

}

function GenerateWinMatrix(index)
{
    count = count + 1;
    updateCount()
    GM_xmlhttpRequest(
    { 
        method: 'GET',
        url: teams[index].teamURL,
        headers: 
        {
            'User-agent': navigator.userAgent,
            'Accept': 'text/xml'
        },
        onload: function(response)
        {
            var row = CreateZeroRow(32);
            
            var teamPage = response.responseText;
            
            for(i = 0; i < 16; i++)
            {
                count = count + .05;
                updateCount()
                var beginIndex;
                if(i%2 == 0) beginIndex = teamPage.indexOf("<tr class=\"alternating_color1\">");
                if(i%2 == 1) beginIndex = teamPage.indexOf("<tr class=\"alternating_color2\">");

                // get line containing game info
                var schedPart = teamPage.substring(beginIndex);
                teamPage = schedPart;
                var endIndex = schedPart.indexOf("</tr>");
                teamPage = teamPage.substring(endIndex+5);
                schedPart = schedPart.substring(0, endIndex+5);
                   
                // get opponents team id
                beginIndex = schedPart.indexOf("id=");
                var opponentID = schedPart.substring(beginIndex);
                endIndex = opponentID.indexOf("\">");
                opponentID = opponentID.substring(3, endIndex);
                    
                // get result of game
                var gameResult = "U";
                beginIndex = schedPart.indexOf("game_id=");
                if(beginIndex != -1)
                {
                    gameResult = schedPart.substring(beginIndex);
                    beginIndex = gameResult.indexOf("\">");
                    endIndex = gameResult.indexOf("</a>");
                    gameResult = gameResult.substring(beginIndex+2,endIndex);
                    gameResult = gameResult.substring(0,1);                        
                }
            
                // Get matrix index for opponent
                var opponentIndex;
                for(j = 0; j < 32; j++)
                {
                    if(String(teams[j].teamID) == String(opponentID))
                    {
                        opponentIndex = j;
                        break;
                    }
                }
            
                // Place result in correct location
                if(gameResult == "W")
                {
                    row[opponentIndex] = 1;
                }
                else if(gameResult == "T")
                {
                    row[opponentIndex] = .5;
                }
                else if(gameResult == "L")
                {
                    row[opponentIndex] = .01;
                }
               else if(gameResult == "U")
                {
                    row[opponentIndex] = 0;
                }

            }
            
            winMatrix[index] = row;
            if(index < 31) GenerateWinMatrix(index+1);
            else{  
createWinLossMatrix();
GenerateRankings();}
        }
    });
}

function GenerateRankings()
{
    var firstOrderWinMatrix = winMatrix;
    var secondOrderWinMatrix = MatrixCrossProduct(32, firstOrderWinMatrix, firstOrderWinMatrix);
    var thirdOrderWinMatrix = MatrixCrossProduct(32, secondOrderWinMatrix, firstOrderWinMatrix);
    var firstOrderDominance = new Array(32);
    var secondOrderDominance = new Array(32);
    var thirdOrderDominance = new Array(32);
    var weightedRanking = new Array(32);
    var sortedRanking = new Array(32);
    
    for(i = 0; i < 32; i++)
    {
        var sum1 = 0;
        var sum2 = 0;
        var sum3 = 0;
        for(j = 0; j < 32; j++)
        {
            sum1 += firstOrderWinMatrix[i][j];
            sum2 += secondOrderWinMatrix[i][j];
            sum3 += thirdOrderWinMatrix[i][j];
        }
        firstOrderDominance[i] = sum1;
        secondOrderDominance[i] = sum2;
        thirdOrderDominance[i] = sum3;
        teams[i].teamPower = parseInt((1.20*sum1) + (sum2) + (0.05*sum3));
    }

    BubbleSortTeams();

    DisplayRankings(teams);

}

function DisplayRankings()
{
    var strRankings = "<table><tr><td><b>[b]Place[/b]</b></td><td><b>[b]Rating[/b]</b></td><td><b>[b]Win[/b]</b></td><td><b>[b]Loss[/b]</b></td><td><b>[b]Team Name[/b]</b></td></tr>";
    var targetDiv = document.getElementById('autoCheckOrder1');
    var dots = "";
    var dotsWin = "";
    var dotsLoss = "";
    for(i = 0; i < 32; i++)
    {
        var team = teams[i];
        if(team.teamPower<10){team.teamPower = team.teamPower +"............";}
        if(team.teamPower<100){team.teamPower = team.teamPower +"..........";}
        if(team.teamPower>99){team.teamPower = team.teamPower +"........";}

        if(i<9){dots = "......";}
        if(i>8){dots = "....";}

        if(team.teamWin<10){dotsWin = ".....";}
        if(team.teamWin>9){dotsWin = "...";}

        if(team.teamLoss<10){dotsLoss = "........";}
        if(team.teamLoss>9){dotsLoss = "......";}


        strRankings += "<tr><td>"+ parseInt(i+1)+ dots + "</td> <td>" + team.teamPower + "</td><td>" + team.teamWin + dotsWin + "</td> <td>"+ team.teamLoss + dotsLoss  + "</td> <td>";

strRankings += team.teamName.substring(0, team.teamName.length)+ "</td></tr>";
    }
    strRankings += "</table>";
    targetDiv.innerHTML = strRankings;
}

function DisplayMatrix()
{
    var strMatrix = "";
    
    for(i = 0; i < 32; i++)
    {
        for(j = 0; j < 32; j++)
        {
            strMatrix += winMatrix[i][j] + " ";
        }
        strMatrix += "\n\r";
    }
    
    alert(strMatrix);
}
    

function createWinLossMatrix()
{   
    for(i = 0; i < 32; i++)
    {
        for(j = 0; j < 32; j++)
        {
            if(winMatrix[i][j] == 1)
            {
                teams[i].teamWin += 1;
            }       
             if(winMatrix[i][j] == .01)
            {
                teams[i].teamLoss += 1;
            }       
        }
    }
}


function CreateZeroRow(size)
{
    var row = new Array(size);
    
    for(i = 0; i < size; i++)
    {
        row[i] = 0;
    }
    
    return row;
}

function BubbleSortTeams()
{
    for(i = 0; i < 32; i++)
    {
        for(j = i; j < 32; j++)
        {
            if(teams[j].teamPower > teams[i].teamPower)
            {
                var temp = teams[j];
                teams[j] = teams[i];
                teams[i] = temp;
            }
        }
    }
}

function MatrixCrossProduct(size, matrixA, matrixB)
{
    var product = new Array(size);
    
    for(i = 0; i < size; i++)
    {
        var row = new Array(size);
        product[i] = row;
    }
    
    for(i = 0; i < size; i++)
    {
        for(j = 0; j < size; j++)
        {
            var sum = 0;
            for(k = 0; k < size; k++)
            {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            product[i][j] = sum;
        }
    }
    return product;
}
    
//Function created by www.anyexample.com to return elementsbyclass that equal the classes we are using
function getElementsByClass( searchClass, domNode, tagName) { 
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) { 
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1) 
			el[j++] = tags[i];
	} 
	return el;
}

window.addEventListener("load", function(e) {
  addButton();
}, false);
 
 
function addButtonListener(){
  var button = document.getElementById("greasemonkeyButton");
  button.addEventListener('click',RunPowerRanker,true);
}