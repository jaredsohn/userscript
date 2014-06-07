// ==UserScript==
// @name           GLB Records Stat Tracking
// @namespace      GLB
// @description    Input several Game IDs and the script will supply stat records
// @include        http://goallineblitz.com/game/game.pl?game_id=*
// ==/UserScript==
// 


//function to allow for searching and retrieving elements by class name
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



function sortArray(arrayname, k, asc){
	
	
	//var sortedArray	= new Array();


    var x, y
    // The Bubble Sort method.
    //var holder = new Array(10);
    //var sortSelect = document.getElementById("adSelect");
	//var sortOrder = sortSelect.options[sortSelect.selectedIndex].value;
    if(asc==1)	{
            for(x = 0; x < arrayname.length; x++) {
                for(y = 0; y < (arrayname.length-1); y++) {
                    if(arrayname[y][k] < arrayname[y+1][k]) {
                        holder = arrayname[y+1];
                        arrayname[y+1] = arrayname[y];
                        arrayname[y] = holder;
                    }
                }
            }
    }else{
            for(x = 0; x < arrayname.length; x++) {
                for(y = 0; y < (arrayname.length-1); y++) {
                    if(arrayname[y][k] > arrayname[y+1][k]) {
                        holder = arrayname[y+1];
                        arrayname[y+1] = arrayname[y];
                        arrayname[y] = holder;
                    }
                }
            }
    };
}



//function to allow for searching and retrieving elements by class name
function getElementsByMultiClassNameWC(classname, classname2, classname3, par){
   var a=[];  
   var re = new RegExp(classname); 
   var re2 = new RegExp(classname2); 
   var re3 = new RegExp(classname3); 
   var els = par.getElementsByTagName("*");
   for(var m=0,j=els.length; m<j; m++){      
      if(re.test(els[m].className)){
         a.push(els[m]);
      }
      if(re2.test(els[m].className)){
         a.push(els[m]);
      }
      if(re3.test(els[m].className)){
         a.push(els[m]);
      }
   }
   return a;
};




//function to allow for searching and retrieving elements by class name
function getElementsByMultiClassName(classname, classname2,  par){
   var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var re2 = new RegExp('\\b' + classname2 + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var m=0,j=els.length; m<j; m++){      
      if(re.test(els[m].className)){
         a.push(els[m]);
      }
      if(re2.test(els[m].className)){
         a.push(els[m]);
      }
   }
   return a;
};

// get game ids
var loaddiv = document.createElement('div');
loaddiv.setAttribute('class','tab_off');
loaddiv.setAttribute('id','divholder');
var loadLink = document.createElement('a');
loadLink.setAttribute('href', '#');
loadLink.innerHTML = "Load Stats";
loadLink.addEventListener('click',loadStats, false);
loaddiv.appendChild(loadLink);
// subhead_link_bar
var subhead_link_bar = getElementsByClassName("subhead_link_bar clear", document);
subhead_link_bar[0].innerHTML = subhead_link_bar[0].innerHTML + " ";
subhead_link_bar[0].appendChild(loaddiv);


// build array for each category
// arrteampoints = total score (team name, player name, yds)
var arrteampoints = new Array();
// arrpassyds = individual passing yards (team name, player name, yds)
var arrpassyds = new Array();
// arrpasstds = individual passing TDS (team name, player name, tds)
var arrpasstds = new Array();
// arrrushyds = individual rushing yards(team name, player name, yds)
var arrrushyds = new Array();
// arrrushtds = individual rushing TDs (team name, player name, tds)
var arrrushtds = new Array();
// arrreceptions = individual receptions (team name, player name, receptions)
var arrreceptions = new Array();
// arrrecyards = individual receiving yds (team name, player name, yds)
var arrrecyds = new Array();
// arrrectds = individual receiving TDs (team name, player name, tds)
var arrrectds = new Array();
// arrpancakesc = individual pancakes by C (team name, player name, pancakes)
var arrpancakesc = new Array();
// arrpancakesg = individual pancakes by G (team name, player name, pancakes)
var arrpancakesg = new Array();
// arrpancakest = individual pancakes by T (team name, player name, pancakes)
var arrpancakest = new Array();
// arrpancakeste = individual pancakes by TE (team name, player name, pancakes)
var arrpancakeste = new Array();
// arrpancakesfb = individual pancakes by FB (team name, player name, pancakes)
var arrpancakesfb = new Array();
// arrpancakeswr = individual pancakes by WR  (team name, player name, pancakes)
var arrpancakeswr = new Array();
// arrfgmade = individual fgs made (team name, player name, fgs)
var arrfgmade = new Array();
// arrpuntingavg = individual punting average (team name, player name, avg)
var arrpuntingavg = new Array();
// arrpravg = individual PR avg (team name, player name, avg)
var arrpravg = new Array();
// arrkravg = individual KR avg (team name, player name, avg)
var arrkravg = new Array();
// arrPRtds = individual PR TDs (team name, player name, tds)
var arrprtds = new Array();
// arrKRtds = individual KR TDs (team name, player name, tds)
var arrkrtds = new Array();
// arrsacks = individual sacks (team name, player name, sacks)
var arrsacks = new Array();
// arrtackles = individual tackles (team name, player name, tackles)
var arrtackles = new Array();
// arrff = individual forced fumbles (team name, player name, forced fumbles)
var arrff = new Array();
// arrints = individual ints (team name, player name, ints)
var arrints = new Array();
// arrpds = individual pds (team name, player name, pds)
var arrpds = new Array();
// arrhurries = individual hurries (team name, player name, hurries)
var arrhurries = new Array();
// arrteamdiff = team points differential  (team name, differntial)
var arrteamdiff = new Array();
// arrteamydsrushing = team yds rushing (team name, yds)
var arrteamydsrushing = new Array();
// arrteamydspassing = team yds passing (team name, yds)
var arrteamydspassing = new Array();
// arrteamydstotal = team total yds (team name, yds)
var arrteamydstotal = new Array();
// arrteamydsrushingdef = team yds rushing defense  (team name, yds)
var arrteamydsrushingdef = new Array();
// arrteamydspassingdef = team yds passing defense (team name, yds)
var arrteamydspassingdef = new Array();
// arrteamydstotaldef = team yds total defense (team name, yds)
var arrteamydstotaldef = new Array();
// arrlongestfg = individual longest fg made 
var gamecount = 0;
var workingwindow ='';
var resultswindow='';



