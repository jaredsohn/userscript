// ==UserScript==
// @name           Team Record Book
// @namespace      goallineblitz.com
// @description    Creates a team record book.
// @include        http://goallineblitz.com/game/team.pl?*
// @copyright      2010, garrettFoster
// @version        2010.06.05
// ==/UserScript==

//needed by greasmonkey
window.setTimeout( 
	function() {
		main();
	}, 
	10
);

//Script Rundown
    //Build a button to keep things from auto-starting
    //once the button is pressed begin
    //start with current season and work backwards (that way newest records overide tied older records)
        //get the game Ids for the season
            //get the game data for specific game Id
            //parse the game data and update the single game records if needed
        //condense season data
        //parse season data for single season records and update if needed
    //condense the data further
    //parse the data for all time records

function main(){    
    
    addGreaseDiv();
    console.log('grease div added');
    addTab('Team Record Book','recordBook');    
    
    const currentSeason = parseInt(document.getElementById('schedule_box').getElementsByTagName('option')[0].value);

    //create a menu to place inside div
    const optionHTML =  '<hr>'+
                '<p style="color: black; font-weight: normal;">The first set of options is the start and end points of the recordbook. The second set of options is the minimum number of attempts at something before it can be considered a record. This is used only for averages and percentages. <i>Note: Games should be between 1 and 16 and the season should be between 1 and the current season.</i></p>'+
                '<br />'+
                '<table>'+
                    '<tbody>'+
                        '<tr>'+
                            '<td />'+
                            '<td>Season</td>'+
                            '<td>Game</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>Start</td>'+
                            '<td><input size="4" id="seasonStart" type="text" value="1" /></td>'+
                            '<td><input size="4" id="gameStart" type="text" value="1" /></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>End</td>'+
                            '<td><input size="4" id="seasonEnd" type="text" value="' + currentSeason + '" /></td>'+
                            '<td><input size="4" id="gameEnd" type="text" value="16" /></td>'+
                        '</tr>'+
                    '</tbody>'+
                    '<br/>'+
                    '<tbody>'+
                        '<tr>'+
                            '<td>Minimum:</td>'+
                            '<td>Game</td>'+
                            '<td>Season</td>'+
                            '<td>Career</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>Passes</td>'+
                            '<td><input size="4" id="gamePasses" type="text" value="2" /></td>'+
                            '<td><input size="4" id="seasonPasses" type="text" value="10" /></td>'+
                            '<td><input size="4" id="careerPasses" type="text" value="10" /></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>Rushes</td>'+
                            '<td><input size="4" id="gameRushes" type="text" value="2" /></td>'+
                            '<td><input size="4" id="seasonRushes" type="text" value="10" /></td>'+
                            '<td><input size="4" id="careerRushes" type="text" value="10" /></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>Receptions</td>'+
                            '<td><input size="4" id="gameCatches" type="text" value="2" /></td>'+
                            '<td><input size="4" id="seasonCatches" type="text" value="10" /></td>'+
                            '<td><input size="4" id="careerCatches" type="text" value="10" /></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>Punts</td>'+
                            '<td><input size="4" id="gamePunts" type="text" value="2" /></td>'+
                            '<td><input size="4" id="seasonPunts" type="text" value="10" /></td>'+
                            '<td><input size="4" id="careerPunts" type="text" value="10" /></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>Returns</td>'+
                            '<td><input size="4" id="gameReturns" type="text" value="2" /></td>'+
                            '<td><input size="4" id="seasonReturns" type="text" value="10" /></td>'+
                            '<td><input size="4" id="careerReturns" type="text" value="10" /></td>'+
                        '</tr>'+
                    '</tbody>'+                            
                '</table>'+
                '<br/>'+
                '<hr>'+
                '<p style="font-weight:normal; color:black;">   You can customize the output of the record books below. The following tags will be replaced with the neccessary data:<br/><br/> <b style="color: blue;">%rank,%stat,%player-id,%player-name,%position,%team-id, %team-name, %opponent-id, %opponent-name, %game-id, %season-id</b><br/><br/>   Obviously, some tags don\'t make sense if you put them in the wrong place. For instance don\'t put %opponent-id in the season record as there was more than one opponent that season.</p>'+
                '<br/>'+
                '<span style="font-weight:normal; color:black;">Game: </span>'+
                '<input size="100" id="gameFormat" type="text" value="(%rank)...%stat...([i]%position[/i])[b]%player-name[/b] http://goallineblitz.com/game/game.pl?game_id=%game-id" />'+
                '<br/>'+
                '<span style="font-weight:normal; color:black;">Season: </span>'+
                '<input size="100" id="seasonFormat" type="text" value="(%rank)...%stat...([i]%position[/i])[b]%player-name[/b] season %season-id" />'+
                '<br/>'+
                '<span style="font-weight:normal; color:black;">Career: </span>'+
                '<input size="100" id="careerFormat" type="text" value="(%rank)...%stat...([i]%position[/i])[b]%player-name[/b] http://goallineblitz.com/game/player.pl?player_id=%player-id" /><br/>'+
                '<br/>'+
                '<hr>'+
                '<p style="font-weight:normal; color:black;"> This next section lets you fine tune the controls a bit more. The first option will let you modify how many rankings to keep. Please be aware that if you keep too many you may not be able to fit the record book in a single post.<br/>The next option lets you modify how the game handles blowouts. First you set how large of a point differential defines a blowout. Then you can specify a percentage that each stat from that game will be multiplied by. If you do not want that stat then set the value to 0.</p>'+
                '<br/>'+
                '<span style="font-weight:normal; color:black;">Record length: </span>'+
                '<input size="1" id="recordLength" type="text" value="10" />'+
                '<span style="font-weight:normal; color:black;">    Blowout Margin: </span>'+
                '<input size="1" id="blowoutCond" type="text" value="256" />'+
                '<span style="font-weight:normal; color:black;">    Multiplier Percentage: </span>'+
                '<input size="1" id="blowoutMod" type="text" value="100" /><br/>'+
                '<br/>'+
                '<hr>'+
                '<div style="clear:both">'+
                    '<input id="recordBook-go" type="button" value="Go" />'+
                '</div>';
    
    
    //place options on page
    id('recordBook-options').innerHTML = optionHTML;

    //add event listeners to options
    id('recordBook-go').addEventListener('click',buildRecordBook,false);
       
}

