// ==UserScript==
// @name           GLB HomePageRewrite
// @namespace      GLB
// @author         DDCUnderground
// @description    ReWrite Homepage to try to better utilize space script includes player links, next game spread, cash to homepage, contract expiration, training value and some other features.
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==
// 

function OwnergetClocks() {
    var player_vitals_arr = document.getElementsByClassName("player_vital_head");
    for each (var player_vitals in player_vitals_arr){
	for each (var c in player_vitals.childNodes) {
	    if (c.data.indexOf("Next Game:") == 0) {
		var timeLocation = player_vitals.nextSibling.nextSibling;
		Ownerclocks.push(timeLocation.lastChild);
	    }
	}
    }
}

function OwnerparseClocks() {
    for each (var Ownerclock in Ownerclocks) {
        var clockString = Ownerclock.data;
	if (clockString == null) continue;
	
	clockString = clockString.slice(clockString.indexOf("(in ")+4);
	//console.log("cs="+clockString);
	clockString = clockString.split(":");

	var hours = parseFloat(clockString[0]);
	var minutes = parseFloat(clockString[1]);
	var seconds = parseFloat(clockString[2]);
	
	var currentDate = new Date();
	var game = new Date();
	game.setHours(currentDate.getHours()+hours);
	game.setMinutes(currentDate.getMinutes()+minutes);
	game.setSeconds(currentDate.getSeconds()+seconds+leeway);
	OwnergameTime.push(game);
    }
}

function OwnerupdateClocks() {
    for (var i=0; i<Ownerclocks.length; i++) {
	var difference = OwnergameTime[i].getTime() - new Date().getTime();
	if (difference < 0) {
	    window.location.reload();
	    return;
	}

	var hours = Math.floor(difference/1000/60/60);
	difference -= hours*1000*60*60;
	var minutes = Math.floor(difference/1000/60);
	difference -= minutes*1000*60;
	var seconds = Math.floor(difference/1000);

	if (minutes < 10) minutes = "0"+minutes;
	if (seconds < 10) seconds = "0"+seconds;

	var inetAddress = window.location+"";
	if (inetAddress.match("home.pl") != null) {
	    if (isNaN(hours) == false) {
		var s = Ownerclocks[i].data;
		s = s.slice(0,s.indexOf("(in "));
		Ownerclocks[i].data = s+" (in "+hours+":"+minutes+":"+seconds+")";
	    }
	}
	else if (inetAddress.match("league.pl") != null) {
	    Ownerclocks[i].innerHTML = "Today's Games - Next sim in: ";
	    if (isNaN(hours) == true) {
		Ownerclocks[i].innerHTML += "UNKNOWN";
	    }
	    else {
		Ownerclocks[i].innerHTML += hours+":"+minutes+":"+seconds;
	    }
	}
	else {
	    Ownerclocks[i].innerHTML = "Schedule and Scores (Next Sim: ";
	    if (isNaN(hours) == true) {
		Ownerclocks[i].innerHTML += "UNKNOWN)";
	    }
	    else {
		Ownerclocks[i].innerHTML += hours+":"+minutes+":"+seconds+")";
	    }
	}
    }
    if (Ownerclocks.length > 0) {
	var updateThread = setTimeout(OwnerupdateClocks,1000);
    }
}

function OwnergetGenericClocks(str) {
    var e = document.getElementById(str);
    if (e == null) return;

    var Ownerclock = e.getElementsByClassName("medium_head");
    if (Ownerclock == null) return;
    Ownerclock = Ownerclock[0];

    var clockString = Ownerclock.innerHTML;
    clockString = clockString.split(":");

    var hours = parseFloat(clockString[1]);
    var minutes = parseFloat(clockString[2]);
    var seconds = parseFloat(clockString[3]);
    
    var currentDate = new Date();
    var game = new Date();
    game.setHours(currentDate.getHours()+hours);
    game.setMinutes(currentDate.getMinutes()+minutes);
    game.setSeconds(currentDate.getSeconds()+seconds+leeway);

    Ownerclocks.push(Ownerclock);
    OwnergameTime.push(game);    
}

function OwnergetTeamClocks() {
    getGenericClocks("schedule");
}

function OwnergetLeagueClocks() {
    getGenericClocks("upcoming_games");
}

function OwnergetOwnerClocks() {
    var teams = document.getElementsByClassName("team_next_game");
    for each (t in teams) {
        Ownerclocks.push(t.lastChild);
    }
}


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


