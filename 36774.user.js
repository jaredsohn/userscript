// ==UserScript==
// @name           GLB HomePage List View
// @namespace      GLB
// @description    Creates a listed view of the homepage
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==
// 
// 
// 


function getElementsByClassName(classname, par){
   var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var m=0,j=els.length; m<j; m++){      
      if(re.test(els[m].className)){
         a.push(els[m]);
      }
   }
   return a;
};


function CreateListedPlayers(){
	
    var thecheckbox = document.getElementById('listplayers');
    var playersinfo = document.getElementById('players');
    //verify if check box is checked or unchecked
    if (!thecheckbox.checked) {
    	GM_setValue("showListed",false);
        //if unchecked the show original page view
        playersinfo.innerHTML = originalhtml;
        var placeholder = document.getElementById('players')
        var button = document.createElement("input");
        button.setAttribute("value","listed");
        button.setAttribute("type","checkbox");
        button.setAttribute("id","listplayers");
        button.setAttribute("name","checklist");
        button.checked=false;
        button.addEventListener("click",CreateListedPlayers,true);

        var spn = document.createElement("span");
        spn.appendChild(button);
        spn.appendChild(document.createTextNode('Display Players in List View '))
        placeholder.insertBefore(spn,placeholder.firstChild);
        
    }else{
		GM_setValue("showListed",true);
        //create table showing players in a listed view
        //use createelement to create tr for header row append child
        playersinfo.innerHTML = '<br>' + listedhtml ;
        var placeholder = document.getElementById('players')
        var savedOrder = GM_getValue("listsortOrder","Ascending");
        
        if(savedOrder=="Ascending")
        {
            var adOptions = "<option value='Descending'>Descending</option><option value='Ascending' selected='selected'>Ascending</option>";
        }else{
            var adOptions = "<option value='Descending' selected='selected'>Descending</option><option value='Ascending'>Ascending</option>";
        }
        
        var adSE = document.createElement("select");
        adSE.id="adSelect";
        adSE.innerHTML=adOptions;
        
        var options = "<option value=''> Sort Players </option>";
        var sortTypes = new Array();
        sortTypes[0]="Alphabetical";
        sortTypes[1]="Next Game";
        sortTypes[2]="Team";
        sortTypes[3]="Position"
        sortTypes[4]="Level";
        sortTypes[5]="XP";
        sortTypes[6]="Date Created";
        sortTypes[7]="Skill Points";
        sortTypes[8]="Training Points";

        var saved = GM_getValue("listsorttype","0");
        for(var i=0; i<sortTypes.length; i++)
        {
            if(sortTypes[i]==saved)
                options+="<option value='"+sortTypes[i]+"' selected='selected'>"+sortTypes[i]+"</option>";	
            else
                options+="<option value='"+sortTypes[i]+"'>"+sortTypes[i]+"</option>";	
        }
        placeholder.insertBefore(adSE,placeholder.firstChild);
        placeholder.innerHTML = "<select id='sortPlayers'>"+options+"</select> " + placeholder.innerHTML;

        var oSelect = document.getElementById("sortPlayers");

        oSelect.addEventListener("change",sortList,true);

        

        var adSelectElement = document.getElementById("adSelect");
        adSelectElement.addEventListener("change",sortList,true);
        var button = document.createElement("input");
        button.setAttribute("value","listed");
        button.setAttribute("type","checkbox");
        button.setAttribute("id","listplayers");
        button.setAttribute("name","checklist");
        button.checked=true;
        button.addEventListener("click",CreateListedPlayers,true);

        var spn = document.createElement("span");
        spn.appendChild(button);
        spn.appendChild(document.createTextNode('Display Players in List View '))
        placeholder.insertBefore(spn,placeholder.firstChild);
		
        if (doSort) {
            sortList();
        }
        doSort=false;
        
    };

};


function sortList(){
    var oSelect = document.getElementById("sortPlayers");
    var type = oSelect.options[oSelect.selectedIndex].value;
    GM_setValue("listsorttype",type);
    var newOrder = new Array();


    switch (type){
        case 'Alphabetical':
            sortKey(15, 0);
            break;
        case 'Next Game':
            sortKey(19, 0);
            break;
        case 'Team':
            sortKey(17, 0);
            break;
        case 'Position':
            sortKey(2, 0);
            break;
        case 'Level':
            sortKey(4, 1);
            break;
        case 'XP':
            sortKey(12, 1);
            break;
        case 'Date Created':
            sortKey(0, 0);
            break;
        case 'Skill Points':
            sortKey(16, 1);
            break;
        case 'Training Points':
            sortKey(18, 1);
            break;
        default:
            sortKey(0, 0);
            break;
    }
    


}