//enter here after the button is pressed
function buildRecordBook(){    
   
    var title = document.title; //need this for chromium browsers
        
    //hide options
    toggleOption('recordBook-options'); 
    
    //display initial messageboxScore
    document.getElementById('greaseStatus').innerHTML = ' working...';
    
    //get the team id
    const teamId = window.location.href.split('team_id=')[1];    
    
    //create blank record Books
    var gameRecord = new Array();
    var seasonRecord = new Array();
    var careerRecord = new Array();    
    
    //set values
    const seasonStart = parseInt(document.getElementById('seasonStart').value);
    const seasonEnd = parseInt(document.getElementById('seasonEnd').value);
    
    const gameStart = parseInt(document.getElementById('gameStart').value);
    const gameEnd = parseInt(document.getElementById('gameEnd').value);
    
    const gamePasses = parseInt(document.getElementById('gamePasses').value);
    const seasonPasses = parseInt(document.getElementById('seasonPasses').value);
    const careerPasses = parseInt(document.getElementById('careerPasses').value);
    
    const gameRushes = parseInt(document.getElementById('gameRushes').value);
    const seasonRushes = parseInt(document.getElementById('seasonRushes').value);
    const careerRushes = parseInt(document.getElementById('careerRushes').value);
    
    const gameCatches = parseInt(document.getElementById('gameCatches').value);
    const seasonCatches = parseInt(document.getElementById('seasonCatches').value);
    const careerCatches = parseInt(document.getElementById('careerCatches').value);
    
    const gamePunts = parseInt(document.getElementById('gamePunts').value);
    const seasonPunts= parseInt(document.getElementById('seasonPunts').value);
    const careerPunts= parseInt(document.getElementById('careerPunts').value);
    
    const gameReturns = parseInt(document.getElementById('gameReturns').value);
    const seasonReturns = parseInt(document.getElementById('seasonReturns').value);
    const careerReturns = parseInt(document.getElementById('careerReturns').value);        
    
    const gameFormat = ['Game',document.getElementById('gameFormat').value];
    const seasonFormat = ['Season',document.getElementById('seasonFormat').value];
    const careerFormat = ['Career',document.getElementById('careerFormat').value];
    
    //start with current season and work backwards so newest records win ties
    try{
        var careerData = new Array();
        for(var i=seasonEnd; i>(seasonStart-1); i--){  //i>0
           var seasonData = new Array();
           document.getElementById('greaseStatus').innerHTML = ' getting schedule for season ' + i + '...';     
           debug(' getting schedule for season ' + i + '...');
           //get the game ids for each season, again working from newest to oldest
           var gameId = getGameIds(getGameTable(i,teamId));
           
           //set up our start and end conditions based on which season we are in. Remember we are working backwards.
           var end = -1;
           if(i==seasonEnd){
                end = gameEnd;
           }else {
                end = gameId.length;
           }
           var start = -1;
           if(i==seasonStart){
                start = gameStart;
           }else{
                start = 1;
           }       
                
           for(var j=end-1; j>start-2; j--){
                var gameData = new Array();
                //get the game data for the game id
                document.getElementById('greaseStatus').innerHTML = ' getting data for season ' + i + ' game ' + (j+1) + '...';
                document.title = 'season ' + i + ' game ' + (j+1);
                debug(' getting data for season ' + i + ' game ' + (j+1) + '...');
                gameData = getGameData(gameId[j],teamId,i);
                //update the game record book
                document.getElementById('greaseStatus').innerHTML = ' updating single game records...';
                debug(' updating single game records...');
                gameRecord = updateRecordBook(gameRecord,gameData,[gamePasses,gameRushes,gameCatches,gamePunts,gameReturns]);
                seasonData.push(gameData);
           }
           //condense the season data
           document.getElementById('greaseStatus').innerHTML = ' condensing season ' + i + ' data...';
           debug(' condensing season ' + i + ' data...');
           seasonData = flatten(seasonData);
           //update the single season record book
           document.getElementById('greaseStatus').innerHTML = ' updating single season records...';
           seasonRecord = updateRecordBook(seasonRecord,seasonData,[seasonPasses,seasonRushes,seasonCatches,seasonPunts,seasonReturns]);     
           careerData.push(seasonData);  
        }
        //condense data again
        document.getElementById('greaseStatus').innerHTML = ' condensing career data...';
        debug(' condensing career data...');
        careerData = flatten(careerData); //the array is now gameData->Category->Player->Stats for dimensions
        //calculate all time recordbook
        document.getElementById('greaseStatus').innerHTML = ' updating career records...';
        careerRecord = updateRecordBook(careerRecord,careerData,[careerPasses,careerRushes,careerCatches,careerPunts,careerReturns]);
            
        //output data to recordBook div 
        document.getElementById('greaseStatus').innerHTML = ' formatting record books...';
        debug(' formatting record books...');
        document.getElementById('greaseStatus').innerHTML = '<div id="chooser"> </div><div id="game"> </div><div id="season" style="visibility: hidden; display:none;"> </div><div id="career" style="visibility: hidden; display:none;"> </div>';
        document.getElementById('game').innerHTML = format(gameRecord,gameFormat);
        document.getElementById('season').innerHTML = format(seasonRecord,seasonFormat);
        document.getElementById('career').innerHTML = format(careerRecord,careerFormat);
        
        var button = document.createElement('input');
        button.setAttribute('type','button');
        button.setAttribute('value','Show Game Record Book');
        button.addEventListener('click',function(){showBook('game')},false);
        
        document.getElementById('chooser').appendChild(button);
        
        button = document.createElement('input');
        button.setAttribute('type','button');
        button.setAttribute('value','Show Season Record Book');
        button.addEventListener('click',function(){showBook('season')},false);
        
        document.getElementById('chooser').appendChild(button);
        
        button = document.createElement('input');
        button.setAttribute('type','button');
        button.setAttribute('value','Show Career Record Book');
        button.addEventListener('click',function(){showBook('career')},false);
        
        document.getElementById('chooser').appendChild(button);
        
    }catch(err){
        document.getElementById('greaseStatus').innerHTML = ' Cannot recover from error!: <span style="font-size:70%; color:black;">' + err + '</span>';
    }
    
    document.title = title; //reset the title in chrome 
}