function getStat(teampath, i, outputstr, playerinfo){
	GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://goallineblitz.com' + teampath,
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(opteam) {
         
         //function to add next game spread to homepage 
         if (teampath == 'Unknown') {
             var playercontent=getElementsByClassName('player_content',document);
             playercontent[i].innerHTML = outputstr;
         } else {
         
         //declare variables
         var response1=opteam.responseText;
         var stat=response1.split('px">');
         var stat1=stat[1].split('</div></div>');
         var stat2=stat[9].split('</div></div>');
         var spread = stat2[0] - stat1[0];
         if (spread > 0) {
             spread = '+' + spread;
         }
         // get object for each players content window
         var playercontent=getElementsByClassName('player_content',document);
         // player information from first pull passed for reading
         var opponententryhold=playerinfo;
         var playerinfostr = opponententryhold[i].innerHTML;
         var correctlink = opponententryhold[i].innerHTML.indexOf('a href="/game/compare');
         var portion1end = opponententryhold[i].innerHTML.indexOf('</a>',correctlink);
         portion1end = portion1end + 4 ;
         var portion1str = opponententryhold[i].innerHTML.substr(0,portion1end);
         var portion2end = opponententryhold[i].innerHTML.length;
         var portion2str = opponententryhold[i].innerHTML.substring(portion1end,portion2end);
         //replace place holder for spread with actual stats
         outputstr = outputstr.replace('nextgamehold','(' + stat1[0] + ') ' + '(' + spread + ')');
         var teamoverall = response1.split('<div class="rating_bar">');
         var stat2=teamoverall[9].split('</div>');
         outputstr = outputstr.replace('teamoverallhold', stat2[0] + '</div>');
         //replace the players content window with built window
                 
         }
         lastplayer = lastplayer - 1
         playersinfo[i][7] = outputstr;
         playercontent[i].innerHTML = playersinfo[i][7]
         if(lastplayer==0) {
             if (showsort==1) {
                 sortList();
             }
             resize();
         }
 		}
	});
};

function getCash(playerId, i, playertrainid, outputstr, gamelink, playerinfo){
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(cash) {
         //function to add cash, Contract Expiration, and player overall bar to the player content window
         var response1=cash.responseText;
         //split for cash information
         var cash=response1.split('<td class="stat_head">');
         var cash1=cash[20].split('<td class="stat_value">');
         var cash2=cash1[1].split('</td>');
         //split for expiration
         var expdate=response1.split('/yr - Exp. ');
         var expdate1=expdate[1].split('</td>');
         expdate1[0] = expdate1[0].replace('(No Trade)','');
         //replace place holder for contract to player content window
         outputstr = outputstr.replace('contractexpireshold', expdate1[0]);
 
         if (showcash == 1) {
             //replace place holder for cash to player content window
             outputstr = outputstr.replace('cashholder',cash2[0]);
         }else {
             outputstr = outputstr.replace('cashholder','');
         }

         //replace place holder for player's overall stat to player content window
         var playeroverall = response1.split('<div class="rating_bar">');
         var playerbar = playeroverall[1].substring(0, (playeroverall[1].indexOf('</div>') + 6));
         if(playeroverall[1].indexOf('px') > 0) {
             statnum = playeroverall[1].substring((playeroverall[1].indexOf('px')-2),(playeroverall[1].indexOf('px')));
         } else {
             statnum = playeroverall[1].substring((playeroverall[1].indexOf('%')-2),(playeroverall[1].indexOf('%')));
         }
         
         playerbar = playerbar.replace('&nbsp;', statnum);
         outputstr = outputstr.replace('playeroverallhold', playerbar);

         //retrieve training points and replace placeholder with total training points.
         var trainingstatvalue = response1.split('<td class="stat_value"><a href=')
         var trainingstatpoint = trainingstatvalue[1].substring(trainingstatvalue[1].indexOf('">') + 2, trainingstatvalue[1].indexOf('</a'))
         playersinfo[i][10] = parseInt(trainingstatpoint)

         outputstr = outputstr.replace('trainingpoints', trainingstatpoint);

         //call function to pull training information
         addTraining(playertrainid, cash, i, outputstr, gamelink, playerinfo, response1);
      }
   })
};