function sortKey(k, num){
	
	
	var sortedArray	= new Array();


    var x, y
    // The Bubble Sort method.
    var holder = new Array(20);
    var sortSelect = document.getElementById("adSelect");
	var sortOrder = sortSelect.options[sortSelect.selectedIndex].value;
 
    GM_setValue("listsortOrder",sortOrder);
    if(sortOrder=="Ascending")	{
            for(x = 0; x < playersarr.length; x++) {
                for(y = 0; y < (playersarr.length-1); y++) {
                    if(playersarr[y][k] > playersarr[y+1][k]) {
                        holder = playersarr[y+1];
                        playersarr[y+1] = playersarr[y];
                        playersarr[y] = holder;
                    }
                }
            }
        }else{
            for(x = 0; x < playersarr.length; x++) {
                for(y = 0; y < (playersarr.length-1); y++) {
                    if(playersarr[y][k] < playersarr[y+1][k]) {
                        holder = playersarr[y+1];
                        playersarr[y+1] = playersarr[y];
                        playersarr[y] = holder;
                    }
                }
            }
        }

        listedhtml = '<table class="players" cellspacing="0" cellpadding="0"><tr class="nonalternating_color"><td class="player_name_head_short">Name</td><td class="player_position_head">Pos</td><td class="player_level_head">Level</td><td class="player_level_head">XP</td><td class="player_level_head">Skill Pts</td><td class="player_level_head">Team</td><td class="player_level_head">Train Pts</td><td class="player_level_head">Next Game</td><td class="player_level_head">Last Game</td><td class="player_energy_head">Energy</td></tr>';
        for(var sortloop =0; sortloop<playersarr.length;sortloop++) {
            if ((i%2)>0) {
                listedhtml+= '<tr class="alternating_color1"><td class="player_name_head_short">'+ playersarr[sortloop][1]+ '</td><td class="player_position_head">'+ playersarr[sortloop][2]+ '</td><td class="player_level_head">'+ playersarr[sortloop][4]+ '</td><td class="player_level_head">'+ playersarr[sortloop][5]+ '</td><td class="player_level_head">'+ playersarr[sortloop][6]+ '</td><td class="player_level_head">'+ playersarr[sortloop][7]+ '</td><td class="player_level_head">'+ playersarr[sortloop][8]+ '</td><td class="player_level_head">'+ playersarr[sortloop][9]+ '</td><td class="player_level_head">'+ playersarr[sortloop][10]+ '</td><td class="player_energy_head">'+ playersarr[sortloop][11]+ '</td></tr>';
                
            }else {
                listedhtml+= '<tr class="alternating_color2"><td class="player_name_head_short">'+ playersarr[sortloop][1]+ '</td><td class="player_position_head">'+ playersarr[sortloop][2]+ '</td><td class="player_level_head">'+ playersarr[sortloop][4]+ '</td><td class="player_level_head">'+ playersarr[sortloop][5]+ '</td><td class="player_level_head">'+ playersarr[sortloop][6]+ '</td><td class="player_level_head">'+ playersarr[sortloop][7]+ '</td><td class="player_level_head">'+ playersarr[sortloop][8]+ '</td><td class="player_level_head">'+ playersarr[sortloop][9]+ '</td><td class="player_level_head">'+ playersarr[sortloop][10]+ '</td><td class="player_energy_head">'+ playersarr[sortloop][11]+ '</td></tr>';
               
            };
        };
        listedhtml+= '</table>';
        
        doSort=false;
        CreateListedPlayers();
    

    
}

var doShowList = GM_getValue("showListed",false); // get saved state of whether to show as list
var placeholder = document.getElementById("players");
var originalhtml = placeholder.innerHTML;
var button = document.createElement("input");
button.setAttribute("value","listed");
button.setAttribute("type","checkbox");
button.setAttribute("id","listplayers");
button.setAttribute("name","checklist");
button.checked = doShowList;

button.addEventListener("click",CreateListedPlayers,false);

var spn = document.createElement("span");
spn.appendChild(button);
spn.appendChild(document.createTextNode('Display Players in List View'));
placeholder.insertBefore(spn,placeholder.firstChild);

var doSort = true;

