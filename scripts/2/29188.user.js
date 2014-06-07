// ==UserScript==
// @name           NevScouter
// @namespace      http://goallineblitz.com
// @description    Nevstar's modifications to pbr scout
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// ==/UserScript==


/*
 *
 * based on code by tciss(?) from www.goallineblitz.com
 * pabst modified it 6/22/08
 * Nevstar modified it even more on 6/26/08
 */

var DEBUG_QTR = 0;
var DEBUG_DOWN = -1;

window.setTimeout( function()
{

function startsWith(word, base) {
    if (word.substring(0,base.length) == base) return true;
    return false;
}

function getQuarterTable(index, length) {
    var title = "Quarter";
    var columns = ["Total","1st","2nd","3rd","4th","5th"];
    var rows = ["Rush Att","Rush Yards","Yards / Att","Success Rate", "20+",
      " ","Pass Comp","Pass Att", "Comp. Pct","Yards","Yards / Att", "Yards / Comp", "20+",
	" ","Rush Frequency", "Total Plays", "Total Yards", "Avg"];

    var c;
    if (length == 1) c = new Array(length);
    else c = new Array(length+1);

    for (var i=0; i<c.length; i++) {
        c[i] = columns[i];
    }
    return getTable(title,rows,c,index,"q");   
}

function getRushingTable(index) {
    var title = "Rushing";
    var columns = ["Far Left","Left","Middle","Right","Far Right"];
    var rows = ["Attempts","Yards","Yards / Att","Success Rate", "20+"];

    return getTable(title,rows,columns,index,"r");   
}

function getPassingTable(index) {
    var title = "Passing";
    var columns = ["Left","Middle","Right"];
    var rows = ["Completions","Attempts","Comp. Pct","Yards", "Yards / Att", "Yards / Comp", "20+"];

    return getTable(title,rows, columns,index,"p");   
}

function getRushingByDownTable(index) {
    var title = "Rushing By Down";
    var columns = ["First","Second","Third","Fourth"];
    var rows = ["Attempts","Yards","Yards / Att","Success Rate", "Rushing Frequency", "20+"];

    return getTable(title,rows,columns,index,"rbd");   
}

function getPassingByDownTable(index) {
    var title = "Passing By Down";
    var columns = ["First","Second","Third","Fourth"];
    var rows = ["Completions","Attempts","Comp. Pct","Yards", "Yards / Att", "Yards / Comp", "20+"];

    return getTable(title,rows,columns,index,"pbd");   
}

function getReceiversDetails(index) {
//getTable() format doesn't work, so let's write it manually
	var title = "Receivers Details";
	var prefix = "rec";
    var output;   
    output  = "<Table cellspacing=0 style='width: 400px;' border='1' id='scout-"+title+"-table"+index+"'>";
    output += "<tr class='nonalternating_color pbp_pbr_title'><td id='team"+index+""+prefix+"' colspan='7' align='center'>"+title+"</td></tr>";
   
    output += "<tr class='nonalternating_color2 pbp_pbr_title'>";

	var columns = ["Name", "Thrown To", "Completed", "Yards"];
    for (var i=0; i<columns.length; i++) {
        output += "<td align='center'>"+columns[i]+"</td>";
    }
    output += "</tr>";
   
    for (var y=15*index; y<15+15*index; y++) {
	if (receivers[0][y] != "-1")
	{
        output += "<tr class='alternating_color"+(y%2+1)+" pbp_pbr_title_row'><td>"+receivers[0][y]+"</td>";
        for (var x=1; x<columns.length; x++) {
            output += "<td align='center'>"+receivers[x][y]+"</td>";
        }
        output += "</tr>";
	}
    }
    output += "</table>";
   
    return output;
}

function getTable(title, rows, columns, index, prefix) {
    var output;   
    output  = "<Table cellspacing=0 style='width: 400px;' border='1' id='scout-"+title+"-table"+index+"'>";
    output += "<tr class='nonalternating_color pbp_pbr_title'><td id='team"+index+""+prefix+"' colspan='7' align='center'>"+title+"</td></tr>";
   
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

function getElementsByClassName(classname, par)
{
    var a=[];  
    var re = new RegExp('\\b' + classname + '\\b');
       
    var els = par.getElementsByTagName("*");
 
    for(var i=0, j=els.length; i<j; i++)
    {      
        if(re.test(els[i].className))
        {   
            a.push(els[i]);
        }
    }
   

    return a;
};

function findReceiver(recName, receivers)
{
	for(var i = 0; i < 30; i++)
	{
		if (recName == receivers[0][i])
			return i;
	}
	return -1;
}

function firstAvailableReceiver(current_team)
{
	for (var i = current_team*15; i < current_team*15+15; i++)
	{
console.log(receivers[0][i] + " " + receivers[1][i]);
		if (receivers[0][i] == "-1")
		{
			receivers[1][i] = 0;
			receivers[2][i] = 0;
			receivers[3][i] = 0;
			receivers[4][i] = 0;
			return i;
		}
	}
	return -1;
}
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
    team_quarter_totals[i] = new Array(12);
}
for (var i=0; i<12; i++) {
    for (var q=0; q<6; q++) {
        team_quarter_totals[q][i] = 0;
    }
}
var twentyplus_qtr = new Array(20);
var twentyplus_dir = new Array(16);
var twentyplus_down = new Array(16);

for (var i=0; i<20; i++)
	twentyplus_qtr[i] = 0;

for (var i=0; i<16; i++)
{
	twentyplus_dir[i] = 0; twentyplus_down[i] = 0;
}
//twentyplus_qtr[0]: team 1, all running twentyplus_qtr[9]: team 2, qtr 4 running
//twentyplus_qtr[10]: team 1, all passing...

//receivers[receiver][index]
//receiver
// team 2 starts at 15
//index
// 0 - name
// 1 - thrown to
// 2 - caught
// 3 - yards
// 4 - "tough catch"  -- catch made after deflection


var receivers = new Array(30);
for (var i=0; i<30; i++) {
	receivers[i] = new Array(5);
}

for (var i=0; i<5; i++)
{
	for (var j=0; j<30; j++) {
		if (i == 0)
			receivers[i][j] = "-1";
		else
			receivers[i][j] = 0;
	}
}
/**
*	team_quarter_totals[0][0] = whole game / team 1, rushing plays
*     team_quarter_totals[1][1] = 1st quarter / team 1, rushing yards
*	team_quarter_totals[2][2] = 2nd quarter / team 1, rushing success plays
*	team_quarter_totals[3][3] = 3rd quarter / team 1, passing attempts
*	team_quarter_totals[4][4] = 4th quarter / team 1, passing completions
*	team_quarter_totals[4][5] = 4th quarter / team 1, passing yards
*	team_quarter_totals[4][6] = 4th quarter / team 2, rushing plays
*	etc.
**/

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

    if (times[pidx].innerHTML == "15:00") {
        quarter++;
    }
    var play_container = document.getElementById("play_"+current_play);
    var play = plays[pidx];
    var scoreToAdd = 0;
    var playText = play.innerHTML;


    if (play_container.innerHTML.indexOf(team_name[0])!=-1)
    {
        if (play_container.innerHTML.indexOf(team_name[1])!=-1) {
            //can't change current team  if it has both
            //because of watch_game_score script
        }
        else {
            current_team = 0;   
        }
    }
    else if (play_container.innerHTML.indexOf(team_name[1])!=-1)
    {
        if (play_container.innerHTML.indexOf(team_name[0])!=-1) {
            //can't change current team  if it has both
            //because of watch_game_score script
        }
        else {
            current_team = 1;
        }
    }
    else
    {
//        console.log(play_container.innerHTML);
    }

    var downText = downs[down_index].innerHTML;
    var down = -1;
    var togo = -1;
    var minGain = -1;

    try {
        down = parseFloat(downText);
        try {
            if (downText.match(' G') == null) {
                togo = parseFloat(downText.slice(10));
            }
            else if (downText.match(' inches') == null) {
                togo = 0.5;
            }
            else {
                togo = parseFloat(markers[down_index].innerHTML.slice(4));
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
        }
        while (isNaN(y) == true);
    }
    catch (error) {
        console.log(error);
    }
    if (quarter == DEBUG_QTR || down_index == DEBUG_DOWN)
       console.log(down_index+"/"+downs.length+" down="+down+"\tarr[d]="+((down-1)+current_team*4)+"\tdowntxt="+downs[down_index].innerHTML+" - "+playText);

    if ((playText.match(" rush") != null) || (playText.match(" pitch to ") != null)) {
   
//        if (quarter == DEBUG_QTR || down_index == DEBUG_DOWN)
//               console.log("rush "+playText.slice(0,20));
   
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
       
        if(isNaN(y) || yt.indexOf(" yd return") != -1) {
            //must have been a fumble here
            //can't include without calculating the position
            //and still won't know the direction of the run
        }   
        else {
            // 0 - 1 - 2 - 3 - 4
            var index = current_team * 5;
            if (inside == false) {
                if (playText.indexOf(" to the left") != -1) {
                    //index += 0;
                }
                else if(playText.indexOf(" up the middle") != -1) {
                    // sometimes outside runs get stuffed immediately, so
                    // I'm just calling it a middle run regardless
                    index += 2;
                }
                else if (playText.indexOf(" to the right") != -1) {
                       index += 4;
                }
            }
            else {
                if (playText.indexOf(" to the left") != -1) {
                    index += 1;
                }
                else if(playText.indexOf(" up the middle") != -1) {
                    index += 2;
                }
                else if (playText.indexOf(" to the right") != -1) {
                       index += 3;
                }
            }

            if (quarter == DEBUG_QTR || down_index == DEBUG_DOWN)
                console.log("Run Index: "  + index + "Yards: " + y);
               team_att[index] += 1;
               team_yards[index] += y;
                       
            team_quarter_totals[0][0+current_team*6] += 1;
            team_quarter_totals[0][1+current_team*6] += y;
            team_quarter_totals[quarter][0+current_team*6] += 1;
            team_quarter_totals[quarter][1+current_team*6] += y;
           
               team_att_down[(down-1)+(current_team*4)] += 1;
               team_yards_down[(down-1)+(current_team*4)] += y;
                  
               if (y >= minGain) {
                   team_success[index] += 1;
                   team_success_down[(down-1)+(current_team*4)] += 1;

                team_quarter_totals[0][2+current_team*6] += 1;
                team_quarter_totals[quarter][2+current_team*6] += 1;
               }

		   if (y >= 20) {
			twentyplus_qtr[0+current_team*5]++;
			twentyplus_qtr[quarter+current_team*5]++;
			twentyplus_dir[index]++;
			twentyplus_down[(down-1)+current_team*4]++;
		   }
        }
    }
    else if (playText.indexOf(" pass to ") != -1) {
          
	var nBegin = playText.indexOf(" pass to ") + 9;
	
        var index = current_team * 3;
	var recName = "-1";
        if (playText.indexOf(" up the left side") != -1) {
            //index += 0;
		recName = playText.substring(nBegin, playText.indexOf(" up the left side"));
           }
        else if(playText.indexOf(" over the middle") != -1) {
            index += 1;
		recName = playText.substring(nBegin, playText.indexOf(" over the middle"));

        }
        else if (playText.indexOf(" up the right side") != -1) {
              index += 2;
		recName = playText.substring(nBegin, playText.indexOf(" up the right side"));
        }
	var nSearch = recName.indexOf(", hurried by ");
	  if (nSearch > -1)
		recName = recName.substring(0,nSearch);

        if(yt.indexOf(" yd gain") != -1) {
            //y = y;
        }
        else if(yt.indexOf(" yd loss") != -1) {
            y = -y;
        }

	//receiver
	var recIndex = findReceiver(recName, receivers);
  	    if (quarter == DEBUG_QTR || down_index == DEBUG_DOWN)
               console.log(yt)  
           
        if (yt.indexOf(" yd return") != -1 || yt.indexOf("touchback") != -1) {
            if (playText.indexOf(" intercepted by ") != -1) {
                //interceptions are listed in PBP as possessions for the wrong team
//	    if (quarter == DEBUG_QTR || down_index == DEBUG_DOWN)
//               console.log("INTERCEPTION DETECTED")
                   team_pass_att[(index+3)%6] += 1;
                   team_pass_att_down[((down-1)+(current_team*4)+4)%8] += 1;

                team_quarter_totals[0][4+((current_team*6)+6)%12] += 1;
                team_quarter_totals[quarter][4+((current_team*6)+6)%12] += 1;
			if (recIndex == -1)
			{  //create new receiver
				recIndex = firstAvailableReceiver((current_team+1) %2);
				receivers[0][recIndex] = recName;
			}
			receivers[1][recIndex]++;
            }
            else {
                //must have been a fumble here
                //can't include without calculating the position
                //ignoring to be consistent with rushing
            }
        }   
        else if (yt.indexOf("incomplete") != -1) {
               team_pass_att[index] += 1;
               team_pass_att_down[(down-1)+(current_team*4)] += 1;

            team_quarter_totals[0][4+current_team*6] += 1;
            team_quarter_totals[quarter][4+current_team*6] += 1;
		if (recIndex == -1)
		{  //create new receiver
			recIndex = firstAvailableReceiver(current_team);
			receivers[0][recIndex] = recName;
		}
		receivers[1][recIndex]++;
        }
        else {  //complete
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

		if (recIndex == -1)
		{  //create new receiver
			recIndex = firstAvailableReceiver(current_team);
			receivers[0][recIndex] = recName;
		}
		receivers[1][recIndex]++;
		receivers[2][recIndex]++;
		receivers[3][recIndex]+=y;

console.log("RecIndex:"+recIndex + "(Target, Caught)" + receivers[1][recIndex] + " " + receivers[2][recIndex]);
		if (y >= 20) {

			twentyplus_qtr[10+0+current_team*5]++;
			twentyplus_qtr[10+quarter+current_team*5]++;
			twentyplus_dir[10+index]++;
			twentyplus_down[8+(down-1)+current_team*4]++;
		}
        }
	    if (quarter == DEBUG_QTR || down_index == DEBUG_DOWN)
		{
      	console.log((down-1)+" "+((down-1)+current_team*4)+" "+downs[down_index].innerHTML+" "+playText);
		console.log("Pass Index:" + index + " Yards?:"+y);
		}
    }
    else if (startsWith(playText,"Punt by ") == true) {
//        console.log("punt "+playText.slice(0,40));
        //nothing really to do here
    }
    else if (playText.match(" yd field goal attempted by ") != null) {
//        console.log("fg "+playText.slice(0,40));
        //nothing really to do here
    }
    else if (playText.match(" sacked by ") != null) {
//        console.log("sack "+playText.slice(0,40));
        //nothing really to do here
        //unless glb counts these as attempts(?)
    }
    else if (startsWith(playText,"Kickoff by ") == true) {
//        console.log("kickoff "+playText.slice(0,40));
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

var html =  "<Table>" +
                "<tr>" +
                    "<td>" + getQuarterTable(0,quarter) + "</td>" +
                    "<td>" + getQuarterTable(1,quarter) + "</td>" +
                "</tr>";

html +=             "<br>" +
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
                           "<td>" + getPassingByDownTable(0) + "</td>" +
                           "<td>" + getPassingByDownTable(1) + "</td>" +
                    "</tr>" +
                    "</tr>" +
                    "<br>" +
                    "<tr>" +
                           "<td>" + getReceiversDetails(0) + "</td>" +
                           "<td>" + getReceiversDetails(1) + "</td>" +
                    "</tr>" +

                    "</table>";

var scout = document.getElementById('scoreboard');
scout.innerHTML =  scout.innerHTML + "<br><Div id='scoutbox'></div>";
var scout = document.getElementById('scoutbox');
scout.innerHTML = html;

for (i=0; i<2; i++) {

    //quarter table assignment
    document.getElementById('team'+i+'q').innerHTML = team_name[i] +" Totals By Quarter";

    var q=quarter;

    if (quarter != 1) {
        q++;
    }

    for (var x=0; x<q; x++) {
        var idx = i*6;
	  var nRow = -1;
        document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = team_quarter_totals[x][0+idx];
        document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = team_quarter_totals[x][1+idx];
        var num = Math.round(100*team_quarter_totals[x][1+idx] / team_quarter_totals[x][0+idx]) / 100;
        if (isNaN(num) == true) {
            num = 0;
        }
        document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = num;
        num = Math.round(100*team_quarter_totals[x][2+idx] / team_quarter_totals[x][0+idx]);
        if (isNaN(num) == true) {
            num = 0;
        }
        document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = num + "%";

	//20+ runs
	  document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = twentyplus_qtr[i*5+x];

	//end run - blanks
        document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = "";

        document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = team_quarter_totals[x][3+idx];
        document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = team_quarter_totals[x][4+idx];
        num = Math.round(100*team_quarter_totals[x][3+idx] / team_quarter_totals[x][4+idx]);
        if (isNaN(num) == true) {
            num = 0;
        }
        document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = num + "%";
        document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = team_quarter_totals[x][5+idx];

	//new data - nev

	//yards / att
	num = Math.round(100*team_quarter_totals[x][5+idx] / team_quarter_totals[x][4+idx])/100;
	if (isNaN(num) == true) {
		num = 0;
	}
	 document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = num;
	
	//yards / comp
	num = Math.round(100*team_quarter_totals[x][5+idx] / team_quarter_totals[x][3+idx])/100;
	if (isNaN(num) == true) {
		num = 0;
	}
	 document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = num;

	//20+ passing
	 document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = twentyplus_qtr[i*5+10+x];


	//blank
	 document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = "" ;

	//Rush Frequency
	num = Math.round(100*team_quarter_totals[x][0+idx] / (team_quarter_totals[x][0+idx] + team_quarter_totals[x][4+idx]));
	if (isNaN(num) == true) {
		num = 0;
	}
	 document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = num+"%";

	//Total Plays
	var plays = team_quarter_totals[x][0+idx] + team_quarter_totals[x][4+idx];
	 document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = plays;

	//Total Yards
	var yds = team_quarter_totals[x][1+idx] + team_quarter_totals[x][5+idx];
	 document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = yds;

	//Avg
      num = Math.round(100*yds/plays)/100;
	if (isNaN(num) == true) {
		num = 0;
	}
	 document.getElementById("q-"+x+"-"+(++nRow)+"-"+i).innerHTML = num;


    }
    //end quarter table assignment

    //rushing table assignment   

    document.getElementById('team'+i+'r').innerHTML = team_name[i] +" Rushing Direction";
	var totalRushingAtt = 0;
	for (x=0; x < 5; x++)
		totalRushingAtt += team_att[x+i*5];

    for (x=0; x<5; x++) {
        var idx = i*5;

	num = Math.round(100*team_att[x+idx] / totalRushingAtt); 
	if (isNaN(num) == true) {
		num = 0;
	} 
        document.getElementById("r-"+x+"-0-"+i).innerHTML = team_att[x+idx] + " (" + num + "%)";
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

        document.getElementById("r-"+x+"-4-"+i).innerHTML = twentyplus_dir[x+idx];

    }
    //end rushing table assignment
   
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

        num = Math.round(100*team_pass_yards[x+idx] / team_pass_att[x+idx])/100;
        if (isNaN(num) == true) {
            num = 0;
        }
        document.getElementById("p-"+x+"-4-"+i).innerHTML = num;

        num = Math.round(100*team_pass_yards[x+idx] / team_pass_comp[x+idx])/100;
        if (isNaN(num) == true) {
            num = 0;
        }
        document.getElementById("p-"+x+"-5-"+i).innerHTML = num;
	
        document.getElementById("p-"+x+"-6-"+i).innerHTML = twentyplus_dir[10+x+idx];
    }
    //end passing table assignment
   
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

        num = Math.round(100*team_att_down[x+idx] / (team_att_down[x+idx]+team_pass_att_down[x+idx]));  
        if (isNaN(num) == true) {
            num = 0;
        }
        document.getElementById("rbd-"+x+"-4-"+i).innerHTML = num + "%";

        document.getElementById("rbd-"+x+"-5-"+i).innerHTML = twentyplus_down[x+idx];

    }
    //end rushing by down table assignment
   
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

        num = Math.round(100*team_pass_yards_down[x+idx] / team_pass_att_down[x+idx])/100;
        if (isNaN(num) == true) {
            num = 0;
        }
        document.getElementById("pbd-"+x+"-4-"+i).innerHTML = num;

        num = Math.round(100*team_pass_yards_down[x+idx] / team_pass_comp_down[x+idx])/100;
        if (isNaN(num) == true) {
            num = 0;
        }
        document.getElementById("pbd-"+x+"-5-"+i).innerHTML = num;

        document.getElementById("pbd-"+x+"-6-"+i).innerHTML = twentyplus_down[8+x+idx];
    }
    //end passing by down table assignment

}


}, 100);