function addTraining(playertrainid, cash, i, outputstr, gamelink, playerinfo, playerpagestr){

   //retrieve each training item and place into array [0]=skill [1] = value filled [2] = current stat level
   var playerstats = new Array()

   var playerstatholder = playerpagestr.split('<td class="stat_head">')
   for (var loopstats = 1; loopstats < 15; loopstats++) {
       playerstats[loopstats - 1] = new Array(3);
       playerstats[loopstats - 1][0] = playerstatholder[loopstats].substring(0, playerstatholder[loopstats].indexOf('</td>')-1);
       var stathold = playerstatholder[loopstats].substring(playerstatholder[loopstats].indexOf('training progress:') + 18, playerstatholder[loopstats].indexOf('%'));
       playerstats[loopstats - 1][1] = parseFloat(stathold.replace(/^\s+|\s+$/g, ''));
       if (playerstatholder[loopstats].indexOf('stat_value_boosted') > 0) {
           stathold = playerstatholder[loopstats].substring(playerstatholder[loopstats].indexOf('stat_value_boosted">') + 20, playerstatholder[loopstats].indexOf('<div'));
           playerstats[loopstats - 1][2] = parseFloat(stathold.replace(/^\s+|\s+$/g, ''));
       }else {
           stathold = playerstatholder[loopstats].substring(playerstatholder[loopstats].indexOf('stat_value">') + 12, playerstatholder[loopstats].indexOf('<div'));
           playerstats[loopstats - 1][2] = parseFloat(stathold.replace(/^\s+|\s+$/g, ''));
       }

   }


   //sort by % filled
    var closesttoup = 0
    // The Bubble Sort method.
    var holder = new Array(3);
    for(x = 0; x < playerstats.length; x++) {
        for(y = 0; y < (playerstats.length-1); y++) {
            if(playerstats[y][1] < playerstats[y+1][1]) {
                holder = playerstats[y+1];
                playerstats[y+1] = playerstats[y];
                playerstats[y] = holder;
            }
        }
     }

    //verify top item is greater than 0 
    if (playerstats[0][1] < 1){
        //if not > 0 then sort by highest value 
        for(x = 0; x < playerstats.length; x++) {
            for(y = 0; y < (playerstats.length-1); y++) {
                if(playerstats[y][2] < playerstats[y+1][2]) {
                    holder = playerstats[y+1];
                    playerstats[y+1] = playerstats[y];
                    playerstats[y] = holder;
                }
            }
         }
    }else{
        closesttoup = 1
    }

    //build training string
    if (closesttoup ==1) {
        var trainingline = ' Highest % filled: ' + playerstats[0][0] + '(' + playerstats[0][2] + ') @ ' + playerstats[0][1] + '%'
    }else{
        var trainingline = ' Highest Value: ' + playerstats[0][0] + ' @ ' + playerstats[0][2]
    }

    //write training string 
   outputstr = outputstr.replace('traininghold', ' ' + trainingline)
   //call function to add team spread
   
   if (gamelink =='Unknown' || showteaminfo == 0) {
       // get object for each players content window
       var playercontent=getElementsByClassName('player_content',document);
       playercontent[i].innerHTML = outputstr;
       lastplayer = lastplayer - 1
       playersinfo[i][7] = outputstr
       if(lastplayer==0) {
             if (showsort==1){
                 sortList();
             }
             resize();
       }
   }else{
       getStat(gamelink, i, outputstr, playerinfo);
   }
   
   
   
}


function playerlinks() {
//function to add players links to content window
modhtml(window.document,document.getElementById('players'),/<div class="player_name"><a href="\/game\/player\.pl\?player_id=(\d.*)">(.*)<\/a> \((.*)\)<\/div>/gi,'<div class="player_name"><a href="/game/player.pl?player_id=$1">$2</a> ($3)<span style="font-weight:normal; font-size:12px;">&nbsp;&nbsp;<a href="/game/equipment.pl?player_id=$1">Equipment</a>&nbsp;|&nbsp;<a href="/game/skill_points.pl?player_id=$1">Skill Points</a>&nbsp;|&nbsp;<a href="/game/player_tactics.pl?player_id=$1">Tactics</a></span></div>',null);
modhtml(window.document,document.getElementById('players'),/<td><a href="\/game\/team\.pl\?team_id=(\d*)">(.*)<\/a> \(<a href="\/game\/forum_thread_list\.pl\?team_id=(\d*)">Team Forum<\/a>\)<\/td>/gi,'<td><a href="/game/team.pl?team_id=$1">$2</a>&nbsp;(<a href="/game/forum_thread_list.pl?team_id=$1">Forum</a>)&nbsp;<a href="/game/depth_chart.pl?team_id=$1">Depth</a>&nbsp;|&nbsp;<a href="/game/team_player_stats.pl?team_id=$1">Leaders</a></td>',null);
};