function getGameIds(gameTable){
    //paste the gametable into our invisible div so we can use the DOM on it
    var div = document.getElementById('greaseHidden');
    div.innerHTML = gameTable;
    if(div.innerHTML == ''){
        return [];
    }
    
    //identify the rows in the table
    var tr = div.getElementsByClassName('schedule_content')[0].getElementsByTagName('tr');
    
    var gameIds = new Array();
    //go through each row and pick out the game id
    for(i=1;i<tr.length;i++){
        if(tr[i].getElementsByTagName('td')[2].getElementsByTagName('a')[0].innerHTML == 'Matchup'){
            document.getElementById('greaseStatus').innerHTML = ' skipping unsimmed game...'; 
            continue;
        }
        gameIds = gameIds.concat(parseInt(tr[i].innerHTML.split('game_id=')[1].split('"')[0]));
    }    
    return gameIds;
}

function getGameTable(season, teamId){
    var url = 'http://goallineblitz.com/game/team.pl?season=' + season + '&team_id=' + teamId;   
    var div = document.getElementById('greaseHidden');
    return getResponseText(url);
} 

function getGameData(gameId, teamId, season){
    if(gameId == undefined){
        return [];
    }  
    var games = new Array();
    var url = 'http://goallineblitz.com/game/game.pl?game_id=' + gameId;
    
    var div = document.getElementById('greaseHidden');
    div.innerHTML = getResponseText(url);
    if(div.innerHTML == ''){
        return [];
    }
    
    const blowoutMod = parseFloat(document.getElementById('blowoutMod').value)/100;
    const blowoutCond = parseInt(document.getElementById('blowoutCond').value);
    
    //figure out if we were the home team to know which data to look at
    const team = document.getElementsByClassName('team_name');
    const homeId = parseInt(team[1].innerHTML.split('team_id=')[1].split('"')[0]);    
    const score = document.getElementsByClassName('total');
    const homeScore = parseInt(score[1].innerHTML);
    const awayScore = parseInt(score[2].innerHTML);
    
    var player = new Array();
    if(homeId == teamId){
        var home = true;
        var teamName = team[1].innerHTML.split('">')[1].split('</a>')[0];
        var oppId = parseInt(team[2].innerHTML.split('team_id=')[1].split('"')[0]);
        var oppName = team[2].innerHTML.split('">')[1].split('</a>')[0];
        var margin = homeScore-awayScore;
    } else {        
        var home = false;
        var teamName = team[2].innerHTML.split('">')[1].split('</a>')[0];
        var oppId = homeId;
        var oppName = team[1].innerHTML.split('">')[1].split('</a>')[0];
        var margin = awayScore-homeScore;
    }
    
    //figure out if we have have a blowout
    var modifier = 1;
    if(margin >= blowoutCond){ //we have a blowout
        modifier = blowoutMod;
    }        
       
    const boxScore = document.getElementById('box_score');
    
    //find out how many tables are in the boxscore section. This will let us know which way to parse the data
    var table = boxScore.getElementsByTagName('table');
    if(table.length == 10){ //old style tables        
        debug('using method 10');
        for(var i=2;i<10;i++){
            if(i==8){
                games.push([]); //no special teams tables so we need to fake one
            }
            var category = new Array();
            var tr = table[i].getElementsByTagName('tr');
            var breakPoint = table[i].getElementsByClassName('nonalternating_color2');
            var start = false;
            
            for(j=1;j<tr.length;j++){                
                
                if(home && tr[j]==breakPoint[0]){
                    start = true;
                    continue
                }
                
                if(home && tr[j]==breakPoint[1]){
                    start = false;
                    continue
                }
                
                if(!home && tr[j]==breakPoint[1]){
                    start = true;
                    continue
                }
                
                if(start){
                    var player = new Array();                    
                    var td = tr[j].getElementsByTagName('td');
                    
                    //first column needs to be parsed differently
                    var playerId = parseInt(td[0].childNodes[1].href.split('player_id=')[1].split('"')[0]);
                    var playerName = td[0].childNodes[1].innerHTML;
                    var playerPos = td[0].childNodes[0].innerHTML.split(' ')[0];
                    
                    player = player.concat([playerId,playerName,playerPos,teamId,teamName,oppId,oppName,gameId,season]);
                    for(var k=1;k<td.length;k++){
                        
                        if(i == 9){//defensive category
                            if(td.length == 14){ //we don't have a pancaked column
                                player = player.concat(modifier*parseFloat(td[k].innerHTML.replace(',','').replace(',','')));
                                if(k==13){
                                    player = player.concat(0); //add a dummy pancake value
                                }
                            }else if(td.length == 15){ //pancaked column in the wrong place
                                if(k==2){
                                    continue; //skip the pancaked column
                                }
                                player = player.concat(modifier*parseFloat(td[k].innerHTML.replace(',','').replace(',','')));
                                if(k==14){
                                    //add the pancaked column back in at the end
                                    player = player.concat(modifier*parseFloat(td[2].innerHTML.replace(',','').replace(',',''))); 
                                }
                                    
                            }
                        }else if(i==4){//receiving category
                            if(k==5){
                                //modify the YAC to be a total and not an average                                
                                var yac = parseFloat(td[5].innerHTML.replace(',','').replace(',',''));
                                var catches = parseFloat(td[2].innerHTML.replace(',','').replace(',',''));
                                player = player.concat(modifier*(yac*catches));
                            }else{
                                player = player.concat(modifier*parseFloat(td[k].innerHTML.replace(',','').replace(',','')));
                            }    
                        }else{
                            player = player.concat(modifier*parseFloat(td[k].innerHTML.replace(',','').replace(',','')));
                        }                            
                    }
                    category.push(player);                    
                }
            }
            games.push(category); 
        }
    }else if(table.length == 26){ //transition tables used for a very short time
        debug('using method 26');
        
        if(home){
            var i = 0;
        } else {
            i = 1;
        }
        
        table = document.getElementsByClassName('rowstyle-alternating_color2');
        
        for(i;i<16;i=i+2){
            if(i == 12 || i == 13){
                games.push([]); //no ST tables so we need to fake some
            }
            var category = new Array();
            var tr = table[i].getElementsByTagName('tr');
            for(var j=1;j<tr.length;j++){
                var player = new Array();
                var td = tr[j].getElementsByTagName('td');
                
                //first column needs to be parsed differently
                var playerId = parseInt(td[0].childNodes[1].href.split('player_id=')[1].split('"')[0]);
                var playerName = td[0].childNodes[1].innerHTML;
                var playerPos = td[0].childNodes[0].innerHTML.split(' ')[0];
                
                player = player.concat([playerId,playerName,playerPos,teamId,teamName,oppId,oppName,gameId,season]);
                for(var k=1;k<td.length;k++){
                    if(i==4 || i==5){//receiving category
                        if(k==5){
                            //modify the YAC to be a total and not an average                                
                            var yac = parseFloat(td[5].innerHTML.replace(',','').replace(',',''));
                            var catches = parseFloat(td[2].innerHTML.replace(',','').replace(',',''));
                            player = player.concat(modifier*(yac*catches));
                        }else{
                            player = player.concat(modifier*parseFloat(td[k].innerHTML.replace(',','').replace(',','')));
                        }    
                    } else {                    
                        player = player.concat(modifier*parseFloat(td[k].innerHTML.replace(',','').replace(',','')));
                    }
                }
                category.push(player);
            }
            games.push(category);
        }
              
    }else if(table.length == 29){ //new sortable tables
        debug('using method 29');        
        
        if(home){
            var i = 0;
        } else {
            i = 1;
        }
        
        table = document.getElementsByClassName('rowstyle-alternating_color2');
        
        for(i;i<18;i=i+2){
            var category = new Array();
            var tr = table[i].getElementsByTagName('tr');
            for(var j=1;j<tr.length;j++){
                var player = new Array();
                var td = tr[j].getElementsByTagName('td');
                
                //first column needs to be parsed differently
                var playerId = parseInt(td[0].childNodes[1].href.split('player_id=')[1].split('"')[0]);
                var playerName = td[0].childNodes[1].innerHTML;
                var playerPos = td[0].childNodes[0].innerHTML.split(' ')[0];
                
                player = player.concat([playerId,playerName,playerPos,teamId,teamName,oppId,oppName,gameId,season]);
                for(var k=1;k<td.length;k++){
                    if(i==4 || i==5){//receiving category
                        if(k==5){
                            //modify the YAC to be a total and not an average                                
                            var yac = parseFloat(td[5].innerHTML.replace(',','').replace(',',''));
                            var catches = parseFloat(td[2].innerHTML.replace(',','').replace(',',''));
                            player = player.concat(modifier*(yac*catches));
                        }else{
                            player = player.concat(modifier*parseFloat(td[k].innerHTML.replace(',','').replace(',','')));
                        }    
                    } else {                    
                        player = player.concat(modifier*parseFloat(td[k].innerHTML.replace(',','').replace(',','')));
                    }
                }
                category.push(player);
            }
            games.push(category);
        }
    }
    return games;
}