function loadStats(){

    var othergamesprompt = prompt('Please enter other game IDs seperated by semi-colons','');
    if (othergamesprompt==null) {
        alert('No Other Game IDs entered! Exiting Now');
        return 0;
    }
    othergamesprompt = othergamesprompt.replace(/ /g,'');
    if (othergamesprompt.length == 0 || othergamesprompt==null) {
        alert('No Other Game IDs entered! Exiting Now');
        return 0;
    }
    var othergames = othergamesprompt.split(';');
    
    
    workingwindow=window.open('',"Working", "width=130,height=120,scrollbars=no,resizable=yes,toolbar=no,location=no,menubar=no");
    if (!workingwindow.opener) workingwindow.opener = self;
    workingwindow.document.writeln('Working...');
    var teamnames = getElementsByClassName('box_score_team_abbr', document);
    var teamids = getElementsByClassName("team_name",document);
    var team1id = teamids[1].innerHTML.substring(teamids[1].innerHTML.indexOf('team_id=')+8,teamids[1].innerHTML.indexOf('">'));
    var team2id = teamids[2].innerHTML.substring(teamids[2].innerHTML.indexOf('team_id=')+8,teamids[2].innerHTML.indexOf('">'));
    var teamname1 = teamnames[0].innerHTML
    var teamname2 = teamnames[1].innerHTML
    var stattitles = getElementsByMultiClassName('box_score_team_stat_title', 'box_score_team_stat_title_subitem', document);
    var teamstats = getElementsByClassName('box_score_value', document);
    var gamescore = getElementsByClassName('total', document);
    var statname = '';
    
    var playerstat = document.body.innerHTML.split('<td colspan="')
    
    var teamstatscount = 0;
    var teamcountlist = arrteampoints.length;
    arrteampoints[teamcountlist] = new Array(3)
    arrteampoints[teamcountlist+1] = new Array(3)
    arrteamdiff[teamcountlist] = new Array(2)
    arrteamdiff[teamcountlist+1] = new Array(2)

    arrteampoints[0][0] = teamname1;
    arrteampoints[0][1] = parseFloat(gamescore[1].innerHTML);
    arrteampoints[0][2] = team1id;
    arrteamdiff[0][0] = teamname1;
    arrteamdiff[0][1] = parseFloat((gamescore[1].innerHTML - gamescore[2].innerHTML));
    
    arrteampoints[1][0] = teamname2;
    arrteampoints[1][1] = parseFloat(gamescore[2].innerHTML);
    arrteampoints[1][2] = team2id;
    arrteamdiff[1][0] = teamname2;
    arrteamdiff[1][1] = parseFloat((gamescore[2].innerHTML - gamescore[1].innerHTML));
    
    for (var i = 1; i < stattitles.length ; i ++) {
        statname = stattitles[i].innerHTML.replace(/&nbsp;/g,'');
        switch(statname) {
        case 'TOTAL NET YARDS':
            var teamcountlist = arrteamydstotal.length;
            arrteamydstotal[teamcountlist] = new Array(2);
            arrteamydstotaldef[teamcountlist] = new Array(2);
            arrteamydstotal[teamcountlist+1] = new Array(2);
            arrteamydstotaldef[teamcountlist+1] = new Array(2);
            arrteamydstotal[teamcountlist][0] = teamname1;
            arrteamydstotal[teamcountlist][1] = parseFloat(teamstats[(i-1)*2].innerHTML);
            arrteamydstotaldef[teamcountlist+1][0] = teamname2;
            arrteamydstotaldef[teamcountlist+1][1] = parseFloat(teamstats[((i-1)*2)].innerHTML);
            
            
            arrteamydstotal[teamcountlist+1][0] = teamname2;
            arrteamydstotal[teamcountlist+1][1] = parseFloat(teamstats[((i-1)*2)+1].innerHTML);
            arrteamydstotaldef[teamcountlist][0] = teamname1;
            arrteamydstotaldef[teamcountlist][1] = parseFloat(teamstats[((i-1)*2) + 1].innerHTML);
            break;
        case 'TOTAL RUSHING YARDS':
            var teamcountlist = arrteamydsrushing.length;
            arrteamydsrushing[teamcountlist] = new Array(2);
            arrteamydsrushingdef[teamcountlist] = new Array(2);
            arrteamydsrushing[teamcountlist+1] = new Array(2);
            arrteamydsrushingdef[teamcountlist+1] = new Array(2);
            arrteamydsrushing[teamcountlist][0] = teamname1;
            arrteamydsrushing[teamcountlist][1] = parseFloat(teamstats[(i-1)*2].innerHTML);
            arrteamydsrushingdef[teamcountlist+1][0] = teamname2;
            arrteamydsrushingdef[teamcountlist+1][1] = parseFloat(teamstats[((i-1)*2)].innerHTML);
            
            
            arrteamydsrushing[teamcountlist+1][0] = teamname2;
            arrteamydsrushing[teamcountlist+1][1] = parseFloat(teamstats[((i-1)*2)+1].innerHTML);
            arrteamydsrushingdef[teamcountlist][0] = teamname1;
            arrteamydsrushingdef[teamcountlist][1] = parseFloat(teamstats[((i-1)*2) + 1].innerHTML);
            break;
        case 'TOTAL PASSING YARDS':
            var teamcountlist = arrteamydspassing.length;
            arrteamydspassing[teamcountlist] = new Array(2);
            arrteamydspassingdef[teamcountlist] = new Array(2);
            arrteamydspassing[teamcountlist+1] = new Array(2);
            arrteamydspassingdef[teamcountlist+1] = new Array(2);
            arrteamydspassing[teamcountlist][0] = teamname1;
            arrteamydspassing[teamcountlist][1] = parseFloat(teamstats[(i-1)*2].innerHTML);
            arrteamydspassingdef[teamcountlist+1][0] = teamname2;
            arrteamydspassingdef[teamcountlist+1][1] = parseFloat(teamstats[((i-1)*2)].innerHTML);
    
            
            arrteamydspassing[teamcountlist+1][0] = teamname2;
            arrteamydspassing[teamcountlist+1][1] = parseFloat(teamstats[((i-1)*2)+1].innerHTML);
            arrteamydspassingdef[teamcountlist][0] = teamname1;
            arrteamydspassingdef[teamcountlist][1] = parseFloat(teamstats[((i-1)*2) + 1].innerHTML);
            break;
        }
    }
    var curteamname ='';
    var pointerposition = 0
    for (var j=0;j<playerstat.length;j++) {
        if (playerstat[j].indexOf('">Passing</td>') > 0 ) {
            var playerstat2 = playerstat[j].split('<tr class="nonalternating_color2">')
            for (var k=1;k<playerstat2.length;k++) {
                pointerposition = 0;
                curteamname = playerstat2[k].substring(playerstat2[k].indexOf('>',pointerposition) + 1,playerstat2[k].indexOf('</th>',pointerposition));
                if (playerstat2[k].indexOf('<tr class="alternating_color') > 0) {
                
                    var playerstat3 = playerstat2[k].split('<tr class="alternating_color');
                    var arrrows = arrpassyds.length;
                    for (var l=1;l<playerstat3.length;l++) {
                        arrpassyds[l+arrrows-1] = new Array(4);
                        arrpassyds[l+arrrows-1][0] = curteamname;
                        arrpassyds[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrpassyds[l+arrrows-1][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                        arrpassyds[l+arrrows-1][1] = arrpassyds[l+arrrows-1][1].replace(/&nbsp;/g,'');
                        var playerstat4 = playerstat3[l].split('<td class="box_score_player_stat">');
                        arrpassyds[l+arrrows-1][2] = parseFloat(playerstat4[4].substring(0,playerstat4[4].indexOf('<')));
                        arrpasstds[l+arrrows-1] = new Array(3);
                        arrpasstds[l+arrrows-1][0] = curteamname;
                        arrpasstds[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        //var playerstat4 = playerstat3[l].split('<td class="box_score_player_stat">');
                        arrpasstds[l+arrrows-1][2] = parseFloat(playerstat4[11].substring(0,playerstat4[11].indexOf('<')));
                    };
                };
            };
        }else if (playerstat[j].indexOf('">Rushing</td>') > 0 ) {
            var playerstat2 = playerstat[j].split('<tr class="nonalternating_color2">')
            for (var k=1;k<playerstat2.length;k++) {
                pointerposition = 0;
                curteamname = playerstat2[k].substring(playerstat2[k].indexOf('>',pointerposition) + 1,playerstat2[k].indexOf('</th>',pointerposition));
                if (playerstat2[k].indexOf('<tr class="alternating_color') > 0) {
                
                    var playerstat3 = playerstat2[k].split('<tr class="alternating_color');
                    var arrrows = arrrushyds.length;
                    for (var l=1;l<playerstat3.length;l++) {
                        arrrushyds[l+arrrows-1] = new Array(4);
                        arrrushyds[l+arrrows-1][0] = curteamname;
                        arrrushyds[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrrushyds[l+arrrows-1][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                        var playerstat4 = playerstat3[l].split('<td class="box_score_player_stat">');
                        arrrushyds[l+arrrows-1][2] = parseFloat(playerstat4[3].substring(0,playerstat4[3].indexOf('<')));
                        arrrushtds[l+arrrows-1] = new Array(3);
                        arrrushtds[l+arrrows-1][0] = curteamname;
                        arrrushtds[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrrushtds[l+arrrows-1][2] = parseFloat(playerstat4[5].substring(0,playerstat4[5].indexOf('<')));
                    };
                };
            };
        }else if (playerstat[j].indexOf('">Receiving</td>') > 0 ) {
            var playerstat2 = playerstat[j].split('<tr class="nonalternating_color2">')
            for (var k=1;k<playerstat2.length;k++) {
                pointerposition = 0;
                curteamname = playerstat2[k].substring(playerstat2[k].indexOf('>',pointerposition) + 1,playerstat2[k].indexOf('</th>',pointerposition));
                if (playerstat2[k].indexOf('<tr class="alternating_color') > 0) {
                    
                    var playerstat3 = playerstat2[k].split('<tr class="alternating_color');
                    var arrrows = arrreceptions.length;
                    for (var l=1;l<playerstat3.length;l++) {
                        arrreceptions[l+arrrows-1] = new Array(4);
                        arrreceptions[l+arrrows-1][0] = curteamname;
                        arrreceptions[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrreceptions[l+arrrows-1][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                        var playerstat4 = playerstat3[l].split('<td class="box_score_player_stat">');
                        arrreceptions[l+arrrows-1][2] = parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                        arrrecyds[l+arrrows-1] = new Array(3);
                        arrrecyds[l+arrrows-1][0] = curteamname;
                        arrrecyds[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrrecyds[l+arrrows-1][2] = parseFloat(playerstat4[3].substring(0,playerstat4[3].indexOf('<')));
                        arrrectds[l+arrrows-1] = new Array(3);
                        arrrectds[l+arrrows-1][0] = curteamname;
                        arrrectds[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrrectds[l+arrrows-1][2] = parseFloat(playerstat4[6].substring(0,playerstat4[6].indexOf('<')));
                    };
                };
            };
        }else if (playerstat[j].indexOf('">Kicking</td>') > 0 ) {
            var playerstat2 = playerstat[j].split('<tr class="nonalternating_color2">')
            for (var k=1;k<playerstat2.length;k++) {
                pointerposition = 0;
                curteamname = playerstat2[k].substring(playerstat2[k].indexOf('>',pointerposition) + 1,playerstat2[k].indexOf('</th>',pointerposition));
                if (playerstat2[k].indexOf('<tr class="alternating_color') > 0) {
                    var playerstat3 = playerstat2[k].split('<tr class="alternating_color');
                    var arrrows = arrfgmade.length;
                    for (var l=1;l<playerstat3.length;l++) {
                        arrfgmade[l+arrrows-1] = new Array(4);
                        arrfgmade[l+arrrows-1][0] = curteamname;
                        arrfgmade[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrfgmade[l+arrrows-1][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                        var playerstat4 = playerstat3[l].split('<td class="box_score_player_stat">');
                        arrfgmade[l+arrrows-1][2] = parseFloat(playerstat4[1].substring(0,playerstat4[1].indexOf('<')));
                        
                    };
                };
            };
        }else if (playerstat[j].indexOf('">Punting</td>') > 0 ) {
            var playerstat2 = playerstat[j].split('<tr class="nonalternating_color2">')
            for (var k=1;k<playerstat2.length;k++) {
                pointerposition = 0;
                curteamname = playerstat2[k].substring(playerstat2[k].indexOf('>',pointerposition) + 1,playerstat2[k].indexOf('</th>',pointerposition));
                if (playerstat2[k].indexOf('<tr class="alternating_color') > 0) {
                    var playerstat3 = playerstat2[k].split('<tr class="alternating_color');
                    var arrrows = arrpuntingavg.length;
                    for (var l=1;l<playerstat3.length;l++) {
                        arrpuntingavg[l+arrrows-1] = new Array(6);
                        arrpuntingavg[l+arrrows-1][0] = curteamname;
                        arrpuntingavg[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrpuntingavg[l+arrrows-1][5] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                        var playerstat4 = playerstat3[l].split('<td class="box_score_player_stat">');
                        arrpuntingavg[l+arrrows-1][3] = parseFloat(playerstat4[1].substring(0,playerstat4[3].indexOf('<')));
                        arrpuntingavg[l+arrrows-1][4] = parseFloat(playerstat4[2].substring(0,playerstat4[3].indexOf('<')));
                        arrpuntingavg[l+arrrows-1][2] = parseFloat(playerstat4[3].substring(0,playerstat4[3].indexOf('<')));
                        
                    };
                };
            };
        }else if (playerstat[j].indexOf('">Kick/Punt Return') > 0 ) {
            var playerstat2 = playerstat[j].split('<tr class="nonalternating_color2">')
            for (var k=1;k<playerstat2.length;k++) {
                pointerposition = 0;
                curteamname = playerstat2[k].substring(playerstat2[k].indexOf('>',pointerposition) + 1,playerstat2[k].indexOf('</th>',pointerposition));
                if (playerstat2[k].indexOf('<tr class="alternating_color') > 0) {
                    var playerstat3 = playerstat2[k].split('<tr class="alternating_color');
                    var arrrows = arrkravg.length;
                    for (var l=1;l<playerstat3.length;l++) {
                        arrkravg[l+arrrows-1] = new Array(6);
                        arrkravg[l+arrrows-1][0] = curteamname;
                        arrkravg[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrkravg[l+arrrows-1][5] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                        var playerstat4 = playerstat3[l].split('<td class="box_score_player_stat">');
                        arrkravg[l+arrrows-1][2] = parseFloat(playerstat4[3].substring(0,playerstat4[3].indexOf('<')));
                        arrkravg[l+arrrows-1][3] = parseFloat(playerstat4[1].substring(0,playerstat4[1].indexOf('<')));
                        arrkravg[l+arrrows-1][4] = parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                        arrpravg[l+arrrows-1] = new Array(5);
                        arrpravg[l+arrrows-1][0] = curteamname;
                        arrpravg[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrpravg[l+arrrows-1][2] = parseFloat(playerstat4[7].substring(0,playerstat4[7].indexOf('<')));
                        arrpravg[l+arrrows-1][3] = parseFloat(playerstat4[5].substring(0,playerstat4[5].indexOf('<')));
                        arrpravg[l+arrrows-1][4] = parseFloat(playerstat4[6].substring(0,playerstat4[6].indexOf('<')));
                        arrkrtds[l+arrrows-1] = new Array(3);
                        arrkrtds[l+arrrows-1][0] = curteamname;
                        arrkrtds[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrkrtds[l+arrrows-1][2] = parseFloat(playerstat4[4].substring(0,playerstat4[4].indexOf('<')));
                        arrprtds[l+arrrows-1] = new Array(3);
                        arrprtds[l+arrrows-1][0] = curteamname;
                        arrprtds[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrprtds[l+arrrows-1][2] = parseFloat(playerstat4[8].substring(0,playerstat4[8].indexOf('<')));
                    };
                };
            };
        }else if (playerstat[j].indexOf('">Defense</td>') > 0 ) {
            var playerstat2 = playerstat[j].split('<tr class="nonalternating_color2">')
            for (var k=1;k<playerstat2.length;k++) {
                pointerposition = 0;
                curteamname = playerstat2[k].substring(playerstat2[k].indexOf('>',pointerposition) + 1,playerstat2[k].indexOf('</th>',pointerposition));
                if (playerstat2[k].indexOf('<tr class="alternating_color') > 0) {
                    var playerstat3 = playerstat2[k].split('<tr class="alternating_color');
                    var arrrows = arrtackles.length;
                    for (var l=1;l<playerstat3.length;l++) {
                        arrtackles[l+arrrows-1] = new Array(4);
                        arrtackles[l+arrrows-1][0] = curteamname;
                        arrtackles[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrtackles[l+arrrows-1][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                        var playerstat4 = playerstat3[l].split('<td class="box_score_player_stat">');
                        arrtackles[l+arrrows-1][2] = parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                        arrsacks[l+arrrows-1] = new Array(3);
                        arrsacks[l+arrrows-1][0] = curteamname;
                        arrsacks[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrsacks[l+arrrows-1][2] = parseFloat(playerstat4[4].substring(0,playerstat4[4].indexOf('<')));
                        arrints[l+arrrows-1] = new Array(3);
                        arrints[l+arrrows-1][0] = curteamname;
                        arrints[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrints[l+arrrows-1][2] = parseFloat(playerstat4[11].substring(0,playerstat4[11].indexOf('<')));
                        arrhurries[l+arrrows-1] = new Array(3);
                        arrhurries[l+arrrows-1][0] = curteamname;
                        arrhurries[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrhurries[l+arrrows-1][2] = parseFloat(playerstat4[6].substring(0,playerstat4[6].indexOf('<')));
                        arrff[l+arrrows-1] = new Array(3);
                        arrff[l+arrrows-1][0] = curteamname;
                        arrff[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrff[l+arrrows-1][2] = parseFloat(playerstat4[8].substring(0,playerstat4[8].indexOf('<')));
                        arrpds[l+arrrows-1] = new Array(3);
                        arrpds[l+arrrows-1][0] = curteamname;
                        arrpds[l+arrrows-1][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrpds[l+arrrows-1][2] = parseFloat(playerstat4[10].substring(0,playerstat4[10].indexOf('<')));
                    };
                };
            };
        }else if (playerstat[j].indexOf('">Offensive Line</td>') > 0 ) {
            var playerstat2 = playerstat[j].split('<tr class="nonalternating_color2">')
            for (var k=1;k<playerstat2.length;k++) {
                pointerposition = 0;
                curteamname = playerstat2[k].substring(playerstat2[k].indexOf('>',pointerposition) + 1,playerstat2[k].indexOf('</th>',pointerposition));
                if (playerstat2[k].indexOf('<tr class="alternating_color') > 0) {
                    var playerstat3 = playerstat2[k].split('<tr class="alternating_color');
                    var arrrowsc = arrpancakesc.length;
                    var arrrowsg = arrpancakesg.length;
                    var arrrowst = arrpancakest.length;
                    var arrrowste = arrpancakeste.length;
                    var arrrowsfb = arrpancakesfb.length;
                    var arrrowswr = arrpancakeswr.length;
                    for (var l=1;l<playerstat3.length;l++) {
                        var playerposition = playerstat3[l].substring(playerstat3[l].indexOf('"position">')+11,playerstat3[l].indexOf('</span>') - 1);
                        var playerstat4 = playerstat3[l].split('<td class="box_score_player_stat">');
                        switch (playerposition) {
                        case "C":
                            arrpancakesc[arrrowsc] = new Array(4);
                            arrpancakesc[arrrowsc][0] = curteamname;
                            arrpancakesc[arrrowsc][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                            arrpancakesc[arrrowsc][2] = parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                            arrpancakesc[arrrowsc][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                            arrrowsc = arrrowsc + 1;
                            break;
                        case "G":
                            arrpancakesg[arrrowsg] = new Array(4);
                            arrpancakesg[arrrowsg][0] = curteamname;
                            arrpancakesg[arrrowsg][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                            arrpancakesg[arrrowsg][2] = parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                            arrpancakesg[arrrowsg][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                            arrrowsg = arrrowsg + 1;
                            break;
                        case "OT":
                            arrpancakest[arrrowst] = new Array(4);
                            arrpancakest[arrrowst][0] = curteamname;
                            arrpancakest[arrrowst][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                            arrpancakest[arrrowst][2] = parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                            arrpancakest[arrrowst][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                            arrrowst = arrrowst + 1;
                            break;
                        case "TE":
                            arrpancakeste[arrrowste] = new Array(4);
                            arrpancakeste[arrrowste][0] = curteamname;
                            arrpancakeste[arrrowste][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                            arrpancakeste[arrrowste][2] = parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                            arrpancakeste[arrrowste][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                            arrrowste = arrrowste + 1;
                            break;
                        case "FB":
                            arrpancakesfb[arrrowsfb] = new Array(4);
                            arrpancakesfb[arrrowsfb][0] = curteamname;
                            arrpancakesfb[arrrowsfb][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                            arrpancakesfb[arrrowsfb][2] = parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                            arrpancakesfb[arrrowsfb][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                            arrrowsfb = arrrowsfb + 1;
                            break;
			case "WR":
                            arrpancakeswr[arrrowswr] = new Array(4);
                            arrpancakeswr[arrrowswr][0] = curteamname;
                            arrpancakeswr[arrrowswr][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                            arrpancakeswr[arrrowswr][2] = parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                            arrpancakeswr[arrrowswr][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                            arrrowswr = arrrowswr + 1;
                            break;
                        };
                    };
                };
            };
        };
    }
    
    
    gamecount = othergames.length;
    window.timeouttime = 1500;
    for (var m=0;m<othergames.length;m++) {
        window.timeouttime += 1500;
        window.setTimeout(function(arg1){return function(){GetOtherGames(arg1);}}(othergames[m]),window.timeouttime);
        
        //GetOtherGames(othergames[m]);
    };
    
}


function GetOtherGames(gameid){
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://goallineblitz.com/game/game.pl?game_id=' + gameid,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
    onload: function(boxscore) {
    var response1=boxscore.responseText;
    gamecount = gamecount -1;
    var teamnames = response1.split('box_score_team_abbr">');
    var teamname1 = teamnames[1].substring(0, teamnames[1].indexOf('</td>'));
    var teamname2 = teamnames[2].substring(0, teamnames[2].indexOf('</td>'));
    var teamids = response1.split('<td class="team_name">');
    var team1id = teamids[2].substring(teamids[2].indexOf('team_id=')+8,teamids[2].indexOf('">'));;
    var team2id = teamids[3].substring(teamids[3].indexOf('team_id=')+8,teamids[3].indexOf('">'));;; 
    var gamescore = response1.split('total">');

    var teamcountlist = arrteampoints.length;
    var team1arrayitem = -1;
    var team2arrayitem = -1;
    for (var z=0;z<arrteampoints.length;z++) {
        
        if (team1id==arrteampoints[z][2]) {
            team1arrayitem = z;
        }else if (team2id==arrteampoints[z][2]) {
            team2arrayitem = z;
        }
    }
    if (team1arrayitem==-1) {

        
        team1arrayitem=teamcountlist;
        arrteampoints[teamcountlist] = new Array(3)
        arrteamdiff[teamcountlist] = new Array(2)
        arrteamydstotal[teamcountlist] = new Array(2);
        arrteamydstotaldef[teamcountlist] = new Array(2);
        arrteamydsrushing[teamcountlist] = new Array(2);
        arrteamydsrushingdef[teamcountlist] = new Array(2);
        arrteamydspassing[teamcountlist] = new Array(2);
        arrteamydspassingdef[teamcountlist] = new Array(2);
        arrteampoints[teamcountlist][1] = 0;
        arrteamdiff[teamcountlist][1] = 0;
        arrteamydstotal[teamcountlist][1] = 0;
        arrteamydstotaldef[teamcountlist][1] = 0;
        arrteamydsrushing[teamcountlist][1] = 0;
        arrteamydsrushingdef[teamcountlist][1] = 0;
        arrteamydspassing[teamcountlist][1] = 0;
        arrteamydspassingdef[teamcountlist][1] = 0;
        teamcountlist++;
    }
    if (team2arrayitem==-1) {
        
        team2arrayitem=teamcountlist;
        arrteampoints[teamcountlist] = new Array(3)
        arrteamdiff[teamcountlist] = new Array(2)
        arrteamydstotal[teamcountlist] = new Array(2);
        arrteamydstotaldef[teamcountlist] = new Array(2);
        arrteamydsrushing[teamcountlist] = new Array(2);
        arrteamydsrushingdef[teamcountlist] = new Array(2);
        arrteamydspassing[teamcountlist] = new Array(2);
        arrteamydspassingdef[teamcountlist] = new Array(2);
        arrteampoints[teamcountlist][1] = 0;
        arrteamdiff[teamcountlist][1] = 0;
        arrteamydstotal[teamcountlist][1] = 0;
        arrteamydstotaldef[teamcountlist][1] = 0;
        arrteamydsrushing[teamcountlist][1] = 0;
        arrteamydsrushingdef[teamcountlist][1] = 0;
        arrteamydspassing[teamcountlist][1] = 0;
        arrteamydspassingdef[teamcountlist][1] = 0;
    }
    
    
    arrteampoints[team1arrayitem][0] = teamname1;
    arrteampoints[team1arrayitem][1] = arrteampoints[team1arrayitem][1] + parseFloat(gamescore[2].substring(0, gamescore[2].indexOf('</td>')));
    arrteampoints[team1arrayitem][2] = team1id;
    arrteamdiff[team1arrayitem][0] = teamname1;
    arrteamdiff[team1arrayitem][1] = arrteamdiff[team1arrayitem][1] + parseFloat((gamescore[2].substring(0, gamescore[2].indexOf('</td>')) - gamescore[3].substring(0, gamescore[3].indexOf('</td>'))));
    
    arrteampoints[team2arrayitem][0] = teamname2;
    arrteampoints[team2arrayitem][1] = arrteampoints[team2arrayitem][1] +parseFloat(gamescore[3].substring(0, gamescore[3].indexOf('</td>')));
    arrteampoints[team2arrayitem][2] = team2id;
    arrteamdiff[team2arrayitem][0] = teamname2;
    arrteamdiff[team2arrayitem][1] = arrteamdiff[team2arrayitem][1] + parseFloat((gamescore[3].substring(0, gamescore[3].indexOf('</td>')) - gamescore[2].substring(0, gamescore[2].indexOf('</td>'))));


    var stattitles = response1.split('box_score_team_stat_title');

    
    for (var i = 2; i < stattitles.length; i ++) {
        statname = stattitles[i].substring(stattitles[i].indexOf('">')+2, stattitles[i].indexOf('</td>')).replace(/&nbsp;/g,'');
        var teamstats = stattitles[i].split('"box_score_value">');
        switch(statname) {
        case 'TOTAL NET YARDS':
            arrteamydstotal[team1arrayitem][0] = teamname1;
            arrteamydstotal[team1arrayitem][1] = arrteamydstotal[team1arrayitem][1] + parseFloat(teamstats[1].substring(0,teamstats[1].indexOf('</td>')));
            arrteamydstotaldef[team2arrayitem][0] = teamname2;
            arrteamydstotaldef[team2arrayitem][1] = arrteamydstotaldef[team2arrayitem][1] + parseFloat(teamstats[1].substring(0,teamstats[1].indexOf('</td>')));
            
            arrteamydstotal[team2arrayitem][0] = teamname2;
            arrteamydstotal[team2arrayitem][1] = arrteamydstotal[team2arrayitem][1] + parseFloat(teamstats[2].substring(0,teamstats[2].indexOf('</td>')));
            arrteamydstotaldef[team1arrayitem][0] = teamname1;
            arrteamydstotaldef[team1arrayitem][1] = arrteamydstotaldef[team1arrayitem][1] + parseFloat(teamstats[2].substring(0,teamstats[2].indexOf('</td>')));
            break;
        case 'TOTAL RUSHING YARDS':
            arrteamydsrushing[team1arrayitem][0] = teamname1;
            arrteamydsrushing[team1arrayitem][1] = arrteamydsrushing[team1arrayitem][1] + parseFloat(teamstats[1].substring(0,teamstats[1].indexOf('</td>')));
            arrteamydsrushingdef[team2arrayitem][0] = teamname2;
            arrteamydsrushingdef[team2arrayitem][1] = arrteamydsrushingdef[team2arrayitem][1] + parseFloat(teamstats[1].substring(0,teamstats[1].indexOf('</td>')));
            
            arrteamydsrushing[team2arrayitem][0] = teamname2;
            arrteamydsrushing[team2arrayitem][1] = arrteamydsrushing[team2arrayitem][1] + parseFloat(teamstats[2].substring(0,teamstats[2].indexOf('</td>')));
            arrteamydsrushingdef[team1arrayitem][0] = teamname1;
            arrteamydsrushingdef[team1arrayitem][1] = arrteamydsrushingdef[team1arrayitem][1] + parseFloat(teamstats[2].substring(0,teamstats[2].indexOf('</td>')));
            break;
        case 'TOTAL PASSING YARDS':
            arrteamydspassing[team1arrayitem][0] = teamname1;
            arrteamydspassing[team1arrayitem][1] = arrteamydspassing[team1arrayitem][1] + parseFloat(teamstats[1].substring(0,teamstats[1].indexOf('</td>')));
            arrteamydspassingdef[team2arrayitem][0] = teamname2;
            arrteamydspassingdef[team2arrayitem][1] = arrteamydspassingdef[team2arrayitem][1] + parseFloat(teamstats[1].substring(0,teamstats[1].indexOf('</td>')));
            arrteamydspassing[team2arrayitem][0] = teamname2;
            arrteamydspassing[team2arrayitem][1] = arrteamydspassing[team2arrayitem][1] + parseFloat(teamstats[2].substring(0,teamstats[2].indexOf('</td>')));
            arrteamydspassingdef[team1arrayitem][0] = teamname1;
            arrteamydspassingdef[team1arrayitem][1] = arrteamydspassingdef[team1arrayitem][1] + parseFloat(teamstats[2].substring(0,teamstats[2].indexOf('</td>')));
            break;
        }
    }

    var playerstat = response1.split('<td colspan="')
    
    
    
    
    
    
    
    var teamstatscount = 0;
    
    
    
    var curteamname ='';
    var pointerposition = 0
    for (var j=0;j<playerstat.length;j++) {
        if (playerstat[j].indexOf('">Passing</td>') > 0 ) {
            var playerstat2 = playerstat[j].split('<tr class="nonalternating_color2">')
            for (var k=1;k<playerstat2.length;k++) {
                pointerposition = 0;
                curteamname = playerstat2[k].substring(playerstat2[k].indexOf('>',pointerposition) + 1,playerstat2[k].indexOf('</th>',pointerposition));
                if (playerstat2[k].indexOf('<tr class="alternating_color') > 0) {
                
                    var playerstat3 = playerstat2[k].split('<tr class="alternating_color');
                    var arrrows = arrpassyds.length;
                    for (var l=1;l<playerstat3.length;l++) {
                        var playerrow = -1;
                        for (var jloop=0;jloop<arrpassyds.length;jloop++) {
                            var tempplayername = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                            
                            
                            if (arrpassyds[jloop][3]== tempplayername) {
                                playerrow = jloop;
                            }
                        }
                        if (playerrow==-1) {
                            playerrow = arrrows;
                            arrpassyds[arrrows] = new Array(4);
                            arrpasstds[arrrows] = new Array(4);
                            arrpassyds[playerrow][2] = 0;
                            arrpasstds[playerrow][2] = 0;
                            arrrows = arrrows + 1;
                        }
                        
                        arrpassyds[playerrow][0] = curteamname;
                        arrpassyds[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrpassyds[playerrow][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                        var playerstat4 = playerstat3[l].split('<td class="box_score_player_stat">');
                        arrpassyds[playerrow][2] = arrpassyds[playerrow][2] + parseFloat(playerstat4[4].substring(0,playerstat4[4].indexOf('<')));
                        arrpasstds[playerrow][0] = curteamname;
                        arrpasstds[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrpasstds[playerrow][2] = arrpasstds[playerrow][2] + parseFloat(playerstat4[11].substring(0,playerstat4[11].indexOf('<')));
                    };
                };
            };
        }else if (playerstat[j].indexOf('">Rushing</td>') > 0 ) {
            var playerstat2 = playerstat[j].split('<tr class="nonalternating_color2">')
            for (var k=1;k<playerstat2.length;k++) {
                pointerposition = 0;
                curteamname = playerstat2[k].substring(playerstat2[k].indexOf('>',pointerposition) + 1,playerstat2[k].indexOf('</th>',pointerposition));
                if (playerstat2[k].indexOf('<tr class="alternating_color') > 0) {
                
                    var playerstat3 = playerstat2[k].split('<tr class="alternating_color');
                    var arrrows = arrrushyds.length;
                    for (var l=1;l<playerstat3.length;l++) {
                        var playerrow = -1;
                        for (var jloop=0;jloop<arrrushyds.length;jloop++) {
                            if (arrrushyds[jloop][3] == playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10))) {
                                playerrow = jloop;
                            }
                        }
                        if (playerrow==-1) {
                            playerrow = arrrows;
                            arrrushyds[arrrows] = new Array(4);
                            arrrushtds[arrrows] = new Array(3);
                            arrrushyds[playerrow][2] = 0;
                            arrrushtds[playerrow][2] = 0;
                            arrrows = arrrows + 1;
                        }

                        arrrushyds[playerrow][0] = curteamname;
                        arrrushyds[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrrushyds[playerrow][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                        var playerstat4 = playerstat3[l].split('<td class="box_score_player_stat">');
                        arrrushyds[playerrow][2] = arrrushyds[playerrow][2] + parseFloat(playerstat4[3].substring(0,playerstat4[3].indexOf('<')));
                        arrrushtds[playerrow][0] = curteamname;
                        arrrushtds[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrrushtds[playerrow][2] = arrrushtds[playerrow][2] + parseFloat(playerstat4[5].substring(0,playerstat4[5].indexOf('<')));
                    };
                };
            };
        }else if (playerstat[j].indexOf('">Receiving</td>') > 0 ) {
            var playerstat2 = playerstat[j].split('<tr class="nonalternating_color2">')
            for (var k=1;k<playerstat2.length;k++) {
                pointerposition = 0;
                curteamname = playerstat2[k].substring(playerstat2[k].indexOf('>',pointerposition) + 1,playerstat2[k].indexOf('</th>',pointerposition));
                if (playerstat2[k].indexOf('<tr class="alternating_color') > 0) {
                    
                    var playerstat3 = playerstat2[k].split('<tr class="alternating_color');
                    var arrrows = arrreceptions.length;
                    for (var l=1;l<playerstat3.length;l++) {
                        var playerrow = -1;
                        for (var jloop=0;jloop<arrreceptions.length;jloop++) {
                            if (arrreceptions[jloop][3] == playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10))) {
                                playerrow = jloop;
                            }
                        }
                        if (playerrow==-1) {
                            playerrow = arrrows;
                            arrreceptions[arrrows] = new Array(4);
                            arrrecyds[arrrows] = new Array(3);
                            arrrectds[arrrows] = new Array(3);
                            arrreceptions[playerrow][2] = 0;
                            arrrecyds[playerrow][2] = 0;
                            arrrectds[playerrow][2] = 0;
                            arrrows = arrrows + 1;
                        }
                        var playerstat4 = playerstat3[l].split('<td class="box_score_player_stat">');
                        arrreceptions[playerrow][0] = curteamname;
                        arrreceptions[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrreceptions[playerrow][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                        arrreceptions[playerrow][2] = arrreceptions[playerrow][2] + parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));

                        arrrecyds[playerrow][0] = curteamname;
                        arrrecyds[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrrecyds[playerrow][2] = arrrecyds[playerrow][2] + parseFloat(playerstat4[3].substring(0,playerstat4[3].indexOf('<')));
                        
                        arrrectds[playerrow][0] = curteamname;
                        arrrectds[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrrectds[playerrow][2] = arrrectds[playerrow][2] + parseFloat(playerstat4[6].substring(0,playerstat4[6].indexOf('<')));
                    };
                };
            };
        }else if (playerstat[j].indexOf('">Kicking</td>') > 0 ) {
            var playerstat2 = playerstat[j].split('<tr class="nonalternating_color2">')
            for (var k=1;k<playerstat2.length;k++) {
                pointerposition = 0;
                curteamname = playerstat2[k].substring(playerstat2[k].indexOf('>',pointerposition) + 1,playerstat2[k].indexOf('</th>',pointerposition));
                if (playerstat2[k].indexOf('<tr class="alternating_color') > 0) {
                    var playerstat3 = playerstat2[k].split('<tr class="alternating_color');
                    var arrrows = arrfgmade.length;
                    for (var l=1;l<playerstat3.length;l++) {

                        var playerrow = -1;
                        for (var jloop=0;jloop<arrfgmade.length;jloop++) {
                            if (arrfgmade[jloop][3] == playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10))) {
                                playerrow = jloop;
                            }
                        }
                        if (playerrow==-1) {
                            playerrow = arrrows;
                            arrfgmade[arrrows] = new Array(4);
                            arrfgmade[playerrow][2] = 0;
                            arrrows = arrrows + 1;
                        }

                        arrfgmade[playerrow][0] = curteamname;
                        arrfgmade[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrfgmade[playerrow][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                        var playerstat4 = playerstat3[l].split('<td class="box_score_player_stat">');
                        arrfgmade[playerrow][2] = arrfgmade[playerrow][2] + parseFloat(playerstat4[1].substring(0,playerstat4[1].indexOf('<')));
                        
                    };
                };
            };
        }else if (playerstat[j].indexOf('">Punting</td>') > 0 ) {
            var playerstat2 = playerstat[j].split('<tr class="nonalternating_color2">')
            for (var k=1;k<playerstat2.length;k++) {
                pointerposition = 0;
                curteamname = playerstat2[k].substring(playerstat2[k].indexOf('>',pointerposition) + 1,playerstat2[k].indexOf('</th>',pointerposition));
                if (playerstat2[k].indexOf('<tr class="alternating_color') > 0) {
                    var playerstat3 = playerstat2[k].split('<tr class="alternating_color');
                    var arrrows = arrpuntingavg.length;
                    for (var l=1;l<playerstat3.length;l++) {

                        var playerrow = -1;
                        for (var jloop=0;jloop<arrpuntingavg.length;jloop++) {
                            if (arrpuntingavg[jloop][5] == playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10))) {
                                playerrow = jloop;
                            }
                        }
                        if (playerrow==-1) {
                            playerrow = arrrows;
                            arrpuntingavg[arrrows] = new Array(6);
                            arrpuntingavg[playerrow][2] = 0;
                            arrrows = arrrows + 1;
                        }

                        
                        arrpuntingavg[playerrow][0] = curteamname;
                        arrpuntingavg[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrpuntingavg[playerrow][5] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                        var playerstat4 = playerstat3[l].split('<td class="box_score_player_stat">');
                        arrpuntingavg[playerrow][3] = arrpuntingavg[playerrow][2] + parseFloat(playerstat4[1].substring(0,playerstat4[1].indexOf('<')));
                        arrpuntingavg[playerrow][4] = arrpuntingavg[playerrow][2] + parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                        arrpuntingavg[playerrow][2] = parseFloat(arrpuntingavg[playerrow][4]/arrpuntingavg[playerrow][3]);
                        
                    };
                };
            };
        }else if (playerstat[j].indexOf('">Kick/Punt Return') > 0 ) {
            var playerstat2 = playerstat[j].split('<tr class="nonalternating_color2">')
            for (var k=1;k<playerstat2.length;k++) {
                pointerposition = 0;
                curteamname = playerstat2[k].substring(playerstat2[k].indexOf('>',pointerposition) + 1,playerstat2[k].indexOf('</th>',pointerposition));
                if (playerstat2[k].indexOf('<tr class="alternating_color') > 0) {
                    var playerstat3 = playerstat2[k].split('<tr class="alternating_color');
                    var arrrows = arrkravg.length;
                    for (var l=1;l<playerstat3.length;l++) {

                        var playerrow = -1;
                        for (var jloop=0;jloop<arrkravg.length;jloop++) {
                            if (arrkravg[jloop][5] == playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10))) {
                                playerrow = jloop;
                            }
                        }
                        if (playerrow==-1) {
                            playerrow = arrrows;
                            arrkravg[arrrows] = new Array(6);
                            arrpravg[arrrows] = new Array(5);
                            arrkrtds[arrrows] = new Array(3);
                            arrprtds[arrrows] = new Array(3);
                            arrkravg[playerrow][2] = 0;
                            arrpravg[playerrow][2] = 0;
                            arrkravg[playerrow][3] = 0;
                            arrpravg[playerrow][3] = 0;
                            arrkravg[playerrow][4] = 0;
                            arrpravg[playerrow][4] = 0;
                            arrkrtds[playerrow][2] = 0;
                            arrprtds[playerrow][2] = 0;
                            arrrows = arrrows + 1;
                        }

                        arrkravg[playerrow][0] = curteamname;
                        arrkravg[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrkravg[playerrow][5] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                        var playerstat4 = playerstat3[l].split('<td class="box_score_player_stat">');
                        arrkravg[playerrow][3] = arrkravg[playerrow][3] + parseFloat(playerstat4[1].substring(0,playerstat4[1].indexOf('<')));
                        arrkravg[playerrow][4] = arrkravg[playerrow][4] + parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                        arrkravg[playerrow][2] = parseFloat(arrkravg[playerrow][4]/arrkravg[playerrow][3]);

                        arrpravg[playerrow][0] = curteamname;
                        arrpravg[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrpravg[playerrow][3] = arrpravg[playerrow][3] + parseFloat(playerstat4[5].substring(0,playerstat4[5].indexOf('<')));
                        arrpravg[playerrow][4] = arrpravg[playerrow][4] + parseFloat(playerstat4[6].substring(0,playerstat4[6].indexOf('<')));
                        arrpravg[playerrow][2] = parseFloat(arrpravg[playerrow][4]/arrpravg[playerrow][3]);

                        arrkrtds[playerrow][0] = curteamname;
                        arrkrtds[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrkrtds[playerrow][2] = arrkrtds[playerrow][2] + parseFloat(playerstat4[4].substring(0,playerstat4[4].indexOf('<')));

                        arrprtds[playerrow][0] = curteamname;
                        arrprtds[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrprtds[playerrow][2] = arrprtds[playerrow][2] + parseFloat(playerstat4[8].substring(0,playerstat4[8].indexOf('<')));
                    };
                };
            };
        }else if (playerstat[j].indexOf('">Defense</td>') > 0 ) {
            var playerstat2 = playerstat[j].split('<tr class="nonalternating_color2">')
            for (var k=1;k<playerstat2.length;k++) {
                pointerposition = 0;
                curteamname = playerstat2[k].substring(playerstat2[k].indexOf('>',pointerposition) + 1,playerstat2[k].indexOf('</th>',pointerposition));
                if (playerstat2[k].indexOf('<tr class="alternating_color') > 0) {
                    var playerstat3 = playerstat2[k].split('<tr class="alternating_color');
                    var arrrows = arrtackles.length;
                    for (var l=1;l<playerstat3.length;l++) {

                        var playerrow = -1;
                        for (var jloop=0;jloop<arrtackles.length;jloop++) {
                            if (arrtackles[jloop][3] == playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com')) {
                                playerrow = jloop;
                            }
                        }
                        if (playerrow==-1) {
                            playerrow = arrrows;
                            arrtackles[playerrow] = new Array(4);
                            arrsacks[playerrow] = new Array(3);
                            arrints[playerrow] = new Array(3);
                            arrhurries[playerrow] = new Array(3);
                            arrff[playerrow] = new Array(3);
                            arrpds[playerrow] = new Array(3);
                            arrtackles[playerrow][2] = 0;
                            arrsacks[playerrow][2] = 0;
                            arrints[playerrow][2] = 0;
                            arrhurries[playerrow][2] = 0;
                            arrff[playerrow][2] = 0;
                            arrpds[playerrow][2] = 0;
                            arrrows = arrrows + 1;
                        }


                        arrtackles[playerrow][0] = curteamname;
                        arrtackles[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrtackles[playerrow][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                        var playerstat4 = playerstat3[l].split('<td class="box_score_player_stat">');
                        arrtackles[playerrow][2] = arrtackles[playerrow][2] + parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                        arrsacks[playerrow][0] = curteamname;
                        arrsacks[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrsacks[playerrow][2] = arrsacks[playerrow][2] + parseFloat(playerstat4[4].substring(0,playerstat4[4].indexOf('<')));
                        arrints[playerrow][0] = curteamname;
                        arrints[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrints[playerrow][2] = arrints[playerrow][2] + parseFloat(playerstat4[11].substring(0,playerstat4[11].indexOf('<')));
                        arrhurries[playerrow][0] = curteamname;
                        arrhurries[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrhurries[playerrow][2] = arrhurries[playerrow][2] + parseFloat(playerstat4[6].substring(0,playerstat4[6].indexOf('<')));
                        arrff[playerrow][0] = curteamname;
                        arrff[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrff[playerrow][2] = arrhurries[playerrow][2] + parseFloat(playerstat4[8].substring(0,playerstat4[8].indexOf('<')));
                        arrpds[playerrow][0] = curteamname;
                        arrpds[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                        arrpds[playerrow][2] = arrhurries[playerrow][2] + parseFloat(playerstat4[10].substring(0,playerstat4[10].indexOf('<')));
                    };
                };
            };
        }else if (playerstat[j].indexOf('">Offensive Line</td>') > 0 ) {
            var playerstat2 = playerstat[j].split('<tr class="nonalternating_color2">')
            var jloop =0;
            for (var k=1;k<playerstat2.length;k++) {
                pointerposition = 0;
                curteamname = playerstat2[k].substring(playerstat2[k].indexOf('>',pointerposition) + 1,playerstat2[k].indexOf('</th>',pointerposition));
                if (playerstat2[k].indexOf('<tr class="alternating_color') > 0) {
                    var playerstat3 = playerstat2[k].split('<tr class="alternating_color');
                    var arrrowsc = arrpancakesc.length;
                    var arrrowsg = arrpancakesg.length;
                    var arrrowst = arrpancakest.length;
                    var arrrowste = arrpancakeste.length;
                    var arrrowsfb = arrpancakesfb.length;
                    var arrrowswr = arrpancakeswr.length;
                    for (var l=1;l<playerstat3.length;l++) {
                        var playerposition = playerstat3[l].substring(playerstat3[l].indexOf('"position">')+11,playerstat3[l].indexOf('</span>') - 1);
                        var playerstat4 = playerstat3[l].split('<td class="box_score_player_stat">');
                        
                        switch (playerposition) {
                        case "C":
                            var playerrow = -1;
                            for (jloop=0;jloop<arrpancakesc.length;jloop++) {
                                
                                if (arrpancakesc[jloop][3] == playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10))) {
                                    playerrow = jloop;
                                }
                            }
                            if (playerrow==-1) {
                                playerrow = arrrowsc;
                                arrpancakesc[playerrow] = new Array(4);
                                arrpancakesc[playerrow][2] = 0;
                                arrrowsc = arrrowsc + 1;
                            }
                            
                            arrpancakesc[playerrow][0] = curteamname;
                            arrpancakesc[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                            arrpancakesc[playerrow][2] = arrpancakesc[playerrow][2] + parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                            arrpancakesc[playerrow][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                            
                            break;
                        case "G":
                            var playerrow = -1;
                            for (jloop=0;jloop<arrpancakesg.length;jloop++) {
                                if (arrpancakesg[jloop][3] == playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10))) {
                                    playerrow = jloop;
                                }
                            }
                            if (playerrow==-1) {
                                playerrow = arrrowsg;
                                arrpancakesg[arrrowsg] = new Array(4);
                                arrpancakesg[arrrowsg][2] = 0;
                                arrrowsg = arrrowsg + 1;
                            }

                            arrpancakesg[playerrow][0] = curteamname;
                            arrpancakesg[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                            arrpancakesg[playerrow][2] = arrpancakesg[playerrow][2] + parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                            arrpancakesg[playerrow][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                            
                            break;
                        case "OT":
                            var playerrow = -1;
                            for (jloop=0;jloop<arrpancakest.length;jloop++) {
                                if (arrpancakest[jloop][3] == playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10))) {
                                    playerrow = jloop;
                                }
                            }
                            if (playerrow==-1) {
                                playerrow = arrrowst;
                                arrpancakest[arrrowst] = new Array(4);
                                arrpancakest[arrrowst][2] = 0;
                                arrrowst = arrrowst + 1;
                            }
                            arrpancakest[playerrow][0] = curteamname;
                            arrpancakest[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                            arrpancakest[playerrow][2] = arrpancakest[playerrow][2] + parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                            arrpancakest[playerrow][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                            
                            break;
                        case "TE":
                            var playerrow = -1;
                            for (jloop=0;jloop<arrpancakeste.length;jloop++) {
                                if (arrpancakeste[jloop][3] == playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10))) {
                                    playerrow = jloop;
                                }
                            }
                            if (playerrow==-1) {
                                playerrow = arrrowste;
                                arrpancakeste[arrrowste] = new Array(4);
                                arrpancakeste[arrrowste][2] = 0;
                                arrrowste = arrrowste + 1;
                            }
                            arrpancakeste[playerrow][0] = curteamname;
                            arrpancakeste[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                            arrpancakeste[playerrow][2] = arrpancakeste[playerrow][2] + parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                            arrpancakeste[playerrow][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                            
                            break;
                        case "FB":
                            var playerrow = -1;
                            for (jloop=0;jloop<arrpancakesfb.length;jloop++) {
                                if (arrpancakesfb[jloop][3] == playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10))) {
                                    playerrow = jloop;
                                }
                            }
                            if (playerrow==-1) {
                                playerrow = arrrowsfb;
                                arrpancakesfb[arrrowsfb] = new Array(4);
                                arrpancakesfb[arrrowsfb][2] = 0;
                                arrrowsfb = arrrowsfb + 1;
                            }
                            arrpancakesfb[playerrow][0] = curteamname;
                            arrpancakesfb[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                            arrpancakesfb[playerrow][2] = arrpancakesfb[playerrow][2] + parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                            arrpancakesfb[playerrow][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                            
                            break;
                        case "WR":
                            var playerrow = -1;
                            for (jloop=0;jloop<arrpancakeswr.length;jloop++) {
                                if (arrpancakeswr[jloop][3] == playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10))) {
                                    playerrow = jloop;
                                }
                            }
                            if (playerrow==-1) {
                                playerrow = arrrowswr;
                                arrpancakeswr[arrrowswr] = new Array(4);
                                arrpancakeswr[arrrowswr][2] = 0;
                                arrrowswr = arrrowswr + 1;
                            }
                            arrpancakeswr[playerrow][0] = curteamname;
                            arrpancakeswr[playerrow][1] = playerstat3[l].substring(playerstat3[l].indexOf('</span>')+7,playerstat3[l].indexOf('</a>') + 4).replace('<a href="','<a href="http://goallineblitz.com');
                            arrpancakeswr[playerrow][2] = arrpancakeswr[playerrow][2] + parseFloat(playerstat4[2].substring(0,playerstat4[2].indexOf('<')));
                            arrpancakeswr[playerrow][3] = playerstat3[l].substring(playerstat3[l].indexOf('player_id=')+10,playerstat3[l].indexOf('">',playerstat3[l].indexOf('player_id=')+10));
                            
                            break;
                        };
                    };
                };
            };
        };
    }


    if (gamecount ==0) {
        sortArray(arrteampoints,1,1);
        sortArray(arrpassyds,2,1);
        sortArray(arrpasstds,2,1);
        sortArray(arrrushyds,2,1);
        sortArray(arrrushtds,2,1);
        sortArray(arrreceptions,2,1);
        sortArray(arrrecyds,2,1);
        sortArray(arrrectds,2,1);
        sortArray(arrpancakesc,2,1);
        sortArray(arrpancakesg,2,1);
        sortArray(arrpancakest,2,1);
        sortArray(arrpancakeste,2,1);
        sortArray(arrpancakesfb,2,1);
        sortArray(arrpancakeswr,2,1);
        sortArray(arrfgmade,2,1);
        sortArray(arrpuntingavg,2,1);
        sortArray(arrpravg,2,1);
        sortArray(arrkravg,2,1);
        sortArray(arrprtds,2,1);
        sortArray(arrkrtds,2,1);
        sortArray(arrsacks,2,1);
        sortArray(arrhurries,2,1);
        sortArray(arrff,2,1);
        sortArray(arrtackles,2,1);
        sortArray(arrints,2,1);
        sortArray(arrpds,2,1);
        sortArray(arrteamdiff,1,1);
        sortArray(arrteamydsrushing,1,1);
        sortArray(arrteamydspassing,1,1);
        sortArray(arrteamydstotal,1,1);
        sortArray(arrteamydsrushingdef,1,0);
        sortArray(arrteamydspassingdef,1,0);
        sortArray(arrteamydstotaldef,1,0);
        
        
        
        
	workingwindow.close();
        resultswindow=window.open('',"Results", "width=420,height=640,scrollbars=yes,resizable=yes,toolbar=no,location=no,menubar=no");
        if (!resultswindow.opener) resultswindow.opener = self;
        resultswindow.document.writeln('&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;<br>[b][u] Offensive Stats: [/u][/b]<br>&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;<br>');
        resultswindow.document.writeln('<br>[b] Passing Yards: [/b]<br>');
        resultswindow.document.writeln(arrpassyds[0][0] + '..........[u]' + arrpassyds[0][1] + '[/u] .......... [b]' + arrpassyds[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpassyds[1][0] + '..........[u]' + arrpassyds[1][1] + '[/u] .......... [b]' + arrpassyds[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpassyds[2][0] + '..........[u]' + arrpassyds[2][1] + '[/u] .......... [b]' + arrpassyds[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpassyds[3][0] + '..........[u]' + arrpassyds[3][1] + '[/u] .......... [b]' + arrpassyds[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpassyds[4][0] + '..........[u]' + arrpassyds[4][1] + '[/u] .......... [b]' + arrpassyds[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpassyds[5][0] + '..........[u]' + arrpassyds[5][1] + '[/u] .......... [b]' + arrpassyds[5][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpassyds[6][0] + '..........[u]' + arrpassyds[6][1] + '[/u] .......... [b]' + arrpassyds[6][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpassyds[7][0] + '..........[u]' + arrpassyds[7][1] + '[/u] .......... [b]' + arrpassyds[7][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpassyds[8][0] + '..........[u]' + arrpassyds[8][1] + '[/u] .......... [b]' + arrpassyds[8][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpassyds[9][0] + '..........[u]' + arrpassyds[9][1] + '[/u] .......... [b]' + arrpassyds[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Passing TDs: [/b]<br>');
        resultswindow.document.writeln(arrpasstds[0][0] + '..........[u]' + arrpasstds[0][1] + '[/u] .......... [b]' + arrpasstds[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpasstds[1][0] + '..........[u]' + arrpasstds[1][1] + '[/u] .......... [b]' + arrpasstds[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpasstds[2][0] + '..........[u]' + arrpasstds[2][1] + '[/u] .......... [b]' + arrpasstds[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpasstds[3][0] + '..........[u]' + arrpasstds[3][1] + '[/u] .......... [b]' + arrpasstds[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpasstds[4][0] + '..........[u]' + arrpasstds[4][1] + '[/u] .......... [b]' + arrpasstds[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpasstds[5][0] + '..........[u]' + arrpasstds[5][1] + '[/u] .......... [b]' + arrpasstds[5][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpasstds[6][0] + '..........[u]' + arrpasstds[6][1] + '[/u] .......... [b]' + arrpasstds[6][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpasstds[7][0] + '..........[u]' + arrpasstds[7][1] + '[/u] .......... [b]' + arrpasstds[7][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpasstds[8][0] + '..........[u]' + arrpasstds[8][1] + '[/u] .......... [b]' + arrpasstds[8][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpasstds[9][0] + '..........[u]' + arrpasstds[9][1] + '[/u] .......... [b]' + arrpasstds[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Rushing Yards: [/b]<br>');
        resultswindow.document.writeln(arrrushyds[0][0] + '..........[u]' + arrrushyds[0][1] + '[/u] .......... [b]' + arrrushyds[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushyds[1][0] + '..........[u]' + arrrushyds[1][1] + '[/u] .......... [b]' + arrrushyds[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushyds[2][0] + '..........[u]' + arrrushyds[2][1] + '[/u] .......... [b]' + arrrushyds[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushyds[3][0] + '..........[u]' + arrrushyds[3][1] + '[/u] .......... [b]' + arrrushyds[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushyds[4][0] + '..........[u]' + arrrushyds[4][1] + '[/u] .......... [b]' + arrrushyds[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushyds[5][0] + '..........[u]' + arrrushyds[5][1] + '[/u] .......... [b]' + arrrushyds[5][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushyds[6][0] + '..........[u]' + arrrushyds[6][1] + '[/u] .......... [b]' + arrrushyds[6][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushyds[7][0] + '..........[u]' + arrrushyds[7][1] + '[/u] .......... [b]' + arrrushyds[7][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushyds[8][0] + '..........[u]' + arrrushyds[8][1] + '[/u] .......... [b]' + arrrushyds[8][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushyds[9][0] + '..........[u]' + arrrushyds[9][1] + '[/u] .......... [b]' + arrrushyds[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Rushing TDs: [/b]<br>');
        resultswindow.document.writeln(arrrushtds[0][0] + '..........[u]' + arrrushtds[0][1] + '[/u] .......... [b]' + arrrushtds[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushtds[1][0] + '..........[u]' + arrrushtds[1][1] + '[/u] .......... [b]' + arrrushtds[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushtds[2][0] + '..........[u]' + arrrushtds[2][1] + '[/u] .......... [b]' + arrrushtds[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushtds[3][0] + '..........[u]' + arrrushtds[3][1] + '[/u] .......... [b]' + arrrushtds[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushtds[4][0] + '..........[u]' + arrrushtds[4][1] + '[/u] .......... [b]' + arrrushtds[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushtds[5][0] + '..........[u]' + arrrushtds[5][1] + '[/u] .......... [b]' + arrrushtds[5][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushtds[6][0] + '..........[u]' + arrrushtds[6][1] + '[/u] .......... [b]' + arrrushtds[6][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushtds[7][0] + '..........[u]' + arrrushtds[7][1] + '[/u] .......... [b]' + arrrushtds[7][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushtds[8][0] + '..........[u]' + arrrushtds[8][1] + '[/u] .......... [b]' + arrrushtds[8][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrushtds[9][0] + '..........[u]' + arrrushtds[9][1] + '[/u] .......... [b]' + arrrushtds[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Receptions: [/b]<br>');
        resultswindow.document.writeln(arrreceptions[0][0] + '..........[u]' + arrreceptions[0][1] + '[/u] .......... [b]' + arrreceptions[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrreceptions[1][0] + '..........[u]' + arrreceptions[1][1] + '[/u] .......... [b]' + arrreceptions[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrreceptions[2][0] + '..........[u]' + arrreceptions[2][1] + '[/u] .......... [b]' + arrreceptions[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrreceptions[3][0] + '..........[u]' + arrreceptions[3][1] + '[/u] .......... [b]' + arrreceptions[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrreceptions[4][0] + '..........[u]' + arrreceptions[4][1] + '[/u] .......... [b]' + arrreceptions[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrreceptions[5][0] + '..........[u]' + arrreceptions[5][1] + '[/u] .......... [b]' + arrreceptions[5][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrreceptions[6][0] + '..........[u]' + arrreceptions[6][1] + '[/u] .......... [b]' + arrreceptions[6][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrreceptions[7][0] + '..........[u]' + arrreceptions[7][1] + '[/u] .......... [b]' + arrreceptions[7][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrreceptions[8][0] + '..........[u]' + arrreceptions[8][1] + '[/u] .......... [b]' + arrreceptions[8][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrreceptions[9][0] + '..........[u]' + arrreceptions[9][1] + '[/u] .......... [b]' + arrreceptions[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Reception Yards: [/b]<br>');
        resultswindow.document.writeln(arrrecyds[0][0] + '..........[u]' + arrrecyds[0][1] + '[/u] .......... [b]' + arrrecyds[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrecyds[1][0] + '..........[u]' + arrrecyds[1][1] + '[/u] .......... [b]' + arrrecyds[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrecyds[2][0] + '..........[u]' + arrrecyds[2][1] + '[/u] .......... [b]' + arrrecyds[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrecyds[3][0] + '..........[u]' + arrrecyds[3][1] + '[/u] .......... [b]' + arrrecyds[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrecyds[4][0] + '..........[u]' + arrrecyds[4][1] + '[/u] .......... [b]' + arrrecyds[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrecyds[5][0] + '..........[u]' + arrrecyds[5][1] + '[/u] .......... [b]' + arrrecyds[5][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrecyds[6][0] + '..........[u]' + arrrecyds[6][1] + '[/u] .......... [b]' + arrrecyds[6][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrecyds[7][0] + '..........[u]' + arrrecyds[7][1] + '[/u] .......... [b]' + arrrecyds[7][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrecyds[8][0] + '..........[u]' + arrrecyds[8][1] + '[/u] .......... [b]' + arrrecyds[8][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrecyds[9][0] + '..........[u]' + arrrecyds[9][1] + '[/u] .......... [b]' + arrrecyds[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Receptions TDs: [/b]<br>');
        resultswindow.document.writeln(arrrectds[0][0] + '..........[u]' + arrrectds[0][1] + '[/u] .......... [b]' + arrrectds[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrectds[1][0] + '..........[u]' + arrrectds[1][1] + '[/u] .......... [b]' + arrrectds[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrectds[2][0] + '..........[u]' + arrrectds[2][1] + '[/u] .......... [b]' + arrrectds[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrectds[3][0] + '..........[u]' + arrrectds[3][1] + '[/u] .......... [b]' + arrrectds[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrectds[4][0] + '..........[u]' + arrrectds[4][1] + '[/u] .......... [b]' + arrrectds[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrectds[5][0] + '..........[u]' + arrrectds[5][1] + '[/u] .......... [b]' + arrrectds[5][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrectds[6][0] + '..........[u]' + arrrectds[6][1] + '[/u] .......... [b]' + arrrectds[6][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrectds[7][0] + '..........[u]' + arrrectds[7][1] + '[/u] .......... [b]' + arrrectds[7][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrectds[8][0] + '..........[u]' + arrrectds[8][1] + '[/u] .......... [b]' + arrrectds[8][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrrectds[9][0] + '..........[u]' + arrrectds[9][1] + '[/u] .......... [b]' + arrrectds[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Pancakes C: [/b]<br>');
        resultswindow.document.writeln(arrpancakesc[0][0] + '..........[u]' + arrpancakesc[0][1] + '[/u] .......... [b]' + arrpancakesc[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakesc[1][0] + '..........[u]' + arrpancakesc[1][1] + '[/u] .......... [b]' + arrpancakesc[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakesc[2][0] + '..........[u]' + arrpancakesc[2][1] + '[/u] .......... [b]' + arrpancakesc[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakesc[3][0] + '..........[u]' + arrpancakesc[3][1] + '[/u] .......... [b]' + arrpancakesc[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakesc[4][0] + '..........[u]' + arrpancakesc[4][1] + '[/u] .......... [b]' + arrpancakesc[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Pancakes G: [/b]<br>');
        resultswindow.document.writeln(arrpancakesg[0][0] + '..........[u]' + arrpancakesg[0][1] + '[/u] .......... [b]' + arrpancakesg[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakesg[1][0] + '..........[u]' + arrpancakesg[1][1] + '[/u] .......... [b]' + arrpancakesg[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakesg[2][0] + '..........[u]' + arrpancakesg[2][1] + '[/u] .......... [b]' + arrpancakesg[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakesg[3][0] + '..........[u]' + arrpancakesg[3][1] + '[/u] .......... [b]' + arrpancakesg[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakesg[4][0] + '..........[u]' + arrpancakesg[4][1] + '[/u] .......... [b]' + arrpancakesg[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Pancakes T: [/b]<br>');
        resultswindow.document.writeln(arrpancakest[0][0] + '..........[u]' + arrpancakest[0][1] + '[/u] .......... [b]' + arrpancakest[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakest[1][0] + '..........[u]' + arrpancakest[1][1] + '[/u] .......... [b]' + arrpancakest[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakest[2][0] + '..........[u]' + arrpancakest[2][1] + '[/u] .......... [b]' + arrpancakest[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakest[3][0] + '..........[u]' + arrpancakest[3][1] + '[/u] .......... [b]' + arrpancakest[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakest[4][0] + '..........[u]' + arrpancakest[4][1] + '[/u] .......... [b]' + arrpancakest[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakest[9][0] + '..........[u]' + arrpancakest[9][1] + '[/u] .......... [b]' + arrpancakest[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Pancakes FB: [/b]<br>');
        resultswindow.document.writeln(arrpancakesfb[0][0] + '..........[u]' + arrpancakesfb[0][1] + '[/u] .......... [b]' + arrpancakesfb[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakesfb[1][0] + '..........[u]' + arrpancakesfb[1][1] + '[/u] .......... [b]' + arrpancakesfb[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakesfb[2][0] + '..........[u]' + arrpancakesfb[2][1] + '[/u] .......... [b]' + arrpancakesfb[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakesfb[3][0] + '..........[u]' + arrpancakesfb[3][1] + '[/u] .......... [b]' + arrpancakesfb[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakesfb[4][0] + '..........[u]' + arrpancakesfb[4][1] + '[/u] .......... [b]' + arrpancakesfb[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Pancakes TE: [/b]<br>');
        if (arrpancakeste.length>2) {
        resultswindow.document.writeln(arrpancakeste[0][0] + '..........[u]' + arrpancakeste[0][1] + '[/u] .......... [b]' + arrpancakeste[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakeste[1][0] + '..........[u]' + arrpancakeste[1][1] + '[/u] .......... [b]' + arrpancakeste[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakeste[2][0] + '..........[u]' + arrpancakeste[2][1] + '[/u] .......... [b]' + arrpancakeste[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakeste[3][0] + '..........[u]' + arrpancakeste[3][1] + '[/u] .......... [b]' + arrpancakeste[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakeste[4][0] + '..........[u]' + arrpancakeste[4][1] + '[/u] .......... [b]' + arrpancakeste[4][2] + '[/b]');
        }else {
            for (var lloop =0;lloop<arrpancakeste.length;lloop++) {
                resultswindow.document.writeln(arrpancakeste[lloop][0] + '..........[u]' + arrpancakeste[lloop][1] + '[/u] .......... [b]' + arrpancakeste[lloop][2] + '[/b]');
                resultswindow.document.writeln('<br>');
            }
        }
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Pancakes WR: [/b]<br>');
        if (arrpancakeswr.length>2) {
        resultswindow.document.writeln(arrpancakeswr[0][0] + '..........[u]' + arrpancakeswr[0][1] + '[/u] .......... [b]' + arrpancakeswr[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakeswr[1][0] + '..........[u]' + arrpancakeswr[1][1] + '[/u] .......... [b]' + arrpancakeswr[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpancakeswr[2][0] + '..........[u]' + arrpancakeswr[2][1] + '[/u] .......... [b]' + arrpancakeswr[2][2] + '[/b]');
        }else {
            for (var lloop =0;lloop<arrpancakeswr.length;lloop++) {
                resultswindow.document.writeln(arrpancakeswr[lloop][0] + '..........[u]' + arrpancakeswr[lloop][1] + '[/u] .......... [b]' + arrpancakeswr[lloop][2] + '[/b]');
                resultswindow.document.writeln('<br>');
            }
        }
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;<br>[b][u] Defensive Stats [/u][/b]<br>&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;<br>');
        resultswindow.document.writeln('<br>[b] Sacks: [/b]<br>');
        resultswindow.document.writeln(arrsacks[0][0] + '..........[u]' + arrsacks[0][1] + '[/u] .......... [b]' + arrsacks[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrsacks[1][0] + '..........[u]' + arrsacks[1][1] + '[/u] .......... [b]' + arrsacks[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrsacks[2][0] + '..........[u]' + arrsacks[2][1] + '[/u] .......... [b]' + arrsacks[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrsacks[3][0] + '..........[u]' + arrsacks[3][1] + '[/u] .......... [b]' + arrsacks[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrsacks[4][0] + '..........[u]' + arrsacks[4][1] + '[/u] .......... [b]' + arrsacks[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrsacks[5][0] + '..........[u]' + arrsacks[5][1] + '[/u] .......... [b]' + arrsacks[5][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrsacks[6][0] + '..........[u]' + arrsacks[6][1] + '[/u] .......... [b]' + arrsacks[6][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrsacks[7][0] + '..........[u]' + arrsacks[7][1] + '[/u] .......... [b]' + arrsacks[7][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrsacks[8][0] + '..........[u]' + arrsacks[8][1] + '[/u] .......... [b]' + arrsacks[8][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrsacks[9][0] + '..........[u]' + arrsacks[9][1] + '[/u] .......... [b]' + arrsacks[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Hurries: [/b]<br>');
        resultswindow.document.writeln(arrhurries[0][0] + '..........[u]' + arrhurries[0][1] + '[/u] .......... [b]' + arrhurries[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrhurries[1][0] + '..........[u]' + arrhurries[1][1] + '[/u] .......... [b]' + arrhurries[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrhurries[2][0] + '..........[u]' + arrhurries[2][1] + '[/u] .......... [b]' + arrhurries[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrhurries[3][0] + '..........[u]' + arrhurries[3][1] + '[/u] .......... [b]' + arrhurries[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrhurries[4][0] + '..........[u]' + arrhurries[4][1] + '[/u] .......... [b]' + arrhurries[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrhurries[5][0] + '..........[u]' + arrhurries[5][1] + '[/u] .......... [b]' + arrhurries[5][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrhurries[6][0] + '..........[u]' + arrhurries[6][1] + '[/u] .......... [b]' + arrhurries[6][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrhurries[7][0] + '..........[u]' + arrhurries[7][1] + '[/u] .......... [b]' + arrhurries[7][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrhurries[8][0] + '..........[u]' + arrhurries[8][1] + '[/u] .......... [b]' + arrhurries[8][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrhurries[9][0] + '..........[u]' + arrhurries[9][1] + '[/u] .......... [b]' + arrhurries[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Tackles: [/b]<br>');
        resultswindow.document.writeln(arrtackles[0][0] + '..........[u]' + arrtackles[0][1] + '[/u] .......... [b]' + arrtackles[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrtackles[1][0] + '..........[u]' + arrtackles[1][1] + '[/u] .......... [b]' + arrtackles[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrtackles[2][0] + '..........[u]' + arrtackles[2][1] + '[/u] .......... [b]' + arrtackles[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrtackles[3][0] + '..........[u]' + arrtackles[3][1] + '[/u] .......... [b]' + arrtackles[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrtackles[4][0] + '..........[u]' + arrtackles[4][1] + '[/u] .......... [b]' + arrtackles[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrtackles[5][0] + '..........[u]' + arrtackles[5][1] + '[/u] .......... [b]' + arrtackles[5][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrtackles[6][0] + '..........[u]' + arrtackles[6][1] + '[/u] .......... [b]' + arrtackles[6][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrtackles[7][0] + '..........[u]' + arrtackles[7][1] + '[/u] .......... [b]' + arrtackles[7][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrtackles[8][0] + '..........[u]' + arrtackles[8][1] + '[/u] .......... [b]' + arrtackles[8][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrtackles[9][0] + '..........[u]' + arrtackles[9][1] + '[/u] .......... [b]' + arrtackles[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Forced Fumbles: [/b]<br>');
        resultswindow.document.writeln(arrff[0][0] + '..........[u]' + arrff[0][1] + '[/u] .......... [b]' + arrff[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrff[1][0] + '..........[u]' + arrff[1][1] + '[/u] .......... [b]' + arrff[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrff[2][0] + '..........[u]' + arrff[2][1] + '[/u] .......... [b]' + arrff[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrff[3][0] + '..........[u]' + arrff[3][1] + '[/u] .......... [b]' + arrff[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrff[4][0] + '..........[u]' + arrff[4][1] + '[/u] .......... [b]' + arrff[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrff[5][0] + '..........[u]' + arrff[5][1] + '[/u] .......... [b]' + arrff[5][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrff[6][0] + '..........[u]' + arrff[6][1] + '[/u] .......... [b]' + arrff[6][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrff[7][0] + '..........[u]' + arrff[7][1] + '[/u] .......... [b]' + arrff[7][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrff[8][0] + '..........[u]' + arrff[8][1] + '[/u] .......... [b]' + arrff[8][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrff[9][0] + '..........[u]' + arrff[9][1] + '[/u] .......... [b]' + arrff[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Pass Deflections: [/b]<br>');
        resultswindow.document.writeln(arrpds[0][0] + '..........[u]' + arrpds[0][1] + '[/u] .......... [b]' + arrpds[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpds[1][0] + '..........[u]' + arrpds[1][1] + '[/u] .......... [b]' + arrpds[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpds[2][0] + '..........[u]' + arrpds[2][1] + '[/u] .......... [b]' + arrpds[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpds[3][0] + '..........[u]' + arrpds[3][1] + '[/u] .......... [b]' + arrpds[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpds[4][0] + '..........[u]' + arrpds[4][1] + '[/u] .......... [b]' + arrpds[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpds[5][0] + '..........[u]' + arrpds[5][1] + '[/u] .......... [b]' + arrpds[5][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpds[6][0] + '..........[u]' + arrpds[6][1] + '[/u] .......... [b]' + arrpds[6][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpds[7][0] + '..........[u]' + arrpds[7][1] + '[/u] .......... [b]' + arrpds[7][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpds[8][0] + '..........[u]' + arrpds[8][1] + '[/u] .......... [b]' + arrpds[8][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpds[9][0] + '..........[u]' + arrpds[9][1] + '[/u] .......... [b]' + arrpds[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Interceptions: [/b]<br>');
        resultswindow.document.writeln(arrints[0][0] + '..........[u]' + arrints[0][1] + '[/u] .......... [b]' + arrints[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrints[1][0] + '..........[u]' + arrints[1][1] + '[/u] .......... [b]' + arrints[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrints[2][0] + '..........[u]' + arrints[2][1] + '[/u] .......... [b]' + arrints[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrints[3][0] + '..........[u]' + arrints[3][1] + '[/u] .......... [b]' + arrints[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrints[4][0] + '..........[u]' + arrints[4][1] + '[/u] .......... [b]' + arrints[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrints[5][0] + '..........[u]' + arrints[5][1] + '[/u] .......... [b]' + arrints[5][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrints[6][0] + '..........[u]' + arrints[6][1] + '[/u] .......... [b]' + arrints[6][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrints[7][0] + '..........[u]' + arrints[7][1] + '[/u] .......... [b]' + arrints[7][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrints[8][0] + '..........[u]' + arrints[8][1] + '[/u] .......... [b]' + arrints[8][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrints[9][0] + '..........[u]' + arrints[9][1] + '[/u] .......... [b]' + arrints[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;<br>[b][u] Special Team Stats [/u][/b]<br>&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;<br>');
        resultswindow.document.writeln('<br>[b] FGs Made: [/b]<br>');
        resultswindow.document.writeln(arrfgmade[0][0] + '..........[u]' + arrfgmade[0][1] + '[/u] .......... [b]' + arrfgmade[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrfgmade[1][0] + '..........[u]' + arrfgmade[1][1] + '[/u] .......... [b]' + arrfgmade[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrfgmade[2][0] + '..........[u]' + arrfgmade[2][1] + '[/u] .......... [b]' + arrfgmade[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrfgmade[3][0] + '..........[u]' + arrfgmade[3][1] + '[/u] .......... [b]' + arrfgmade[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrfgmade[4][0] + '..........[u]' + arrfgmade[4][1] + '[/u] .......... [b]' + arrfgmade[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrfgmade[5][0] + '..........[u]' + arrfgmade[5][1] + '[/u] .......... [b]' + arrfgmade[5][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrfgmade[6][0] + '..........[u]' + arrfgmade[6][1] + '[/u] .......... [b]' + arrfgmade[6][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrfgmade[7][0] + '..........[u]' + arrfgmade[7][1] + '[/u] .......... [b]' + arrfgmade[7][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrfgmade[8][0] + '..........[u]' + arrfgmade[8][1] + '[/u] .......... [b]' + arrfgmade[8][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrfgmade[9][0] + '..........[u]' + arrfgmade[9][1] + '[/u] .......... [b]' + arrfgmade[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Punting Avg: [/b]<br>');
        resultswindow.document.writeln(arrpuntingavg[0][0] + '..........[u]' + arrpuntingavg[0][1] + '[/u] .......... [b]' + arrpuntingavg[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpuntingavg[1][0] + '..........[u]' + arrpuntingavg[1][1] + '[/u] .......... [b]' + arrpuntingavg[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpuntingavg[2][0] + '..........[u]' + arrpuntingavg[2][1] + '[/u] .......... [b]' + arrpuntingavg[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpuntingavg[3][0] + '..........[u]' + arrpuntingavg[3][1] + '[/u] .......... [b]' + arrpuntingavg[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpuntingavg[4][0] + '..........[u]' + arrpuntingavg[4][1] + '[/u] .......... [b]' + arrpuntingavg[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpuntingavg[5][0] + '..........[u]' + arrpuntingavg[5][1] + '[/u] .......... [b]' + arrpuntingavg[5][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpuntingavg[6][0] + '..........[u]' + arrpuntingavg[6][1] + '[/u] .......... [b]' + arrpuntingavg[6][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpuntingavg[7][0] + '..........[u]' + arrpuntingavg[7][1] + '[/u] .......... [b]' + arrpuntingavg[7][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpuntingavg[8][0] + '..........[u]' + arrpuntingavg[8][1] + '[/u] .......... [b]' + arrpuntingavg[8][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpuntingavg[9][0] + '..........[u]' + arrpuntingavg[9][1] + '[/u] .......... [b]' + arrpuntingavg[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Punt Return Average: [/b]<br>');
        resultswindow.document.writeln(arrpravg[0][0] + '..........[u]' + arrpravg[0][1] + '[/u] .......... [b]' + arrpravg[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpravg[1][0] + '..........[u]' + arrpravg[1][1] + '[/u] .......... [b]' + arrpravg[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpravg[2][0] + '..........[u]' + arrpravg[2][1] + '[/u] .......... [b]' + arrpravg[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpravg[3][0] + '..........[u]' + arrpravg[3][1] + '[/u] .......... [b]' + arrpravg[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpravg[4][0] + '..........[u]' + arrpravg[4][1] + '[/u] .......... [b]' + arrpravg[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpravg[5][0] + '..........[u]' + arrpravg[5][1] + '[/u] .......... [b]' + arrpravg[5][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpravg[6][0] + '..........[u]' + arrpravg[6][1] + '[/u] .......... [b]' + arrpravg[6][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpravg[7][0] + '..........[u]' + arrpravg[7][1] + '[/u] .......... [b]' + arrpravg[7][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpravg[8][0] + '..........[u]' + arrpravg[8][1] + '[/u] .......... [b]' + arrpravg[8][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrpravg[9][0] + '..........[u]' + arrpravg[9][1] + '[/u] .......... [b]' + arrpravg[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Kick Return Average: [/b]<br>');
        resultswindow.document.writeln(arrkravg[0][0] + '..........[u]' + arrkravg[0][1] + '[/u] .......... [b]' + arrkravg[0][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrkravg[1][0] + '..........[u]' + arrkravg[1][1] + '[/u] .......... [b]' + arrkravg[1][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrkravg[2][0] + '..........[u]' + arrkravg[2][1] + '[/u] .......... [b]' + arrkravg[2][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrkravg[3][0] + '..........[u]' + arrkravg[3][1] + '[/u] .......... [b]' + arrkravg[3][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrkravg[4][0] + '..........[u]' + arrkravg[4][1] + '[/u] .......... [b]' + arrkravg[4][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrkravg[5][0] + '..........[u]' + arrkravg[5][1] + '[/u] .......... [b]' + arrkravg[5][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrkravg[6][0] + '..........[u]' + arrkravg[6][1] + '[/u] .......... [b]' + arrkravg[6][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrkravg[7][0] + '..........[u]' + arrkravg[7][1] + '[/u] .......... [b]' + arrkravg[7][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrkravg[8][0] + '..........[u]' + arrkravg[8][1] + '[/u] .......... [b]' + arrkravg[8][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrkravg[9][0] + '..........[u]' + arrkravg[9][1] + '[/u] .......... [b]' + arrkravg[9][2] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;<br>[b][u] Team Stats [/u][/b]<br>&#9644;&#9644;&#9644;&#9644;&#9644;&#9644;<br>');
        resultswindow.document.writeln('<br>[b] Team Points: [/b]<br>');
        resultswindow.document.writeln(arrteampoints[0][0] + '..........[b]' + arrteampoints[0][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteampoints[1][0] + '..........[b]' + arrteampoints[1][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteampoints[2][0] + '..........[b]' + arrteampoints[2][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteampoints[3][0] + '..........[b]' + arrteampoints[3][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteampoints[4][0] + '..........[b]' + arrteampoints[4][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteampoints[5][0] + '..........[b]' + arrteampoints[5][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteampoints[6][0] + '..........[b]' + arrteampoints[6][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteampoints[7][0] + '..........[b]' + arrteampoints[7][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteampoints[8][0] + '..........[b]' + arrteampoints[8][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteampoints[9][0] + '..........[b]' + arrteampoints[9][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Team Points Difference: [/b]<br>');
        resultswindow.document.writeln(arrteamdiff[0][0] + '..........[b]' + arrteamdiff[0][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamdiff[1][0] + '..........[b]' + arrteamdiff[1][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamdiff[2][0] + '..........[b]' + arrteamdiff[2][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamdiff[3][0] + '..........[b]' + arrteamdiff[3][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamdiff[4][0] + '..........[b]' + arrteamdiff[4][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamdiff[5][0] + '..........[b]' + arrteamdiff[5][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamdiff[6][0] + '..........[b]' + arrteamdiff[6][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamdiff[7][0] + '..........[b]' + arrteamdiff[7][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamdiff[8][0] + '..........[b]' + arrteamdiff[8][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamdiff[9][0] + '..........[b]' + arrteamdiff[9][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Team Rushing Yards: [/b]<br>');
        resultswindow.document.writeln(arrteamydsrushing[0][0] + '..........[b]' + arrteamydsrushing[0][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushing[1][0] + '..........[b]' + arrteamydsrushing[1][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushing[2][0] + '..........[b]' + arrteamydsrushing[2][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushing[3][0] + '..........[b]' + arrteamydsrushing[3][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushing[4][0] + '..........[b]' + arrteamydsrushing[4][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushing[5][0] + '..........[b]' + arrteamydsrushing[5][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushing[6][0] + '..........[b]' + arrteamydsrushing[6][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushing[7][0] + '..........[b]' + arrteamydsrushing[7][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushing[8][0] + '..........[b]' + arrteamydsrushing[8][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushing[9][0] + '..........[b]' + arrteamydsrushing[9][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Team Passing Yards: [/b]<br>');
        resultswindow.document.writeln(arrteamydspassing[0][0] + '..........[b]' + arrteamydspassing[0][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassing[1][0] + '..........[b]' + arrteamydspassing[1][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassing[2][0] + '..........[b]' + arrteamydspassing[2][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassing[3][0] + '..........[b]' + arrteamydspassing[3][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassing[4][0] + '..........[b]' + arrteamydspassing[4][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassing[5][0] + '..........[b]' + arrteamydspassing[5][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassing[6][0] + '..........[b]' + arrteamydspassing[6][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassing[7][0] + '..........[b]' + arrteamydspassing[7][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassing[8][0] + '..........[b]' + arrteamydspassing[8][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassing[9][0] + '..........[b]' + arrteamydspassing[9][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Team Total Yards: [/b]<br>');
        resultswindow.document.writeln(arrteamydstotal[0][0] + '..........[b]' + arrteamydstotal[0][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotal[1][0] + '..........[b]' + arrteamydstotal[1][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotal[2][0] + '..........[b]' + arrteamydstotal[2][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotal[3][0] + '..........[b]' + arrteamydstotal[3][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotal[4][0] + '..........[b]' + arrteamydstotal[4][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotal[5][0] + '..........[b]' + arrteamydstotal[5][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotal[6][0] + '..........[b]' + arrteamydstotal[6][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotal[7][0] + '..........[b]' + arrteamydstotal[7][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotal[8][0] + '..........[b]' + arrteamydstotal[8][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotal[9][0] + '..........[b]' + arrteamydstotal[9][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Team Rushing Yards Allowed: [/b]<br>');
        resultswindow.document.writeln(arrteamydsrushingdef[0][0] + '..........[b]' + arrteamydsrushingdef[0][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushingdef[1][0] + '..........[b]' + arrteamydsrushingdef[1][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushingdef[2][0] + '..........[b]' + arrteamydsrushingdef[2][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushingdef[3][0] + '..........[b]' + arrteamydsrushingdef[3][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushingdef[4][0] + '..........[b]' + arrteamydsrushingdef[4][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushingdef[5][0] + '..........[b]' + arrteamydsrushingdef[5][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushingdef[6][0] + '..........[b]' + arrteamydsrushingdef[6][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushingdef[7][0] + '..........[b]' + arrteamydsrushingdef[7][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushingdef[8][0] + '..........[b]' + arrteamydsrushingdef[8][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydsrushingdef[9][0] + '..........[b]' + arrteamydsrushingdef[9][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Team Passing Yards Allowed: [/b]<br>');
        resultswindow.document.writeln(arrteamydspassingdef[0][0] + '..........[b]' + arrteamydspassingdef[0][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassingdef[1][0] + '..........[b]' + arrteamydspassingdef[1][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassingdef[2][0] + '..........[b]' + arrteamydspassingdef[2][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassingdef[3][0] + '..........[b]' + arrteamydspassingdef[3][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassingdef[4][0] + '..........[b]' + arrteamydspassingdef[4][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassingdef[5][0] + '..........[b]' + arrteamydspassingdef[5][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassingdef[6][0] + '..........[b]' + arrteamydspassingdef[6][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassingdef[7][0] + '..........[b]' + arrteamydspassingdef[7][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassingdef[8][0] + '..........[b]' + arrteamydspassingdef[8][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydspassingdef[9][0] + '..........[b]' + arrteamydspassingdef[9][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln('<br>[b] Team Total Yards Allowed: [/b]<br>');
        resultswindow.document.writeln(arrteamydstotaldef[0][0] + '..........[b]' + arrteamydstotaldef[0][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotaldef[1][0] + '..........[b]' + arrteamydstotaldef[1][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotaldef[2][0] + '..........[b]' + arrteamydstotaldef[2][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotaldef[3][0] + '..........[b]' + arrteamydstotaldef[3][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotaldef[4][0] + '..........[b]' + arrteamydstotaldef[4][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotaldef[5][0] + '..........[b]' + arrteamydstotaldef[5][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotaldef[6][0] + '..........[b]' + arrteamydstotaldef[6][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotaldef[7][0] + '..........[b]' + arrteamydstotaldef[7][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotaldef[8][0] + '..........[b]' + arrteamydstotaldef[8][1] + '[/b]');
        resultswindow.document.writeln('<br>');
        resultswindow.document.writeln(arrteamydstotaldef[9][0] + '..........[b]' + arrteamydstotaldef[9][1] + '[/b]');
        resultswindow.document.writeln('<br>');

        
       
    }
    }
    })
}