function modhtml(doc, element, m, r) {
    m = new RegExp(m);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(m, r);
    };
};


function sortKey(k, num){
	
	
	var sortedArray	= new Array();


    var x, y
    // The Bubble Sort method.
    var holder = new Array(10);
    var sortSelect = document.getElementById("adSelect");
	var sortOrder = sortSelect.options[sortSelect.selectedIndex].value;
    if(sortOrder=="Ascending")	{
            for(x = 0; x < playersinfo.length; x++) {
                for(y = 0; y < (playersinfo.length-1); y++) {
                    if(playersinfo[y][k] < playersinfo[y+1][k]) {
                        holder = playersinfo[y+1];
                        playersinfo[y+1] = playersinfo[y];
                        playersinfo[y] = holder;
                    }
                }
            }
        }else{
            for(x = 0; x < playersinfo.length; x++) {
                for(y = 0; y < (playersinfo.length-1); y++) {
                    if(playersinfo[y][k] > playersinfo[y+1][k]) {
                        holder = playersinfo[y+1];
                        playersinfo[y+1] = playersinfo[y];
                        playersinfo[y] = holder;
                    }
                }
            }
        }
    var divsp=getElementsByClassName('content_container_sp player_box',document);
    
    if (divsp)
	{
        for(q=0;q<divsp.length;q++)
		   {
			   divsp[q].setAttribute('class','content_container player_box');
		   }
	   };

    var divs=getElementsByClassName('content_container player_box',document);
    var playercontent=getElementsByClassName('player_content',document);
    for(x = 0; x < playersinfo.length; x++) {
        playercontent[x].innerHTML = playersinfo[x][7];
    
   
            
            if (playersinfo[x][9] > 0 && turnoffblue==0)
            {
                divs[x].setAttribute('class','content_container_sp player_box');
                
            };
        
    };

    
	
	
	
	GM_setValue("sortOrder",sortOrder);

    if (dogametimecountdown==1) {
        
        getOwnerClocks();
        parseClocks();
        updateClocks();
        OwnergetClocks();
        OwnergetOwnerClocks();
        OwnerparseClocks();
        OwnerupdateClocks();
    }
}

function sortList(){
    var oSelect = document.getElementById("sortPlayers");
    var type = oSelect.options[oSelect.selectedIndex].value;

    var newOrder = new Array();


    switch (type){
        case 'Alphabetical':
            sortKey(1, 0);
            break;
        case 'Next Game':
            sortKey(2, 0);
            break;
        case 'Team':
            sortKey(3, 0);
            break;
        case 'Position':
            sortKey(4, 0);
            break;
        case 'Level':
            sortKey(5, 1);
            break;
        case 'XP':
            sortKey(6, 1);
            break;
        case 'Date Created':
            sortKey(0, 0);
            break;
        case 'Skill Points':
            sortKey(9, 1);
            break;
        case 'Training Points':
            sortKey(10, 1);
            break;
        default:
            sortKey(0, 0);
            break;
    }
    GM_setValue("type",type);


}


function resize() {
	var boxes = document.getElementsByClassName("player_content");
    var height = -1;
	for each (var b in boxes) {
        var s = 0;
        for (var c=2; c<b.childNodes.length; c++) {
            var child = b.childNodes[c];
            if (child.offsetHeight == null) continue;
            s += child.offsetHeight;
        }
        if (s > height) {
            height = s;
        }
    }

    height += lead;
	var boxes = document.getElementsByClassName("player_box");
	for each (var b in boxes) {
		var newStyle = "height: "+height+"px;";
		var style = b.getAttribute("style");
		if (style != null) {
			newStyle += style;
		}
		b.setAttribute("style",newStyle);
	}
}

function getClocks() {
    var player_vitals_arr = document.getElementsByClassName("player_vital_head");
    for each (var player_vitals in player_vitals_arr){
	for each (var c in player_vitals.childNodes) {
	    if (c.data.indexOf("Next Game:") == 0) {
		var timeLocation = player_vitals.nextSibling.nextSibling;
		clocks.push(timeLocation.lastChild);
	    }
	}
    }
   
}