function flatten(array){    
    var flatData = '';
    if(array.length != 0){ //no need to flatten if it is empty        
        for(var i=0;i<array.length;i++){
            
            //error correction for empty arrays
            if(array[i] == ''){
                continue; //no need to process empty arrays
            }
            if(flatData == ''){
                var flatData = array[i]; //initialize data
                continue;
            }
            
            //looking at each individual game or season
            var period = array[i];
            
            for(var j=0;j<period.length;j++){
                //looking at each individual category
                var category = period[j];
                
                for(var k=0;k<category.length;k++){
                    
                    //looking at each individual player
                    var player = category[k];
                    
                    //check and see if player already exists in array
                    var playerId = player[0];
                    var location = -1;
                    for(var l=0; l<flatData[j].length; l++){
                        if(flatData[j][l][0] == playerId){
                            location = l;
                            break; //player found, so stop looking
                        }
                    }
                    
                    if(location != -1){ //add to exisitng player
                        const offset = 9; //skipping first 9 as they shouldn't change
                        for(var l=offset;l<player.length;l++){ 
                            flatData[j][location][l] = flatData[j][location][l] + player[l];
                        }
                        
                        //clean up percentages and averages
                        var stat = flatData[j][location];
                        switch(j){                            
                            case 0: //passing category 
                                stat[4+offset] = 100*(stat[1+offset]/stat[2+offset]); //completion percentage = comp/att
                                stat[5+offset] = (stat[3+offset]/stat[2+offset]); //ypa = yards/att
                                break;
                            case 1: //rushing category
        ' getting schedule for season ' + i + '...';                        stat[3+offset] = (stat[2+offset]/stat[1+offset]); //ypc = yards/rushes
                                break;
                            case 2: //receiving category
                                stat[3+offset] = (stat[2+offset]/stat[1+offset]); //yds per rec = yards/rec
                                break;
                            case 4: //punting category
                                stat[2+offset] = (stat[1+offset]/stat[0+offset]); //punting average = yards/punts
                                break;
                            case 5: //return category
                                stat[2+offset] = (stat[1+offset]/stat[0+offset]); //kr avg = yards/kick returns
                                stat[6+offset] = (stat[5+offset]/stat[4+offset]); //pr avg = yards/punts returns
                                break;
                        }
                        
                        //check to see if we can find a Retired Players Name
                        var currentName = flatData[j][location][1];
                        if(currentName == 'Retired Player'){ //go ahead and replace it
                            flatData[j][location][1] = array[i][j][k][1];
                        }                                                   
                    }else{ //add new player to array
                        flatData[j].push(player);
                    }                    
                }
            }
        }
    }
    return flatData;
}
           
