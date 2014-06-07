// ==UserScript==
// @name           pbr Game Scout for Firefox 2
// @description    modification of tciss(?)'s game scout script for GoalLineBlitz.com
// @namespace      http://goallinebliz.com
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp&quarter=*
// @version        08.06.29

/*
 *
 * based on code by tciss from www.goallineblitz.com
 * pabst modified it 6/22/08
 */



window.setTimeout( function() 
{

function startsWith(word, base) {
    if (word.substring(0,base.length) == base) return true;
	return false;
}

function arrayPairSort(arrays, idx) {    
    if (arrays == null) return;
    if (arrays[0] == null) return;
    if (arrays[0].length < 2) return;
    var sortable = arrays[0];
    var sibling = arrays[1];
    for each (passes in idx) {
        for (var i=0; i<sortable[t].length-1; i++) {
            for (var j=i+1; j<sortable[t].length; j++) {
                if (sortable[t][i][passes] < sortable[t][j][passes]) {
                    var temp = sortable[t][i];
                    sortable[t][i] = sortable[t][j];
                    sortable[t][j] = temp;

                    temp = sibling[t][i];
                    sibling[t][i] = sibling[t][j];
                    sibling[t][j] = temp;
                }
            }
        }
    }
}

function getQuarterTable(index, length) {
	var title = "Quarter";
	var columns = ["Total","1st","2nd","3rd","4th","OT"];
	var rows = ["Rush Att","Rush Yards","Yards / Att","Success Rate"," ","Pass Comp","Pass Att", "Comp. Pct","Yards"];

    var c;
    if (length == 1) c = new Array(length);
    else c = new Array(length+1);

    for (var i=0; i<c.length; i++) {
        c[i] = columns[i];
    }
	return getTable(title,rows,c,index,"q");	
}

function getRushingTable(index) {
	var title = "Team Rushing";
	var columns = ["Far Left","Left","Middle","Right","Far Right"];
	var rows = ["Attempts","Yards","Yards / Att","Success Rate"];

	return getTable(title,rows,columns,index,"r");	
}

function getPassingTable(index) {
	var title = "Team Passing";
	var columns = ["Left","Middle","Right"];
	var rows = ["Completions","Attempts","Comp. Pct","Yards"];

	return getTable(title,rows, columns,index,"p");	
}

function getRushingByDownTable(index) {
	var title = "Rushing By Down";
	var columns = ["First","Second","Third","Fourth"];
	var rows = ["Attempts","Yards","Yards / Att","Success Rate"];

	return getTable(title,rows,columns,index,"rbd");	
}

function getPassingByDownTable(index) {
	var title = "Passing By Down";
	var columns = ["First","Second","Third","Fourth"];
	var rows = ["Completions","Attempts","Comp. Pct","Yards"];

	return getTable(title,rows,columns,index,"pbd");	
}

function getRushingByDownTable(index) {
	var title = "Rushing By Down";
	var columns = ["First","Second","Third","Fourth"];
	var rows = ["Attempts","Yards","Yards / Att","Success Rate"];

	return getTable(title,rows,columns,index,"rbd");	
}

function getPassingDistanceTable(index) {
	var title = "Passing Distance";
	var columns = ["Left","Middle","Right","Total"];
	var rows = ["Long","Medium","Short","Backfield","Total"];

	return getTable(title,rows,columns,index,"pd");	
}

function getPassingTargetTable(index, rows) {
	var title = "Receivers";
	var columns = ["Targets","Catches","Drops","Catch Pct.","Yards","YAC","Long"];

    var r = rows;
    if (rows == null) r = [];
    else if (rows.length == 0) r = []; 
	return getTable(title,r,columns,index,"tp");	
}

function getRushingTargetTable(index, rows) {
	var title = "Runners";
	var columns = ["Att","Yards","Yards / Att","Long","Success Rate"];

    var r = rows;
    if (rows == null) r = [];
    else if (rows.length == 0) r = []; 
	return getTable(title,r,columns,index,"tr");	
}

function getTable(title, rows, columns, index, prefix) {
	var output;	
	output  = "<Table cellspacing=0 style='width: 400px;' border='1' id='scout-"+title+"-table"+index+"'>";
	output += "<tr class='nonalternating_color pbp_pbr_title'><td id='team"+index+""+prefix+"' colspan='8' align='center'>"+title+"</td></tr>";
	
	output += "<tr class='nonalternating_color2 pbp_pbr_title'><td></td>";
	for (var i=0; i<columns.length; i++) {
		output += "<td align='center'>"+columns[i]+"</td>";
	}
	output += "</tr>";
	
	for (var y=0; y<rows.length; y++) {
		output += "<tr class='alternating_color"+(y%2+1)+" pbp_pbr_title_row'><td>"+rows[y]+"</td>";
		for (var x=0; x<columns.length; x++) {
			output += "<td id='"+prefix+"-"+x+"-"+y+"-"+index+"' align='center'>("+x+","+y+")</td>";
		}
		output += "</tr>";
	}
    output += "</table>";
    
	return output;
}

function getElementsByClassName(classname, par) {
    var a=[];   
    var re = new RegExp('\\b' + classname + '\\b');
    var els = par.getElementsByTagName("*");
    
    for(var i=0, j=els.length; i<j; i++) {       
	if(re.test(els[i].className)) {
	    a.push(els[i]);
	}
    }
    
    return a;
};

var replay_addresses = getElementsByClassName("pbp_replay",document);
var replay_pages = [];

function getPage(address)
{
   GM_xmlhttpRequest({
   method: 'GET',
   url: address,
   headers: {'User-agent': 'Mozilla/5.0', 'Accept': 'text/xml', },
	       onload: function(page) { console.log(address); replay_pages.push(address); }
   });
};

var current_team = 0;
var teams = getElementsByClassName("team_name",document);
var team_name = [teams[1].firstChild.innerHTML,teams[2].firstChild.innerHTML];

var team_att = [0,0,0,0,0,0,0,0,0,0];
var team_yards = [0,0,0,0,0,0,0,0,0,0];
var team_success = [0,0,0,0,0,0,0,0,0,0];

var team_pass_att = [0,0,0,0,0,0];
var team_pass_comp = [0,0,0,0,0,0];
var team_pass_yards = [0,0,0,0,0,0];

var team_att_down = [0,0,0,0,0,0,0,0,0,0,0,0];
var team_yards_down = [0,0,0,0,0,0,0,0,0,0,0,0];
var team_success_down = [0,0,0,0,0,0,0,0,0,0,0,0];

var team_pass_att_down = [0,0,0,0,0,0,0,0];
var team_pass_comp_down = [0,0,0,0,0,0,0,0];
var team_pass_yards_down = [0,0,0,0,0,0,0,0];

var team_quarter_totals = new Array(6);
for (var i=0; i<6; i++) {
    team_quarter_totals[i] = [0,0,0,0,0,0,0,0,0,0,0,0];
}

var playerRushingName = new Array();
var playerRushingStats = new Array();   //[att,yard,long,succ]
var playerReceivingName = new Array();
var playerReceivingStats = new Array(); //[comp,att,drop,yard]

var distanceStats = new Array(4);
for (var i=0; i<4; i++) {
    distanceStats[i]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //>0cay - >5cay - >15cay
    distanceStats[i]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    distanceStats[i]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    distanceStats[i]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}

var times = getElementsByClassName("pbp_time_remaining",document);
var downs = getElementsByClassName("pbp_down",document);	          	
var markers = getElementsByClassName("pbp_marker",document);
var down_index = 0;  //down_index is !NOT! the same as play number

var plays = getElementsByClassName("pbp_play",document);
var current_play = 0;
var quarter = 0;

for(var pidx=0; pidx<plays.length; pidx++)
{
    current_play = pidx+1;

    //console.log("len="+replay_addresses.length);
    if (current_play < replay_addresses.length) {
	var r = replay_addresses[current_play].innerHTML;
	r = r.slice(r.indexOf('"')+1);
	r = r.slice(0,r.indexOf('"'));
	r = "http://www.goallineblitz.com" + r;
	//	console.log(r);
    /*
     * I guess you can see where I'm going with this
     */
	//getPage(r);
    }

    if (times[pidx].innerHTML == "15:00") {
        quarter++;
    }
    var play_container = document.getElementById("play_"+current_play);
    var play = plays[pidx];
    var scoreToAdd = 0;
    var playText = play.innerHTML;


    if (play_container.innerHTML.indexOf(team_name[0])!=-1) {
    	if (play_container.innerHTML.indexOf(team_name[1])!=-1) {
    		//can't change current team  if it has both
	    	//because of watch_game_score script
	    }
	    else {
	        current_team = 0;	
	    }
    }
    else if (play_container.innerHTML.indexOf(team_name[1])!=-1) {
    	if (play_container.innerHTML.indexOf(team_name[0])!=-1) {
    		//can't change current team  if it has both
    		//because of watch_game_score script
    	}
    	else {
    	    current_team = 1;
    	}
    }
    else {
//console.log(play_container.innerHTML);
    }

    var downText = downs[down_index].innerHTML;
    var down = -1;
    var togo = -1;
    var minGain = -1;

    try {
    	down = parseFloat(downText);
	    try {
	        if (downText.indexOf("G") != -1) {
	    	    togo = parseFloat(markers[down_index].innerHTML.slice(4));
	        }
	        else if (downText.indexOf("inches") != -1) {
	    	    togo = 0.5;
	        }
	        else {
	    	    togo = parseFloat(downText.slice(10));
	        }
	    }
	    catch (err) {
	        togo = 0.5;
	    }
	    if (down == 1) {
	        minGain = togo*0.40;
	    }
    	else if (down == 2) {
    	    minGain = togo*0.60;
    	}
    	else {
    	    minGain = togo;
    	}
    	
    	var sp = -1;
    	var ep = -1;
    	var y = NaN;
    	var line = playText;
    	var yt;
       	do {
    	    //unfortunately, some people have parentheses in their names
    	    sp = line.indexOf('(')+1;
    	    ep = line.indexOf(')');
    	    if ((sp == -1) || (ep == -1)) {
        		//no parentheses left in this line
        		y = NaN;
        		break;
    	    }
    	    else {
        		//one complete set of parentheses found
        		yt = line.slice(sp,ep);
        		if (yt.indexOf("incomplete") != -1) {
        		    y = 0;
        		}
        		else if (yt.indexOf("no gain") != -1) {
        		    y = 0;
        		}
        		else {
        		    y = parseFloat(yt);
        		}
        		line = line.slice(ep+1);
    	    }
    	} while (isNaN(y) == true);
    }
    catch (error) {
    	console.log(error);
    }
    
    //console.log(down_index+"/"+downs.length+" down="+down+"\tarr[d]="+((down-1)+current_team*4)+"\tdowntxt="+downs[down_index].innerHTML+" - "+playText);
    
    if ((playText.match(" rush") != null) || (playText.match(" pitch to ") != null)) {
	//console.log("rush "+playText.slice(0,20));
	
	    var inside = true;
	    if (playText.match(" pitch to ") != null) {
	        inside = false;
	    }
	
	    if(yt.indexOf(" yd gain") != -1) {
	        //y = y;
	    }
	    else if(yt.indexOf(" yd loss") != -1) {
	        y = -y;
	    }
	
	    if(yt.indexOf(" yd return") != -1) {
	        //must have been a fumble here
	        //can't include without calculating the position
	        //and still won't know the direction of the run
	    }	
	    else if(playText.indexOf("[SAFETY]") != -1) {
	        //must have been a safety here
            //and, of course, it's a possession for the wrong team
            //ignoring it for nowas we don't know where the runner was tackled
	    }	
	    else {
	        // 0 - 1 - 2 - 3 - 4
	        var index = current_team * 5;
	        var r1 = -1;
	        var r2 = -1;
            var s;
	        if (inside == false) {
		        if ( (r2 = playText.indexOf(" to the left")) != -1) {
		            //index += 0;
		        }
		        else if( (r2 = playText.indexOf(" up the middle")) != -1) {
		            // sometimes outside runs get stuffed immediately, so
		            // I'm just calling it a middle run regardless
		            index += 2; 
		        }
	            else if ( (r2 = playText.indexOf(" to the right")) != -1) {
		            index += 4;
		        }
                r3 = playText.indexOf("[missed");
                if (r3 != -1) {
                    if (playText[r3-1] == ' ') r3--;
                    r2 = Math.min(r2,r3);
                }
		        r1 = playText.slice(0,r2).indexOf(" pitch to ")+" pitch to ".length;
                s = playText.slice(r1,r2);
	        }
	        else {
		        if ( (r2=playText.indexOf(" to the left")) != -1) {
		            index += 1;
		        }
		        else if( (r2=playText.indexOf(" up the middle")) != -1) {
		            index += 2;
		        }
		        else if ( (r2=playText.indexOf(" to the right")) != -1) {
		            index += 3;
		        }
                r1 = 0;
                r2 = playText.indexOf(" rush");
                r3 = playText.indexOf("[missed");
                if (r3 != -1) r2 = Math.min(r2,r3);
                s = playText.slice(r1,r2);
	        }

            var playerIndex;
    //        console.log(playText.slice(0,r1) + " -- "+playText.slice(r2));
            if (playerRushingName[current_team] != null) {
                playerIndex = playerRushingName[current_team].indexOf(s);
                if (playerIndex == -1) {
                    playerIndex = playerRushingName[current_team].length;
                    playerRushingName[current_team].push(s);
                    playerRushingStats[current_team].push([0,0,0,0]);
                }
            }
            else {
                playerIndex = 0;
                playerRushingName[current_team] = new Array();
                playerRushingStats[current_team] = new Array();
                playerRushingName[current_team].push(s);
                playerRushingStats[current_team].push([0,0,0,0]);
            }

	        team_att[index] += 1;
	        team_yards[index] += y;
                
            team_quarter_totals[0][0+current_team*6] += 1;
            team_quarter_totals[0][1+current_team*6] += y;
            team_quarter_totals[quarter][0+current_team*6] += 1;
            team_quarter_totals[quarter][1+current_team*6] += y;
                
	        team_att_down[(down-1)+(current_team*4)] += 1;
	        team_yards_down[(down-1)+(current_team*4)] += y;

            playerRushingStats[current_team][playerIndex][0] += 1;
            playerRushingStats[current_team][playerIndex][1] += y;
            playerRushingStats[current_team][playerIndex][2] =
                Math.max(playerRushingStats[current_team][playerIndex][2],y);

	        if (y >= minGain) {
        		team_success[index] += 1;
        		team_success_down[(down-1)+(current_team*4)] += 1;
		
                team_quarter_totals[0][2+current_team*6] += 1;
                team_quarter_totals[quarter][2+current_team*6] += 1;

                playerRushingStats[current_team][playerIndex][3] += 1;
	        }
	    }
	//console.log((down-1)+" "+((down-1)+current_team*4)+" "+downs[down_index].innerHTML+" "+playText);
    }
    else if (playText.indexOf(" pass to ") != -1) {		
    	var index = current_team * 3;
        var dindex;
        
        var p1 = playText.indexOf(" pass to ")+" pass to ".length;
        var p2;
    	if (playText.indexOf(" up the left side") != -1) {
    	    //index += 0;
            dindex = 0;
            p2 = playText.indexOf(" up the left side");
        }
    	else if(playText.indexOf(" over the middle") != -1) {
    	    index += 1;
            dindex = 1;
            p2 = playText.indexOf(" over the middle");
    	}
        else if (playText.indexOf(" up the right side") != -1) {
    	    index += 2;
            dindex = 2;
            p2 = playText.indexOf(" up the right side");
        }

        var d = current_team*9 + dindex*3;
	
        var s = playText.slice(p1,p2);
        var h = s.indexOf(", hurried by");
        if (h != -1) {
            s = s.slice(0,h);
        }

        var playerIndex;	
        if (playerReceivingName[current_team] != null) {
            playerIndex = playerReceivingName[current_team].indexOf(s);
            if (playerIndex == -1) {
                playerIndex = playerReceivingName[current_team].length;
                playerReceivingName[current_team].push(s);
                playerReceivingStats[current_team].push([0,0,0,0,0,0]); //a/c/d/y/l/yac
            }
        }
        else {
            playerIndex = 0;
            playerReceivingName[current_team] = new Array();
            playerReceivingStats[current_team] = new Array();
            playerReceivingName[current_team].push(s);
            playerReceivingStats[current_team].push([0,0,0,0,0,0]);
        }
	
    	if(yt.indexOf(" yd gain") != -1) {
    	    //y = y;
    	}
    	else if(yt.indexOf(" yd loss") != -1) {
    	    y = -y;
    	}
	
    	if (yt.indexOf(" yd return") != -1) {
    	    if (playText.indexOf(" intercepted by ") != -1) {
        		//interceptions are listed in PBP as possessions for the wrong team
		
        		team_pass_att[(index+3)%6] += 1;
        		team_pass_att_down[((down-1)+(current_team*4)+4)%8] += 1;
    		
                team_quarter_totals[0][4+((current_team*6)+6)%12] += 1;
                team_quarter_totals[quarter][4+((current_team*6)+6)%12] += 1;
		
                playerReceivingName[current_team].pop();
                playerReceivingStats[current_team].pop();
                current_team = (current_team+1)%2;                
                if (playerReceivingName[current_team] != null) {
                    playerIndex = playerReceivingName[current_team].indexOf(s);
                    if (playerIndex == -1) {
                        playerIndex = playerReceivingName[current_team].length;
                        playerReceivingName[current_team].push(s);
                        playerReceivingStats[current_team].push([0,1,0,0,0,0]);
                    }
                    else {
                        playerReceivingStats[current_team][playerIndex][1] += 1;
                    }
                }
                else {
                    playerIndex = 0;
                    playerReceivingName[current_team] = new Array();
                    playerReceivingStats[current_team] = new Array();
                    playerReceivingName[current_team].push(s);
                    playerReceivingStats[current_team].push([0,1,0,0,0,0]);
                }
                current_team = (current_team+1)%2;                
	    }
	    else {
		//must have been a fumble here
		//can't include without calculating the position
		//ignoring to be consistent with rushing
                playerReceivingName[current_team].pop();
                playerReceivingStats[current_team].pop();
	    }
	}	
	else if (yt.indexOf("incomplete") != -1) {
	    team_pass_att[index] += 1;
	    team_pass_att_down[(down-1)+(current_team*4)] += 1;
	    
        team_quarter_totals[0][4+current_team*6] += 1;
        team_quarter_totals[quarter][4+current_team*6] += 1;
	    
        playerReceivingStats[current_team][playerIndex][1] += 1;
        if (yt.indexOf("dropped - incomplete") != -1) {
            playerReceivingStats[current_team][playerIndex][2] += 1;
        }
	}
	else {
	    team_pass_comp[index] += 1;
	    team_pass_att[index] += 1;
	    team_pass_yards[index] += y;
   	    
        team_quarter_totals[0][3+current_team*6] += 1;
        team_quarter_totals[0][4+current_team*6] += 1;
        team_quarter_totals[0][5+current_team*6] += y;
        team_quarter_totals[quarter][3+current_team*6] += 1;
        team_quarter_totals[quarter][4+current_team*6] += 1;
        team_quarter_totals[quarter][5+current_team*6] += y;
	    
	    team_pass_att_down[(down-1)+(current_team*4)] += 1;
	    team_pass_comp_down[(down-1)+(current_team*4)] += 1;
	    team_pass_yards_down[(down-1)+(current_team*4)] += y;
	    
        playerReceivingStats[current_team][playerIndex][0] += 1;
        playerReceivingStats[current_team][playerIndex][1] += 1;
        playerReceivingStats[current_team][playerIndex][3] += y;
        playerReceivingStats[current_team][playerIndex][4] =
            Math.max(playerReceivingStats[current_team][playerIndex][4],y);
    
        if (y >= 15) {
            distanceStats[0][d] += 1;
            distanceStats[0][d+1] += 1;
            distanceStats[0][d+2] += y;
        }
        else if (y >= 7.5) {
            distanceStats[1][d] += 1;
            distanceStats[1][d+1] += 1;
            distanceStats[1][d+2] += y;
        }
        else if (y >= 0) {
            distanceStats[2][d] += 1;
            distanceStats[2][d+1] += 1;
            distanceStats[2][d+2] += y;
        }
        else {
            distanceStats[3][d] += 1;
            distanceStats[3][d+1] += 1;
            distanceStats[3][d+2] += y;
        }
	}
	//console.log((down-1)+" "+((down-1)+current_team*4)+" "+downs[down_index].innerHTML+" "+playText);
    }
    else if (startsWith(playText,"Punt by ") == true) {
	//console.log("punt "+playText.slice(0,40));
    	//nothing really to do here
    }
    else if (playText.match(" yd field goal attempted by ") != null) {
	//console.log("fg "+playText.slice(0,40));
    	//nothing really to do here
    }
    else if (playText.match(" sacked by ") != null) {
//    	console.log("sack "+playText.slice(0,40));
    	//nothing really to do here
    	//unless glb counts these as attempts(?)
    }
    else if (startsWith(playText,"Kickoff by ") == true) {
//    	console.log("kickoff "+playText.slice(0,40));
    	down_index--;
    }
    else {
    	//something really wierd
    	console.log("You shouldn't see me, so I'm probably a bug: "+playText);
    }
    down_index++;
    if (down_index >= downs.length) {
	console.log("down_index exceeded. Capping it at max.  (idx="+down_index+", len="+downs.length+")");
	down_index = downs.length-1;
    }
}

var html = "<Table>" +
    "<tr>" +
        "<td>" + getQuarterTable(0,quarter) + "</td>" +
        "<td>" + getQuarterTable(1,quarter) + "</td>" +
    "</tr>";

html += "<br>" + 
    "<tr>" +
        "<td>" + getRushingTable(0) + "</td>" +
        "<td>" + getRushingTable(1) + "</td>" +
    "</tr>" + 
    "<br" + 
    "<tr>" +
        "<td>" + getRushingByDownTable(0) + "</td>" +
        "<td>" + getRushingByDownTable(1) + "</td>" +
    "</tr>" +  
    "<br>" +
    "<tr>" +
        "<td>" + getPassingTable(0) + "</td>" +
        "<td>" + getPassingTable(1) + "</td>" +
    "</tr>" +
    "<br>" +
    "<tr>" +
        "<td>" + getPassingDistanceTable(0) + "</td>" +
        "<td>" + getPassingDistanceTable(1) + "</td>" +
    "</tr>" +
    "<br>" +
    "<tr>" +
        "<td>" + getPassingByDownTable(0) + "</td>" +
        "<td>" + getPassingByDownTable(1) + "</td>" +
    "</tr>";

for (var t=0; t<2; t++) {
    if (playerReceivingStats.length > 0) {
        arrayPairSort([playerReceivingStats,playerReceivingName],[3,0,1]);
    }
    if (playerRushingStats.length > 0) {
        arrayPairSort([playerRushingStats,playerRushingName],[2,1,0]);
    }
}

html +=	"<br>" +
    "<tr valign='top'>" +
        "<td>" + getRushingTargetTable(0,playerRushingName[0]) + "</td>" +
        "<td>" + getRushingTargetTable(1,playerRushingName[1]) + "</td>" +
    "</tr>" +
    "<br>" +
    "<tr valign='top'>" +
        "<td>" + getPassingTargetTable(0,playerReceivingName[0]) + "</td>" +
        "<td>" + getPassingTargetTable(1,playerReceivingName[1]) + "</td>" +
    "</tr>";

html += "</table>";

var scout = document.getElementById('scoreboard');
scout.innerHTML =  scout.innerHTML + "<br><Div id='scoutbox'></div>";
var scout = document.getElementById('scoutbox');
scout.innerHTML = html;

for (var i=0; i<2; i++) {
    //quarter table assignment
    document.getElementById('team'+i+'q').innerHTML = team_name[i] +" Totals By Quarter";
    
    var q=quarter;
    if (quarter != 1) {
	    q++;
    }
    
    for (var x=0; x<q; x++) {
	var idx = i*6;
	document.getElementById("q-"+x+"-0-"+i).innerHTML = team_quarter_totals[x][0+idx];
	document.getElementById("q-"+x+"-1-"+i).innerHTML = team_quarter_totals[x][1+idx];
	var num = Math.round(100*team_quarter_totals[x][1+idx] / team_quarter_totals[x][0+idx]) / 100;
	if (isNaN(num) == true) {
	    num = 0;
	}
	document.getElementById("q-"+x+"-2-"+i).innerHTML = num;
	num = Math.round(100*team_quarter_totals[x][2+idx] / team_quarter_totals[x][0+idx]);
	if (isNaN(num) == true) {
	    num = 0;
	}
	document.getElementById("q-"+x+"-3-"+i).innerHTML = num + "%";
	
	document.getElementById("q-"+x+"-4-"+i).innerHTML = "";
	
	document.getElementById("q-"+x+"-5-"+i).innerHTML = team_quarter_totals[x][3+idx];
	document.getElementById("q-"+x+"-6-"+i).innerHTML = team_quarter_totals[x][4+idx];
	num = Math.round(100*team_quarter_totals[x][3+idx] / team_quarter_totals[x][4+idx]);
	if (isNaN(num) == true) {
	    num = 0;
	}
	document.getElementById("q-"+x+"-7-"+i).innerHTML = num + "%";
	document.getElementById("q-"+x+"-8-"+i).innerHTML = team_quarter_totals[x][5+idx];
    }
    //end quarter table assignment
    
    //rushing table assignment	
    document.getElementById('team'+i+'r').innerHTML = team_name[i] +" Rushing Direction";
    for (x=0; x<5; x++) {
	var idx = i*5;
	document.getElementById("r-"+x+"-0-"+i).innerHTML = team_att[x+idx];
	document.getElementById("r-"+x+"-1-"+i).innerHTML = team_yards[x+idx];
	num = Math.round(100*team_yards[x+idx] / team_att[x+idx])/100;   
	if (isNaN(num) == true) {
	    num = 0;
	}
	document.getElementById("r-"+x+"-2-"+i).innerHTML = num;
	num = Math.round(100*team_success[x+idx] / team_att[x+idx]);   
	if (isNaN(num) == true) {
	    num = 0;
	}
	document.getElementById("r-"+x+"-3-"+i).innerHTML = num + "%";
    }
    //end rushing table assignment

    //rushing by down table assignment	
    document.getElementById('team'+i+'rbd').innerHTML = team_name[i] +" Rushing By Down";
    for (x=0; x<4; x++) {
	var idx = i*4;
	document.getElementById("rbd-"+x+"-0-"+i).innerHTML = team_att_down[x+idx];
	document.getElementById("rbd-"+x+"-1-"+i).innerHTML = team_yards_down[x+idx];
	num = Math.round(100*team_yards_down[x+idx] / team_att_down[x+idx])/100;   
	if (isNaN(num) == true) {
	    num = 0;
	}
	document.getElementById("rbd-"+x+"-2-"+i).innerHTML = num;
	num = Math.round(100*team_success_down[x+idx] / team_att_down[x+idx]);   
	if (isNaN(num) == true) {
	    num = 0;
	}
	document.getElementById("rbd-"+x+"-3-"+i).innerHTML = num + "%";
    }
    //end rushing by down table assignment

    //passing table assignment	
    document.getElementById('team'+i+'p').innerHTML = team_name[i] +" Passing Direction";
    for (x=0; x<3; x++) {
	var idx = i*3;
	document.getElementById("p-"+x+"-0-"+i).innerHTML = team_pass_comp[x+idx];
	document.getElementById("p-"+x+"-1-"+i).innerHTML = team_pass_att[x+idx];
	num = Math.round(100*team_pass_comp[x+idx] / team_pass_att[x+idx]);
	if (isNaN(num) == true) {
	    num = 0;
	}
	document.getElementById("p-"+x+"-2-"+i).innerHTML = num + "%";
	document.getElementById("p-"+x+"-3-"+i).innerHTML = team_pass_yards[x+idx];
    }
    //end passing table assignment
    
    
    //passing by down table assignment	
    document.getElementById('team'+i+'pbd').innerHTML = team_name[i] +" Passing By Down";
    for (x=0; x<4; x++) {
	var idx = i*4;
	document.getElementById("pbd-"+x+"-0-"+i).innerHTML = team_pass_comp_down[x+idx];
	document.getElementById("pbd-"+x+"-1-"+i).innerHTML = team_pass_att_down[x+idx];
	num = Math.round(100*team_pass_comp_down[x+idx] / team_pass_att_down[x+idx]);
	if (isNaN(num) == true) {
	    num = 0;
	}
	document.getElementById("pbd-"+x+"-2-"+i).innerHTML = num + "%";
	document.getElementById("pbd-"+x+"-3-"+i).innerHTML = team_pass_yards_down[x+idx];
    }
    //end passing by down table assignment

    //distance table assignment
    document.getElementById("team"+i+"pd").innerHTML = team_name[i] +" Passing Distance";
    for (x=0; x<3; x++) {
	var idx = x*3 + i*9;
	document.getElementById("pd-"+x+"-0-"+i).innerHTML = distanceStats[0][idx]+" for "+distanceStats[0][idx+2];
	document.getElementById("pd-"+x+"-1-"+i).innerHTML = distanceStats[1][idx]+" for "+distanceStats[1][idx+2];
	document.getElementById("pd-"+x+"-2-"+i).innerHTML = distanceStats[2][idx]+" for "+distanceStats[2][idx+2];
	document.getElementById("pd-"+x+"-3-"+i).innerHTML = distanceStats[3][idx]+" for "+distanceStats[3][idx+2];
    }

    for (var x=0; x<4; x++) {
        var idx = i*9;
        var n = (distanceStats[x][idx]  +distanceStats[x][idx+3]+distanceStats[x][idx+6]) 
	        + " for " +
                (distanceStats[x][idx+2]+distanceStats[x][idx+5]+distanceStats[x][idx+8]);

        document.getElementById("pd-3-"+x+"-"+i).innerHTML = n;
    }

    for (var x=0; x<3; x++) {
        var idx = i*9;
        var n = (distanceStats[0][x*3+idx]   +distanceStats[1][x*3+idx] +
                 distanceStats[2][x*3+idx]   +distanceStats[3][x*3+idx]) + " for " +

                (distanceStats[0][x*3+idx+2] +distanceStats[1][x*3+idx+2] +
                 distanceStats[2][x*3+idx+2] +distanceStats[3][x*3+idx+2]);

        document.getElementById("pd-"+x+"-4-"+i).innerHTML = n;
    }
    document.getElementById("pd-3-4-"+i).innerHTML = "";
    //distance table assignment

    if (playerReceivingName[i] != null) {
        //passing target table assignment
        document.getElementById('team'+i+"tp").innerHTML = team_name[i] +" Receivers";
        for (x=0; x<playerReceivingName[i].length; x++) {
	        document.getElementById("tp-0-"+x+"-"+i).innerHTML = playerReceivingStats[i][x][1];
	        document.getElementById("tp-1-"+x+"-"+i).innerHTML = playerReceivingStats[i][x][0];
	        document.getElementById("tp-2-"+x+"-"+i).innerHTML = playerReceivingStats[i][x][2];
	
	        num = Math.round(100*playerReceivingStats[i][x][0] / playerReceivingStats[i][x][1]);
	        if (isNaN(num) == true) {
	            num = 0;
	        }
	        document.getElementById("tp-3-"+x+"-"+i).innerHTML = num + "%";
	
	        document.getElementById("tp-4-"+x+"-"+i).innerHTML = playerReceivingStats[i][x][3];
	        document.getElementById("tp-5-"+x+"-"+i).innerHTML = playerReceivingStats[i][x][5];;
	        document.getElementById("tp-6-"+x+"-"+i).innerHTML = playerReceivingStats[i][x][4];
        }
        //passing target table assignment end
    }
	
    if (playerRushingName[i] != null) {
        //rushing target table assignment
        document.getElementById('team'+i+"tr").innerHTML = team_name[i] +" Runners";
        for (x=0; x<playerRushingName[i].length; x++) {
	        document.getElementById("tr-0-"+x+"-"+i).innerHTML = playerRushingStats[i][x][0];
	        document.getElementById("tr-1-"+x+"-"+i).innerHTML = playerRushingStats[i][x][1];
	
	        num = Math.round(100*playerRushingStats[i][x][1] / playerRushingStats[i][x][0]) / 100;
	        if (isNaN(num) == true) {
	            num = 0;
	        }
	        document.getElementById("tr-2-"+x+"-"+i).innerHTML = num;
	
	        document.getElementById("tr-3-"+x+"-"+i).innerHTML = playerRushingStats[i][x][2];
	        num = Math.round(100*playerRushingStats[i][x][3] / playerRushingStats[i][x][0]);
	        if (isNaN(num) == true) {
	            num = 0;
	        }
	        document.getElementById("tr-4-"+x+"-"+i).innerHTML = num + "%";
        }
        //rushing target table assignment end
    }
    
	
}

}, 100);