function parseClocks() {
    for (var clock = 0; clock<playersinfo.length; clock++) {
        var clockString = playersinfo[clock][8]
    	if (clockString == null) continue;
    	
    	clockString = clockString.slice(clockString.indexOf("(in ")+4);
        clockString = clockString.split(":");
    
    	var hours = parseFloat(clockString[0]);
    	var minutes = parseFloat(clockString[1]);
    	var seconds = parseFloat(clockString[2]);
    	
    	var currentDate = new Date();
    	var game = new Date();
    	game.setHours(currentDate.getHours()+hours);
    	game.setMinutes(currentDate.getMinutes()+minutes);
    	game.setSeconds(currentDate.getSeconds()+seconds+leeway);
    	gameTime[clock] = game;
    }
}

function updateClocks() {
    var playercontent=getElementsByClassName('player_content',document);
    for (var i=0; i<playersinfo.length; i++) {
    	var difference = gameTime[i].getTime() - new Date().getTime();
    	if (difference < 0) {
    	    window.location.reload();
    	    return;
    	}
    
    	var hours = Math.floor(difference/1000/60/60);
    	difference -= hours*1000*60*60;
    	var minutes = Math.floor(difference/1000/60);
    	difference -= minutes*1000*60;
    	var seconds = Math.floor(difference/1000);
    
    	if (minutes < 10) minutes = "0"+minutes;
    	if (seconds < 10) seconds = "0"+seconds;
    
    	if (isNaN(hours) == false) {
            playersinfo[i][7] = playersinfo[i][7].replace(playersinfo[i][7].substring(playersinfo[i][7].indexOf('(in '), (playersinfo[i][7].indexOf(')',playersinfo[i][7].indexOf('(in ')) + 1)), " (in "+hours+":"+minutes+":"+seconds+")");
            playercontent[i].innerHTML = playersinfo[i][7]    	
        }
    }
    if (gameTime.length > 0) {
        var updateThread = setTimeout(updateClocks,10000);
    }
}

function getGenericClocks(str) {
    var e = document.getElementById(str);
    if (e == null) return;

    var clock = e.getElementsByClassName("medium_head");
    if (clock == null) return;
    clock = clock[0];

    var clockString = clock.innerHTML;
    clockString = clockString.split(":");

    var hours = parseFloat(clockString[1]);
    var minutes = parseFloat(clockString[2]);
    var seconds = parseFloat(clockString[3]);
    
    var currentDate = new Date();
    var game = new Date();
    game.setHours(currentDate.getHours()+hours);
    game.setMinutes(currentDate.getMinutes()+minutes);
    game.setSeconds(currentDate.getSeconds()+seconds+leeway);

    clocks.push(clock);
    gameTime.push(game);    
}

function getTeamClocks() {
    getGenericClocks("schedule");
}

function getLeagueClocks() {
    getGenericClocks("upcoming_games");
}

function getOwnerClocks() {
    var teams = document.getElementsByClassName("team_next_game");
    for each (t in teams) {
        clocks.push(t.lastChild);
    }
}

//variable to determine how long to wait before starting the script
var timeout = 0;
//variable to control whether the contract expiration is displayed. 0 means it is not and 1 means that it is
var showcontract = 0;
//variable to control whether a players box is blue when skill points are still available. 0 mean blue boxes 1 means no blue boxes
var turnoffblue = 1;
//variable to control whether a players cash is displayed on the homepage. 1 will display and 0 will not
var showcash = 1;
//variable to control whether to show sort or not
var showsort = 1;
//variable to control whether gametime countdown is active
var dogametimecountdown = 0;
//variable to control whether to show team overall and team spread info.
var showteaminfo = 1;

//variable to hold array based on each player
var playersinfo = new Array()

//playersinfo(x,0) = playerid
//playersinfo(x,1) = player name
//playersinfo(x,2) = next game
//playersinfo(x,3) = team
//playersinfo(x,4) = position
//playersinfo(x,5) = level
//playersinfo(x,6) = xp
//playersinfo(x,7) = playercontent
//playersinfo(x,8) = gameclock
//playersinfo(x,9) = skillpoints
//playersinfo(x,10) = training points


/*

sortTypes[0]="Alphabetical";
sortTypes[1]="Next Game";
sortTypes[2]="Team";
sortTypes[3]="Position"
sortTypes[4]="Level";
sortTypes[5]="XP";
sortTypes[6]="Date Created";
sortTypes[7]="Skill Points";
sortTypes[8]="Training Points";

*/

var lastplayer =''

var lead = 10;

var leeway = 3;

var clocks = [];
var gameTime = new Array();
var Ownerclocks = [];
var OwnergameTime = [];
var teamoverall = new Array();