function updateRecordBook(recordBook,data,minAttempts){
    var recordLength = parseInt(document.getElementById('recordLength').value);
    
    //initialize recordBook
    if(recordBook == ''){ 
        for(var i=0;i<data.length;i++){
            var category = data[i];
            //need to be able to handle initial data that has missing arrays
            var catLength = [11,9,9,9,3,8,10,2,14];
            var catArray = new Array();
            for(var j=0;j<catLength[i];j++){
                var statArray = new Array();
                for(var k=0;k<recordLength;k++){ //we will store the top 10 records...or whatever value the user defines
                    var recArray = new Array(); 
                    //[stat,player-id,player-name,position,team-id,team-name,opponent-id,opponent-name,game-id,season-id]
                    recArray = [0,0,0,0,0,0,0,0,0,0]; 
                    statArray.push(recArray);
                }
                catArray.push(statArray);
            }
            recordBook.push(catArray);
        }
    }
    
    //update the recordbook
    for(var i=0;i<data.length;i++){ //look through each category
        var category = data[i];
        for(var j=0;j<category.length;j++){ //look through each player
            var player = category[j];
            const offset = 9; //skipping first 9 as they shouldn't change
            for(var k=offset;k<player.length;k++){ //look through each stat for the player, skipping the first 9 which are identifiers              
                var stat = player[k];                
                for(var l=0;l<recordLength;l++){ //compare to the top 10...or whatever value the user defines
                    var qualified = true;                    
                    //make sure averages and percentages meet qualifiers
                    switch(i){
                        case 0: //passing category
                            if(k ==  4+offset || k == 5+offset){
                                if(player[2+offset] < minAttempts[0]){ //if attempts are less than min attempts
                                    qualified = false;
                                }
                            }
                            break;                                   
                        case 1: //rushing category
                            if(k == 3+offset){
                                if(player[1+offset] < minAttempts[1]){
                                    qualified = false;
                                }
                            }
                            break;
                        case 2: //recieveing category
                            if(k == 3+offset){
                                if(player[1+offset] < minAttempts[2]){
                                    qualified = false;
                                }
                            }
                            break;    
                        case 4: //punting category
                            if(k == 2+offset){
                                if(player[offset] < minAttempts[3]){
                                    qualified = false;
                                }
                            }
                            break;
                        case 5: //return category
                            if(k == 2+offset){
                                if(player[offset] < minAttempts[4]){
                                    qualified = false;
                                }
                            }
                            if(k == 6+offset){
                                if(player[4+offset] < minAttempts[4]){
                                    qualified = false;
                                }
                            }
                            break; 
                    }
                    if(stat > recordBook[i][k-offset][l][0] && qualified){ //new record
                        for(var m=recordLength-1;m>l;m--){ //shift records to the right
                            recordBook[i][k-offset][m] = recordBook[i][k-offset][m-1];
                        }                        
                        var record = [stat]; //init record                        
                        for(var m=0;m<offset;m++){ //add identifiers to end of record
                            record = record.concat(player[m]);
                        }
                        recordBook[i][k-offset][l] = record; //store record
                        break; //break because we don't need to compare to the rest of the records
                    }
                }
            }
        }
    }
    return recordBook;
}