//build array of players and player info
//playersarr[i][0] = player id  Need to make parseint   SORT
//playersarr[i][1] = player name   need to take out link not including link
//playersarr[i][2] = player position Good
//playersarr[i][3] = player photo Not needed
//playersarr[i][4] = player level Need to cut out Lv.
//playersarr[i][5] = player xp Good
//playersarr[i][6] = player skill points Good Need to take out link
//playersarr[i][7] = player team Need to take out link and forum 
//playersarr[i][8] = player training points ParseInt
//playersarr[i][9] = player next game Cut to Open and Close ()
//playersarr[i][10] = player last game 
//playersarr[i][11] = player energy Good
//playersarr[i][12] = player xp parsed int    SORT
//playersarr[i][13] = team id 
//playersarr[i][14] = player name with link
//playersarr[i][15] = Playername only    SORT
//playersarr[i][16] = Skill Points SORT
//playersarr[i][[17] = team name SORT
//playersarr[i][18] = Training Points SORT
//playersarr[i][19] = Next Game SORT
// 
// 

var playersarr = new Array();
var playerobj = document.getElementsByClassName('player_content');
var strholder = '';
var strloop ='';


var listedhtml = '<table class="players" cellspacing="0" cellpadding="0"><tr class="nonalternating_color"><td class="player_name_head_short">Name</td><td class="player_position_head">Pos</td><td class="player_level_head">Level</td><td class="player_level_head">XP</td><td class="player_level_head">Skill Pts</td><td class="player_level_head">Team</td><td class="player_level_head">Train Pts</td><td class="player_level_head">Next Game</td><td class="player_level_head">Last Game</td><td class="player_energy_head">Energy</td></tr>';