// Ideas: build count of unique team ids, run matchup team info first, store info in array.
//  Once count has been filled in array then move to player pages while using buffered team info. 
//  check version 233


window.setTimeout( function() {

   //declare variables for individual segments of the players content window
   var playercontent=getElementsByClassName('player_content',document);
   var playerphoto=getElementsByClassName('player_photo',document);
   var playerlevel=getElementsByClassName('player_level',document);
   var playerxp=getElementsByClassName('player_xp',document);
   var playername=getElementsByClassName('player_name',document);
   var playervitals=getElementsByClassName('player_vitals',document);
   var playervitalhead=getElementsByClassName('player_vital_head',document);
   var playertrain=getElementsByClassName('player_vitals',document);
   var playerinfo=getElementsByClassName('player_vitals',document);

   //if (turnoffblue==1) {
   
	   var divs=getElementsByClassName('content_container_sp player_box',document);
	   if (divs)
	   {
		   for(q=0;q<divs.length;q++)
		   {
			   divs[q].setAttribute('class','content_container player_box');
		   }
	   };
   //};

   


   var playerid = '';
   var teamid = '';


   if (showsort==1) {
       var container = getElementsByClassName("medium_head subhead_head",document)[0];
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
    
       var saved = GM_getValue("type","0");
       for(var i=0; i<sortTypes.length; i++)
       {
           if(sortTypes[i]==saved)
               options+="<option value='"+sortTypes[i]+"' selected='selected'>"+sortTypes[i]+"</option>";	
           else
               options+="<option value='"+sortTypes[i]+"'>"+sortTypes[i]+"</option>";	
       }
    
       container.innerHTML = container.innerHTML +" | <select id='sortPlayers'>"+options+"</select> ";
    
       var oSelect = document.getElementById("sortPlayers");
    
       oSelect.addEventListener("change",sortList,true);
    
       var adOptions = "<option value='Descending'>Descending</option><option value='Ascending'>Ascending</option>";
       var adSE = document.createElement("select");
       adSE.id="adSelect";
       adSE.innerHTML=adOptions;
       var savedOrder = GM_getValue("sortOrder","0");
       if(savedOrder!="0")
       {
           if(savedOrder=="Ascending")
           {
               adSE.options[1].selected = true;
           }
           else{
               adSE.options[0].selected = true;
           }
       }
       container.appendChild(adSE);
    
       var adSelectElement = document.getElementById("adSelect");
       adSelectElement.addEventListener("change",sortList,true);
    
   }






   lastplayer = (playercontent.length)
   //loop through each player on the homepage
   for (var i = 0; i < playercontent.length; i++) {
            //retrieve individual players content window
            var teamitemshtml = playervitals[i].innerHTML;
            var teamitemsrows = teamitemshtml.split('<tr>');
            playersinfo[i] = new Array(9)
            
            if (teamitemsrows.length > 5) {
                if (teamitemsrows[2].indexOf('spend') > 0) {
                    var teamitemscells = teamitemsrows[1].split('<td>');
                    var teamlastgame = teamitemsrows[4].split('<td>');
                    var teamnextgame = teamitemsrows[3].split('<td>');
                    var playerenergy = teamitemsrows[5].split('<td>');
                }else{
                    var teamitemscells = teamitemsrows[1].split('<td>');
                    var teamlastgame = teamitemsrows[3].split('<td>');
                    var teamnextgame = teamitemsrows[2].split('<td>');
                    var playerenergy = teamitemsrows[4].split('<td>');
                }
                var playerinfostr = playerinfo[i].innerHTML;
                var playerinfoItems = playerinfostr.split('a href="/game/compare');  
                
                //pull what the link is for the game comparison
                gamelink = '/game/compare' + playerinfoItems[1].substr(0,playerinfoItems[1].indexOf('">'));
            } else if (teamitemsrows.length == 5){
                var teamitemscells = teamitemsrows[1].split('<td>');
                if (teamitemsrows[3].indexOf('Show Score') > 0) {
                    var teamlastgame = teamitemsrows[3].split('<td>');
                    var teamnextgame = 'Unknown';
                }else {
                    var teamnextgame = teamitemsrows[3].split('<td>');
                    var teamlastgame = 'Unknown';
                }
                var playerenergy = teamitemsrows[4].split('<td>');
                //pull what the link is for the game comparison
                gamelink = 'Unknown';
            }else if (teamitemsrows.length==3){
                var teamitemscells = teamitemsrows[1].split('<td>');
                var teamlastgame = 'Unknown';
                var teamnextgame = 'Unknown';
                var playerenergy = teamitemsrows[2].split('<td>');
                //pull what the link is for the game comparison
                gamelink = 'Unknown';
            };

            
            // set player id 
            playerid = playerphoto[i].innerHTML.substring((playerphoto[i].innerHTML.indexOf('player_id=') + 10),(playerphoto[i].innerHTML.indexOf('" width',(playerphoto[i].innerHTML.indexOf('player_id=') + 10))));
            playersinfo[i][0] = parseInt(playerid)
            //set team id
            teamid = playervitals[i].innerHTML.substring((playervitals[i].innerHTML.indexOf('team_id=') + 8),(playervitals[i].innerHTML.indexOf('">',(playervitals[i].innerHTML.indexOf('team_id=') + 8))));
            //player left side div
            var playercontentstr = '<div class="player_left_side">';
            //player photo div    
            //determine if contract info is to be displayed if it is then shrink the picture to allow for space and add placeholder
            if (showcontract ==1) {
                playercontentstr = playercontentstr + playerphoto[i].innerHTML.replace(/"75"/g, '"75"');
                playercontentstr = playercontentstr + '<span class="player_xp">Contract Ends:<br>contractexpireshold</span>'; 
            } else
            {
               playercontentstr = playercontentstr + '<div class="player_photo">' + playerphoto[i].innerHTML + '</div>';
               playercontentstr = playercontentstr + '<br>';
            };
            playercontentstr = playercontentstr + '<div class="player_level"><span style="font-weight:normal; font-size:12px; color:black; text-align: right"><font align="right"><b>Energy: ' + playerenergy[1].substring(0, (playerenergy[1].indexOf('</div>') + 12))+ '</b></font></span></div>';
            // player close left side div
            playercontentstr = playercontentstr + '</div>';
            //place holder for Name Line
            playercontentstr = playercontentstr + '<div class="player_name"><span style="font-weight:normal; font-size:15px; color:black"><b>' + playername[i].innerHTML ;
            playersinfo[i][1] = playername[i].innerHTML.substring(playername[i].innerHTML.indexOf('>') + 1, playername[i].innerHTML.indexOf('<',5))
            
            playersinfo[i][4] = playername[i].innerHTML.substring(playername[i].innerHTML.indexOf('(', playername[i].innerHTML.indexOf('</a>')), playername[i].innerHTML.indexOf(')', playername[i].innerHTML.indexOf('</a>')) + 1)
            

            playercontentstr = playercontentstr + '</span><span style="font-weight:normal; font-size:13px; color:black"><b>&nbsp;&nbsp;' + playerlevel[i].innerHTML + '&nbsp;&nbsp;</span><span style="font-weight:normal; font-size:12px; color:black">';

            playersinfo[i][5] = parseInt(playerlevel[i].innerHTML.substr(playerlevel[i].innerHTML.indexOf('.') + 2));
            

            playersinfo[i][6] = parseInt(playerxp[i].innerHTML.substring(0,playerxp[i].innerHTML.indexOf('/')));
            
            //remove skill points and add the points after the skill link if applicable
            if (playerxp[i].innerHTML.indexOf('Skill Points') > -1){
               var skillpointshave =  playerxp[i].innerHTML.substring((playerxp[i].innerHTML.indexOf('">') + 2), (playerxp[i].innerHTML.indexOf(' Skill Points')));
            }else {
               var skillpointshave = 0;
            };

            playersinfo[i][9] = parseInt(skillpointshave);
            
            var xpholder = playerxp[i].innerHTML.replace('<br><a href="/game/skill_points.pl?player_id=' + playerid + '">' + skillpointshave + ' Skill Points</a>', '');

            if (skillpointshave > 0) {
               var skillpointstr = '(' + skillpointshave + ')';
            }else {
               var skillpointstr = '';
            };

            playercontentstr = playercontentstr + xpholder.replace('<br>', '') + '&nbsp;&nbsp; cashholder</b></span></div>';
            // player links
            playercontentstr = playercontentstr + '<div><span style="font-weight:normal; font-size:11px; color:black"></b>&nbsp;&nbsp;<a href="/game/equipment.pl?player_id=' + playerid + '">Equipment</a>&nbsp;|&nbsp;<a href="/game/skill_points.pl?player_id=' + playerid + '">Skill Points ' + skillpointstr + '</a>&nbsp;|&nbsp;<a href="/game/player_tactics.pl?player_id=' + playerid + '">Tactics</a>&nbsp;|&nbsp;';
            playercontentstr = playercontentstr + '<a href="/game/forum_thread_list.pl?team_id=' + teamid + '">Forum</a>&nbsp;|&nbsp<a href="/game/depth_chart.pl?team_id=' + teamid + '">Depth</a>&nbsp;|&nbsp;<a href="/game/team_player_stats.pl?team_id=' + teamid + '">Leaders</a>&nbsp;|&nbsp<a href="/game/training.pl?player_id=' + playerid + '">Training (trainingpoints)</a></span></div>';
            //Build Table for team & games
            playercontentstr = playercontentstr + '<table cellspacing="0" cellpadding="3">';
            playercontentstr = playercontentstr + '<tr>';
            playercontentstr = playercontentstr + '<td><b>Team:</b></td>';

            playersinfo[i][3] = teamitemscells[1].substring(teamitemscells[1].indexOf('>') + 1, teamitemscells[1].indexOf('</a>'))
                
            
           //Find Team Data Row
           playercontentstr = playercontentstr +  '<td>' + teamitemscells[1].substring(0,(teamitemscells[1].indexOf('</a>') + 4)) + '</td>';
           playercontentstr = playercontentstr +  '<td><b>Last:</b></td><td>' 
           if (teamitemsrows.length ==3 ) {
               playercontentstr = playercontentstr + 'Unknown</td>';
           }else {
               playercontentstr = playercontentstr + teamlastgame[1].substring(0,(teamlastgame[1].indexOf('</td>') + 5));
           }
           playercontentstr = playercontentstr + '</tr>';
           if (teamnextgame == 'Unknown') {
               var teamnextgameinfo = 'Unknown &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
           }else {
               var teamnextgameinfo = teamnextgame[1].substring(0,(teamnextgame[1].indexOf('</td>')));
           };
           playersinfohold = teamnextgameinfo.substring(teamnextgameinfo.indexOf('(',teamnextgameinfo.indexOf('</a>')) + 4, teamnextgameinfo.indexOf(')',teamnextgameinfo.indexOf('</a>')))
           playersinfo[i][8] = teamnextgameinfo.substring(teamnextgameinfo.indexOf('(',teamnextgameinfo.indexOf('</a>')), teamnextgameinfo.indexOf(')',teamnextgameinfo.indexOf('</a>')) + 1)
           playersinfo[i][2] = parseInt(playersinfohold.replace(/:/g, ''));
           
           if (showteaminfo==1) {
               teamnextgameinfo = teamnextgameinfo.replace('(', 'nextgamehold (');
           }
           //if the next game variable is too long then shrink it to make it fit on one line.
           if (teamnextgameinfo.length > 130) {
               teamnextgameinfo = '<span style="font-weight:normal; font-size:10px; color:black">' + teamnextgameinfo + '</span>';
           };
           playercontentstr = playercontentstr + '<tr><td><b>Next:</b></td><td colspan=3>' + teamnextgameinfo + '</td>';
           playercontentstr = playercontentstr + '</tr>';
           playercontentstr = playercontentstr + '<tr><td colspan=4><span style="font-weight:normal; font-size:12px; color:black; text-align: right"><font align="right"><b>Training: </b>traininghold</font></span></div></td></tr>';
           
           playercontentstr = playercontentstr + '<tr><td></td><td><b>Player Overall:</b></td><td></td><td>';
           if (teamnextgameinfo == 'Unknown &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' || showteaminfo == 0) {
               playercontentstr = playercontentstr + '</td></tr>';
           } else{
               playercontentstr = playercontentstr + '<b>Team Overall: </b></td></tr>';
           }
           playercontentstr = playercontentstr + '<tr><td></td><td colspan=2><div class="rating_bar">playeroverallhold</div></td><td colspan=2>';
           if (teamnextgameinfo == 'Unknown &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' || showteaminfo == 0) {
               playercontentstr = playercontentstr + '</td></tr>';
           }else {
               playercontentstr = playercontentstr + '<div class="rating_bar">teamoverallhold</div></td></tr>';
           };
               
           playercontentstr = playercontentstr + '</table>';
           
		   //set player cash
		   var playertrainInfo = playertrain[i].innerHTML;
           var playerinfotrainItems = playertrainInfo.split('<tr>');  
           
           //call functions to replace place holders with real information
           getCash(playerid, i, playerinfotrainItems[2], playercontentstr, gamelink, playerinfo);
      
   };
},timeout);