function format(data,template){
    
    //to keep a categorie from showing up replace it with ''
    const categories=[['Passing','','Comp','','Yds','Pct','Y/A','Hry','Sck','','Int','TD'],
                     ['Rushing','','','Yds','Avg','TD','BrTk','TFL','Fum',''],
                     ['Receiving','','Rec','Yds','Avg','YAC','TD','Drop','Fum',''],
                     ['Kicking','FGM','','','','','40-49','50+','XPM',''],
                     ['Punting','','Yds','Avg'],
                     ['Return','','KR Yds','KR Avg','KR TD','','PR Yds','PR Avg','PR TD'],
                     ['Special Teams','','Tk','MsTk','FFum','','','','','',''],
                     ['Blocking','','Pnk'],
                     ['Defensive','','Tk','MsTk','Sack','','Hry','TFL','FFum','','PD','Int','','TD','']];
    
    const tags = ['%rank','%stat','%player-id','%player-name','%position','%team-id', '%team-name', '%opponent-id', '%opponent-name', '%game-id', '%season-id'];
    
    //data->category->stat->rank->info
    var txt = '<p>====================<br/>[b]' + template[0] + ' Records[/b]<br/>====================<br/>';
    for(var i=0;i<data.length;i++){
        txt += '<br/>[u]' + categories[i][0] + ' Records[/u]<br/>';
        var category = data[i];
        for(var j=0;j<category.length;j++){
            if(categories[i][j+1] != ''){ //checks to see if you want certain stats displayed
                var record = category[j];
                txt += '<br/>[b][i]' + categories[i][j+1] + '[/i][/b]<br/>';
                for(var k=0;k<record.length;k++){
                    if(record[k][0] == 0){ //don't show empty records
                        break;
                    }
                    var entry = template[1]; //create a temp copy of the template
                    for(var l=0;l<tags.length;l++){ //go through and replace each tag
                        while(entry.indexOf(tags[l]) != -1){
                            if(l==0){ //special case for the %rank tag since it is not stored directly in the array
                                entry = entry.replace(tags[l],(k+1));
                            }else if(l==1){
                                entry = entry.replace(tags[l],record[k][0].toFixed(1)); //fixing decimal point length
                            }else if(l==4){ //fix for retired players
                                var playerName = record[k][l-1];
                                if(playerName == 'Retired Player'){
                                    playerName = 'Player '+record[k][1];
                                }
                                entry = entry.replace(tags[l],playerName);                            
                            }else{    
                                entry = entry.replace(tags[l],record[k][l-1]);
                            }
                        }    
                    }
                    txt += entry+'<br/>'; //write the resulting string to the text
                }                    
            }
        }
    }
    txt += '</p><br/><hr><br/>';
    return txt;
}