for (var i=0; i<playerobj.length;i++) {
    playersarr[i] = new Array(20);
    playersarr[i][0] = parseInt(playerobj[i].innerHTML.substring(playerobj[i].innerHTML.indexOf('player_id=') + 10, playerobj[i].innerHTML.indexOf('"',playerobj[i].innerHTML.indexOf('player_id=') + 10)));
    playersarr[i][1] = playerobj[i].innerHTML.substring(playerobj[i].innerHTML.indexOf('class="player_name">') + 20, playerobj[i].innerHTML.indexOf('</a>', playerobj[i].innerHTML.indexOf('class="player_name">')) + 4);
    playersarr[i][2] = playerobj[i].innerHTML.substring(playerobj[i].innerHTML.indexOf('</a>', playerobj[i].innerHTML.indexOf('class="player_name">') + 20) + 4, playerobj[i].innerHTML.indexOf('</div>', playerobj[i].innerHTML.indexOf('class="player_name">') + 2));
    playersarr[i][3] = playerobj[i].innerHTML.substring(playerobj[i].innerHTML.indexOf('"player_photo">') + 15, playerobj[i].innerHTML.indexOf('</div>', playerobj[i].innerHTML.indexOf('"player_photo">')));
    playersarr[i][4] = parseInt(playerobj[i].innerHTML.substring(playerobj[i].innerHTML.indexOf('"player_level">') + 18, playerobj[i].innerHTML.indexOf('</div>', playerobj[i].innerHTML.indexOf('"player_level">'))));
    playersarr[i][5] = playerobj[i].innerHTML.substring(playerobj[i].innerHTML.indexOf('"player_xp">') + 12, playerobj[i].innerHTML.indexOf('XP', playerobj[i].innerHTML.indexOf('"player_xp">')));
    if (playerobj[i].innerHTML.indexOf('Skill Points') > -1){
        playersarr[i][6] =  playerobj[i].innerHTML.substring((playerobj[i].innerHTML.indexOf('<br>') + 4), (playerobj[i].innerHTML.indexOf(' Skill Points')));
    }else {
        playersarr[i][6] = 0;
    };
    playersarr[i][7] = playerobj[i].innerHTML.substring(playerobj[i].innerHTML.indexOf('<td>', playerobj[i].innerHTML.indexOf('Team:'))+ 4,playerobj[i].innerHTML.indexOf('</td>', playerobj[i].innerHTML.indexOf('Team:') + 12 ));
    playersarr[i][8] = '<a href="/game/training.pl?player_id=' + playersarr[i][0] + '">' + playerobj[i].innerHTML.substring(playerobj[i].innerHTML.indexOf('<td>', playerobj[i].innerHTML.indexOf('Train Pts:')) + 4,playerobj[i].innerHTML.indexOf('(<', playerobj[i].innerHTML.indexOf('Train Pts:') + 10)) + '</a>';
    playersarr[i][9] = playerobj[i].innerHTML.substring(playerobj[i].innerHTML.indexOf('<td>', playerobj[i].innerHTML.indexOf('Next Game:')) + 4,playerobj[i].innerHTML.indexOf('</td>', playerobj[i].innerHTML.indexOf('Next Game:') + 16));
    playersarr[i][10] = playerobj[i].innerHTML.substring(playerobj[i].innerHTML.indexOf('<td>', playerobj[i].innerHTML.indexOf('Last Game:')) + 4,playerobj[i].innerHTML.indexOf('</td>', playerobj[i].innerHTML.indexOf('Last Game:') + 16));
    playersarr[i][11] = playerobj[i].innerHTML.substring(playerobj[i].innerHTML.indexOf('<td>', playerobj[i].innerHTML.indexOf('Energy:')) + 4,playerobj[i].innerHTML.indexOf('</td>', playerobj[i].innerHTML.indexOf('Energy:') + 13));
    playersarr[i][12] = parseInt(playersarr[i][5])
    playersarr[i][13] = playerobj[i].innerHTML.substring(playerobj[i].innerHTML.indexOf('/game/team.pl?team_id=') + 22, playerobj[i].innerHTML.indexOf('">', playerobj[i].innerHTML.indexOf('/game/team.pl?team_id=')));
    playersarr[i][14] = playerobj[i].innerHTML.substring(playerobj[i].innerHTML.indexOf('class="player_name">') + 20, playerobj[i].innerHTML.indexOf('</a>', playerobj[i].innerHTML.indexOf('class="player_name">')) + 4);
    //players just name
    playersarr[i][15] = playerobj[i].innerHTML.substring(playerobj[i].innerHTML.indexOf('>', playerobj[i].innerHTML.indexOf('/game/player.pl?')) + 1, playerobj[i].innerHTML.indexOf('</a>', playerobj[i].innerHTML.indexOf('class="player_name">')));
    //just skill point for  sorting
    if (playerobj[i].innerHTML.indexOf('Skill Points') > -1){
        playersarr[i][16] =  parseInt(playerobj[i].innerHTML.substring((playerobj[i].innerHTML.indexOf('>', playerobj[i].innerHTML.indexOf('skill_points.pl')) + 1), (playerobj[i].innerHTML.indexOf(' Skill Points'))));
    }else {
        playersarr[i][16] = parseInt(0);
    };
    //team name no links
    playersarr[i][17] = playerobj[i].innerHTML.substring(playerobj[i].innerHTML.indexOf('>', playerobj[i].innerHTML.indexOf('/game/team.pl?'))+ 1,playerobj[i].innerHTML.indexOf('</a>', playerobj[i].innerHTML.indexOf('/game/team.pl?')));
    //training points for sort
    playersarr[i][18] = parseInt(playerobj[i].innerHTML.substring(playerobj[i].innerHTML.indexOf('<td>', playerobj[i].innerHTML.indexOf('Train Pts:')) + 4,playerobj[i].innerHTML.indexOf('(<', playerobj[i].innerHTML.indexOf('Train Pts:') + 10)));
    //next game time for sort
    playersarr[i][19] = playerobj[i].innerHTML.substring(playerobj[i].innerHTML.indexOf('</a>', playerobj[i].innerHTML.indexOf('Next Game:')) + 9,playerobj[i].innerHTML.indexOf(')', (playerobj[i].innerHTML.indexOf('</a>', playerobj[i].innerHTML.indexOf('Next Game:')))));
    playersarr[i][19] = parseInt(playersarr[i][19].replace(/:/g, ''));
    
    

    if ((i%2)>0) {
        listedhtml+= '<tr class="alternating_color1"><td class="player_name_head_short">'+ playersarr[i][1]+ '</td><td class="player_position_head">'+ playersarr[i][2]+ '</td><td class="player_level_head">'+ playersarr[i][4]+ '</td><td class="player_level_head">'+ playersarr[i][5]+ '</td><td class="player_level_head">'+ playersarr[i][6]+ '</td><td class="player_level_head">'+ playersarr[i][7]+ '</td><td class="player_level_head">'+ playersarr[i][8]+ '</td><td class="player_level_head">'+ playersarr[i][9]+ '</td><td class="player_level_head">'+ playersarr[i][10]+ '</td><td class="player_energy_head">'+ playersarr[i][11]+ '</td></tr>';
        
    }else {
        listedhtml+= '<tr class="alternating_color2"><td class="player_name_head_short">'+ playersarr[i][1]+ '</td><td class="player_position_head">'+ playersarr[i][2]+ '</td><td class="player_level_head">'+ playersarr[i][4]+ '</td><td class="player_level_head">'+ playersarr[i][5]+ '</td><td class="player_level_head">'+ playersarr[i][6]+ '</td><td class="player_level_head">'+ playersarr[i][7]+ '</td><td class="player_level_head">'+ playersarr[i][8]+ '</td><td class="player_level_head">'+ playersarr[i][9]+ '</td><td class="player_level_head">'+ playersarr[i][10]+ '</td><td class="player_energy_head">'+ playersarr[i][11]+ '</td></tr>';
        
    };

    
};
listedhtml+= '</table>';

// show players in list if previously listed
if(doShowList){
	CreateListedPlayers();
}