function showOptions(){
    var location = document.getElementById('optionsDiv');
    if(location.className == 'off'){
        document.getElementById('optionsButton').value = 'hide options <<';
        location.className = 'on';
        location.removeAttribute("style","visibility: hidden; display:none;");
    }else if(location.className == 'on'){
        document.getElementById('optionsButton').value = 'show options >>';
        location.className = 'off';
        location.setAttribute("style","visibility: hidden; display:none;");
    }
}  

function showBook(method){
    document.getElementById('game').setAttribute("style","visibility: hidden; display:none;");
    document.getElementById('season').setAttribute("style","visibility: hidden; display:none;"); 
    document.getElementById('career').setAttribute("style","visibility: hidden; display:none;"); 
    document.getElementById(method).removeAttribute("style","visibility: hidden; display:none;");    
}

function getResponseText(url){
    var getData = true;
    var tries = 0;
    while(getData){
        tries++;
        getData = false;
        //grab data from the server
        var xmlhttp = new XMLHttpRequest();    
        xmlhttp.open('GET',url,false);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send('');       
        
        if(tries == 2){
            var skip = confirm('Looks like it\'s not working. Would you like to ignore this data and continue without it?');
            if(skip){
                return '';
            }else{
                tries = 0;
                getData = true;
            }            
        } else if(xmlhttp.status != 200){
            var retry = confirm(xmlhttp.status + ' Error, would you like to try again?');
            if(retry){
                getData = true;
            }else{
                return '';
            }
        }                         
    }
    return xmlhttp.responseText;
}

function debug(text) {
    try{
        console.log(text);
    }catch(e){
        try{
            opera.postError(text);
        }catch(e){
            alert(text);
        }
    }
}

function id(id){
    return document.getElementById(id);
}

//----------------------------menu interface functions--------------------------------//

function addGreaseDiv(){
    if(document.getElementById('greaseDiv') == null){ //check for existense so we don't make two of them
        
        var greaseDiv = document.createElement('div'); //used to house all greasemonkey related divs
        greaseDiv.setAttribute('style','margin: 0px -10px; background-color: #303030;');
        greaseDiv.setAttribute('id','greaseDiv');        
        
        var greaseMenu = document.createElement('div'); //used to house a main tab for the script
        greaseMenu.setAttribute('id','greaseMenu');
        greaseMenu.setAttribute('style','padding: 7px;');
        greaseDiv.appendChild(greaseMenu);
        
        var greaseOptions = document.createElement('div'); //used to house script options
        greaseOptions.setAttribute('id','greaseOptions');
        greaseOptions.setAttribute('style','background-color: white; margin: 0px 7px;');
        greaseDiv.appendChild(greaseOptions);
        
        var greaseStatus = document.createElement('div'); //used to display script status to the user
        greaseStatus.setAttribute('id','greaseStatus');
        greaseStatus.setAttribute('style','background-color: white; margin: 0px 7px;');
        greaseDiv.appendChild(greaseStatus);       
        
        var greaseHidden = document.createElement('div'); //used to store and data, likely from GET functions
        greaseHidden.setAttribute('id','greaseHidden');
        greaseHidden.setAttribute('style','visibility: hidden; display: none;');
        greaseDiv.appendChild(greaseHidden);
        
        var greaseClear = document.createElement('div'); //used to keep floating items from falling down into the regular page
        greaseClear.setAttribute('id','greaseClear');
        greaseClear.setAttribute('style','clear: both;');
        greaseDiv.appendChild(greaseClear);
        
        //place divs in page
        var location = document.getElementById('content');
        location.insertBefore(greaseDiv,location.firstChild);
    }
}

function addTab(tabText,optionId){
    var tab = document.createElement('a');
    tab.setAttribute('style','text-decoration: none; color: black; background-color: #C0C0C0; padding: 3px; cursor:pointer; cursor:hand;');
    tab.setAttribute('id',optionId + '-button');
    tab.innerHTML = tabText;
    tab.addEventListener('click',function(){toggleOption(optionId + '-options');},false);
    document.getElementById('greaseMenu').appendChild(tab);
    
    var optionDiv = document.createElement('div');
    optionDiv.setAttribute('id',optionId + '-options');
    optionDiv.setAttribute('class','off');
    optionDiv.setAttribute('style','visibility: hidden; display: none;');
    document.getElementById('greaseOptions').appendChild(optionDiv);        
}        

function toggleOption(optionId){
    
    //get the location of our option
    const option = document.getElementById(optionId);
        
    //get state of our option
    const state = document.getElementById(optionId).className;
    
    //set all options to off
    const turnOff = document.getElementById('greaseOptions').getElementsByClassName('on');
    for(i=0;i<turnOff.length;i++){
        turnOff[i].setAttribute('style','visibility: hidden; display: none;');
        turnOff[i].setAttribute('class','off');            
    }
    
    //set the state of our option to the proper setting
    if(state == 'off'){
        option.setAttribute('style','padding: 5px;');
        option.setAttribute('class','on');
    }
}               
