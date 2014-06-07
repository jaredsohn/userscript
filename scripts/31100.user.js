// ==UserScript==
// @name           pbr Game Scout
// @description    modification of tciss(?)'s game scout script for GoalLineBlitz.com
// @namespace      http://goallinebliz.com
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp&quarter=*
// @include        http://216.245.193.2/game/game.pl?game_id=*&mode=pbp
// @include        http://216.245.193.2/game/game.pl?game_id=*&mode=pbp&quarter=*
// @version        08.07.14

/*
 *
 * based on code by tciss from www.goallineblitz.com
 * pabst modified it 6/22/08+
 *
 */

try {
    var browser = navigator.userAgent;
    if ((browser.indexOf("Firefox\/3") == -1) &&
        (browser.indexOf("Iceweasel\/3") == -1) &&   
        (browser.indexOf("Minefield\/3") == -1) &&   
        (browser.indexOf("Minefield\/4") == -1)) {   
	    throw new Error("Firefox version error");
    }
}
catch (err) {
      alert("You are using "+browser+"\n\nGameScout requires Firefox3.  "+
            "Upgrade your browser or download an older version of the script.");
}

window.setTimeout( function() {

// ------------ start box score loading ------------------------

var playerLinks = [];

function fix(str) {
    var s = str;
    while (s.indexOf('"') != -1) {
	s = s.replace('"',"&quot;");
    }
    while (s.indexOf("'") != -1) {
	s = s.replace("'","&#39;");
    }
    return s;
}

function modifyTables() {
    var nodes = document.getElementsByClassName("pbp_pbr_title_row");
    for (var i=0;i<nodes.length; i++) {
	var rowName = nodes[i].firstChild.innerHTML;
	rowName = fix(rowName);
	for each (var p in playerLinks) {
	    if (trim(rowName).length == 0) continue;
	    
	    if (p.indexOf(">"+rowName+"<") != -1) {
		nodes[i].firstChild.innerHTML = p;
	    }
	}
    }
}

function parsePlayerFromHTML(text) {
    var header = "<td class=\"box_score_player_stat_name\">";

    var t = text;
    var i=-1;
    while ( (i=t.indexOf(header)) != -1) {
	t = t.slice(i+header.length);
	if (t.indexOf("<span") != 0) {
	    continue;
	}
	var end = t.indexOf("</td");
	playerLinks.push(t.slice(0,end));
	t = t.slice(end+1);
    }
    
    modifyTables();
}

function getPage(address) {
    GM_xmlhttpRequest({
        method: 'GET',
	    url: address,
	       headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
		    'Accept': 'text/xml'
		    },
		onload: function(page) { 
		if (page.status != 200) {
		    console.log("Error "+page.status+" loading "+address);;
		}
		else {
		    console.log("page received");
		    parsePlayerFromHTML(page.responseText);
		    console.log("modification done");
		}
            }
        });
};

function trim(str) {
    var s = str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    return s.replace(/\n/," ");
}

// ------------ end box score loading ------------------------



// ---------------------------------------------------------------------
    var team_name = [];
    var team_possession = [0,0,0,0,0,0,0,0,0,0,0,0];
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

    var playerDefensiveName = new Array();
    var playerDefensiveStats = new Array(); //[tot,rtack,rmiss,ptack,pmiss,sttack,stmiss]

    var playerKickingName = new Array();
    var playerKickingStats = new Array();
    var playerPuntingName = new Array();
    var playerPuntingStats = new Array();

    var playerKickReturnStats = new Array();
    var playerKickReturnName = new Array();
    var playerPuntReturnStats = new Array();
    var playerPuntReturnName = new Array();

    var distanceStats = new Array(4);
    for (var i=0; i<4; i++) {
        distanceStats[i]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //>0cay - >5cay - >15cay
        distanceStats[i]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        distanceStats[i]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        distanceStats[i]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }

// ---------------------------------------------------------------------

    function startsWith(word, base) {
	if (word.length < base.length) return false;
	for (var i=0; i<base.length; i++) {
	    if (word[i] != base[i]) {
		console.log("'"+base[i]+"' '"+word[i]+"' "+word);
		return false;
	    }
	}
	return true;
    }

    function arrayPairSort(arrays, idx) {    
        if (arrays == null) return;
        if (arrays[0] == null) return;
        if (arrays[0].length < 2) return;
        var sortable = arrays[0];
        var sibling = arrays[1];
        for each (passes in idx) {
            for (var i=0; i<sortable.length-1; i++) {
                for (var j=i+1; j<sortable.length; j++) {
                    if (sortable[i][passes] < sortable[j][passes]) {
                        var temp = sortable[i];
                        sortable[i] = sortable[j];
                        sortable[j] = temp;

                        temp = sibling[i];
                        sibling[i] = sibling[j];
                        sibling[j] = temp;
                    } 

                }
            }
        }
    }

    function arrayPush(ct, arr1, data1, arr2, data2) {
	var index = -1;
	if (arr1[ct] != null) {
	    index = arr1[ct].indexOf(data1);
	    if (index == -1) {
		index = arr1[ct].length;
		arr1[ct].push(data1);
		arr2[ct].push(data2);
	    }
	}
	else {
	    index = 0;
	    arr1[ct] = new Array();
	    arr2[ct] = new Array();
	    arr1[ct].push(data1);
	    arr2[ct].push(data2);
	}
	return index;
    }


    function getQuarterTable(index, length) {
	    var title = "Quarter";
	    var columns = ["Total","1st","2nd","3rd","4th","OT"];
	    var rows = ["Time of Poss.", "Plays", "Yards", "Yards / Play", " ", "Rush Att","Rush Yards","Yards / Att","Success Rate"," ","Pass Comp","Pass Att", "Comp. Pct","Pass Yards"];

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
	    var columns = ["Att","Comp","Drop","Pct.","Yards","YPC","Long"];

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

    function getDefenseTable(index, rows) {
	var title = "Defenders";
	var columns = ["Tackles","Missed","Rush","Miss","Pass","Miss"];

        var r = rows;
        if (rows == null) r = [];
        else if (rows.length == 0) r = []; 
	    return getTable(title,r,columns,index,"d");	
    }

    function getKickingTable(index, rows) {
	var title = "Kicking";
	var columns = ["Kickoffs","Yards","Avg","Long","Touchbacks"];

        var r = rows;
        if (rows == null) r = [];
        else if (rows.length == 0) r = [];
	    return getTable(title,r,columns,index,"k");	
    }

    function getPuntingTable(index, rows) {
	var title = "Punting";
	var columns = ["Punts","Yards","Avg","Long","Touchbacks"];

        var r = rows;
        if (rows == null) r = [];
        else if (rows.length == 0) r = [];
	    return getTable(title,r,columns,index,"pu");	
    }

    function getPuntReturnTable(index, rows) {
	var title = "Punt Returns";
	var columns = ["Returns","Yards","Avg","Long"];

        var r = rows;
        if (rows == null) r = [];
        else if (rows.length == 0) r = [];
	    return getTable(title,r,columns,index,"pr");	
    }

    function getKickReturnTable(index, rows) {
	var title = "Kick Returns";
	var columns = ["Returns","Yards","Avg","Long"];

        var r = rows;
        if (rows == null) r = [];
        else if (rows.length == 0) r = [];
	    return getTable(title,r,columns,index,"kr");	
    }

    function getSTDefenseTable(index, rows) {
	var title = "Defenders";
	var columns = ["Tackles","Missed"];

        var r = rows;
        if (rows == null) r = [];
        else if (rows.length == 0) r = []; 
	    return getTable(title,r,columns,index,"std");	
    }

    function getTable(title, rows, columns, index, prefix) {
	var t = document.createElement("table");
	t.setAttribute("border","1");
	t.setAttribute("cellspacing","0");
	t.setAttribute('style','width: 450px');
	t.setAttribute('id','scout-'+prefix+""+index+'-table');

	var tr = document.createElement("tr");
	tr.setAttribute('class','nonalternating_color pbp_pbr_title');

	var td = document.createElement("td");
	td.setAttribute('id','team'+index+""+prefix);
	td.setAttribute('colspan','9');
	td.setAttribute('align','center');
	td.appendChild(document.createTextNode(title));
	tr.appendChild(td);
	t.appendChild(tr);

	var tr2 = document.createElement("tr");
	tr2.setAttribute('class','nonalternating_color2 pbp_pbr_title');
	tr2.appendChild(document.createElement("td"));
	for (var x=0; x<columns.length; x++) {
	    var colname = document.createElement("td");
	    colname.setAttribute('align','center');
	    colname.appendChild(document.createTextNode(columns[x]));
	    tr2.appendChild(colname);
	}
	t.appendChild(tr2);

	for (var y=0; y<rows.length; y++) {
	    var tr3 = document.createElement("tr");
	    tr3.setAttribute('class','alternating_color'+(y%2+1)+' pbp_pbr_title_row');
	    var rowname = document.createElement("td");
	    rowname.appendChild(document.createTextNode(rows[y]));
	    tr3.appendChild(rowname);
	    for (var x=0; x<columns.length; x++) {
		var stat = document.createElement("td");
		stat.setAttribute('id',prefix+'-'+x+'-'+y+'-'+index);
		stat.setAttribute('align','center');
		stat.appendChild(document.createTextNode('('+x+','+y+')'));
		tr3.appendChild(stat);
	    }
	    t.appendChild(tr3);
	}
	return t;
    }

    function getDriveTable(idx,arr) {
	var columns = ["Start Time","Time Poss","Drive Began",
		       "# of Plays","Net Yards","Result"];
	var rows = [];
	for each(var d in arr) {
	    rows.push(d.quarter);
        }
	return getTable("Drives",rows,columns,idx,"dr");
    }

    function changeVisibility(start,end) {
	for (var i=0; i<15; i++) {
	    var t=document.getElementById("gsbar"+i);
	    if (t != null) {
		t.setAttribute("class","subhead_link_bar");
	    }
	}
	var t=document.getElementById("gsbar"+start);
	t.setAttribute("class","medium_head");

	var idx=0;
	var t=document.getElementById("row"+idx);
	while (t != null) {
	    t.setAttribute("style","visibility: collapse");
	    idx++;
	    t=document.getElementById("row"+idx);
	}
	for (var idx=start; idx<=end; idx++) {
	    var t = document.getElementById("row"+idx);
	    t.setAttribute("style","visibility: visible");
	}
    }

function fillTables() {
    var scoreboard = document.getElementById('scoreboard');
    var bar = document.createElement('span');

    var t1 = document.createElement('div');
    t1.appendChild(document.createTextNode("Game Scout: "));
    t1.setAttribute("class","medium_head");

    var b1 = document.createElement('span');
    b1.appendChild(document.createTextNode("Total"));
    b1.setAttribute("class","subhead_link_bar");
    b1.setAttribute("id","gsbar0");
    b1.addEventListener('click', function() { changeVisibility(0,1); }, true);

    b2 = document.createElement('span');
    b2.appendChild(document.createTextNode(" | "));

    var b3 = document.createElement('span');
    b3.appendChild(document.createTextNode("Rushing"));
    b3.setAttribute("class","subhead_link_bar");
    b3.setAttribute("id","gsbar2");
    b3.addEventListener('click', function() { changeVisibility(2,4); }, true);
    
    b4 = document.createElement('span');
    b4.appendChild(document.createTextNode(" | "));

    var b5 = document.createElement('span');
    b5.appendChild(document.createTextNode("Passing"));
    b5.setAttribute("class","subhead_link_bar");
    b5.setAttribute("id","gsbar5");
    b5.addEventListener('click', function() { changeVisibility(5,8); }, true);
    
    b6 = document.createElement('span');
    b6.appendChild(document.createTextNode(" | "));

    var b7 = document.createElement('span');
    b7.appendChild(document.createTextNode("Special Teams"));
    b7.setAttribute("class","subhead_link_bar");
    b7.setAttribute("id","gsbar9");
    b7.addEventListener('click', function() { changeVisibility(9,13); }, true);
    
    b8 = document.createElement('span');
    b8.appendChild(document.createTextNode(" | "));


    var b9 = document.createElement('span');
    b9.appendChild(document.createTextNode("Defense"));
    b9.setAttribute("class","subhead_link_bar");
    b9.setAttribute("id","gsbar14");
    b9.addEventListener('click', function() { changeVisibility(14,14); }, true);
    
    bar.appendChild(t1);
    bar.appendChild(b1);
    bar.appendChild(b2);
    bar.appendChild(b3);
    bar.appendChild(b4);
    bar.appendChild(b5);
    bar.appendChild(b6);
    bar.appendChild(b7);
    bar.appendChild(b8);
    bar.appendChild(b9);
    scoreboard.appendChild(bar);

    var defName = new Array(2);
    var defStats = new Array(2);
    for (var t=0; t<2; t++) {
	defName[t] = [];
	defStats[t] = [];
	for (var i=0; i<playerDefensiveName[t].length; i++) {
	    var arr = playerDefensiveStats[t][i];
	    arr[0] -= arr[5];
	    arr[6] = 0;
	    if (arr[0]+arr[1]+arr[2]+arr[3]+arr[4] > 0) {
		defName[t].push(playerDefensiveName[t][i]);
		defStats[t].push(arr);
	    }
	}
    }

    var stDefensiveName = new Array(2);
    var stDefensiveStats = new Array(2);
    for (var t=0; t<2; t++) {
	stDefensiveName[t] = [];
	stDefensiveStats[t] = [];
	for (var i=0; i<playerDefensiveName[t].length; i++) {
	    if (playerDefensiveStats[t][i][5]+playerDefensiveStats[t][i][6] > 0) {
		stDefensiveName[t].push(playerDefensiveName[t][i]);
		stDefensiveStats[t].push([playerDefensiveStats[t][i][5],
					  playerDefensiveStats[t][i][6]]);
	    }
	}
    }

    for (var t=0; t<2; t++) {
        if (playerReceivingStats.length > 1) {
            arrayPairSort([playerReceivingStats[t],playerReceivingName[t]],[3,0,1]);
        }
        if (playerRushingStats.length > 1) {
            arrayPairSort([playerRushingStats[t],playerRushingName[t]],[2,1,0]);
        }
        if (defStats.length > 1) {
            arrayPairSort([defStats[t],defName[t]],[1,0]);
        }
        if (playerKickingStats.length > 1) {
            arrayPairSort([playerKickingStats[t],playerKickingName[t]],[1,0]);
        }
        if (playerPuntingStats.length > 1) {
            arrayPairSort([playerPuntingStats[t],playerPuntingName[t]],[1,0]);
        }
        if (playerPuntReturnStats.length > 1) {
            arrayPairSort([playerPuntReturnStats[t],playerPuntReturnName[t]],[1,0]);
        }
        if (stDefensiveStats.length > 1) {
            arrayPairSort([stDefensiveStats[t],stDefensiveName[t]],[1,0]);
        }
    }

    var arr = new Array();
    arr.push(getQuarterTable(0,quarter));
    arr.push(getQuarterTable(1,quarter));
    arr.push(getDriveTable(0,driveList[0]));
    arr.push(getDriveTable(1,driveList[1]));
    arr.push(getRushingTable(0));
    arr.push(getRushingTable(1));
    arr.push(getRushingByDownTable(0));
    arr.push(getRushingByDownTable(1));
    arr.push(getRushingTargetTable(0,playerRushingName[0]));
    arr.push(getRushingTargetTable(1,playerRushingName[1]));
    arr.push(getPassingTable(0));
    arr.push(getPassingTable(1));
    arr.push(getPassingDistanceTable(0));
    arr.push(getPassingDistanceTable(1));
    arr.push(getPassingByDownTable(0));
    arr.push(getPassingByDownTable(1));
    arr.push(getPassingTargetTable(0,playerReceivingName[0]));
    arr.push(getPassingTargetTable(1,playerReceivingName[1]));
    arr.push(getKickingTable(0,playerKickingName[0]));
    arr.push(getKickingTable(1,playerKickingName[1]));
    arr.push(getKickReturnTable(0,playerKickReturnName[0]));
    arr.push(getKickReturnTable(1,playerKickReturnName[1]));
    arr.push(getPuntingTable(0,playerPuntingName[0]));
    arr.push(getPuntingTable(1,playerPuntingName[1]));
    arr.push(getPuntReturnTable(0,playerPuntReturnName[0]));
    arr.push(getPuntReturnTable(1,playerPuntReturnName[1]));
    arr.push(getSTDefenseTable(0,stDefensiveName[0]));
    arr.push(getSTDefenseTable(1,stDefensiveName[1]));
    arr.push(getDefenseTable(0,defName[0]));
    arr.push(getDefenseTable(1,defName[1]));

    var tables = document.createElement("table");
    for (var i=0; i<arr.length/2; i++) {
	var qrow = document.createElement("tr");
	qrow.setAttribute('id','row'+i);
	qrow.setAttribute('valign','top');
	var qd1 = document.createElement("td");
	var qd2 = document.createElement("td");
	qd1.appendChild(arr[i*2]);
	qd2.appendChild(arr[i*2+1]);
	qrow.appendChild(qd1);
	qrow.appendChild(qd2);
	tables.appendChild(qrow);
    }
    document.getElementById("scoreboard").appendChild(tables);


    for (var i=0; i<2; i++) {

        //quarter table assignment
        document.getElementById('team'+i+'q').innerHTML = team_name[i] +" Totals By Quarter";
        
        var q=quarter;
        if (quarter != 1) {
	        q++;
        }

        for (var x=0; x<q; x++) {
	        var idx = i*6;
		var secs ="" + (team_possession[x+idx] % 60);
		while (secs.length < 2) secs = "0" + secs;
		document.getElementById("q-"+x+"-0-"+i).innerHTML = 
		    Math.floor(team_possession[x+idx] / 60) + ":" + secs;
		var p = team_quarter_totals[x][0+idx] + team_quarter_totals[x][4+idx]
	        document.getElementById("q-"+x+"-1-"+i).innerHTML = p;
		var y = team_quarter_totals[x][1+idx] + team_quarter_totals[x][5+idx];
	        document.getElementById("q-"+x+"-2-"+i).innerHTML = y;
	        var num = Math.round(100*y/p) / 100;
	        if (isNaN(num) == true) {
	            num = 0;
	        }
	        document.getElementById("q-"+x+"-3-"+i).innerHTML = num;
    //document.getElementById("q-"+x+"-2-"+i).innerHTML = team_quarter_totals[x][1+idx] + team_quarter_totals[x][4+idx];

	        document.getElementById("q-"+x+"-4-"+i).innerHTML = "";

	        document.getElementById("q-"+x+"-5-"+i).innerHTML = team_quarter_totals[x][0+idx];
	        document.getElementById("q-"+x+"-6-"+i).innerHTML = team_quarter_totals[x][1+idx];
	        var num = Math.round(100*team_quarter_totals[x][1+idx] / team_quarter_totals[x][0+idx]) / 100;
	        if (isNaN(num) == true) {
	            num = 0;
	        }
	        document.getElementById("q-"+x+"-7-"+i).innerHTML = num;
	        num = Math.round(100*team_quarter_totals[x][2+idx] / team_quarter_totals[x][0+idx]);
	        if (isNaN(num) == true) {
	            num = 0;
	        }
	        document.getElementById("q-"+x+"-8-"+i).innerHTML = num + "%";
	
	        document.getElementById("q-"+x+"-9-"+i).innerHTML = "";
	
	        document.getElementById("q-"+x+"-10-"+i).innerHTML = team_quarter_totals[x][3+idx];
	        document.getElementById("q-"+x+"-11-"+i).innerHTML = team_quarter_totals[x][4+idx];
	        num = Math.round(100*team_quarter_totals[x][3+idx] / team_quarter_totals[x][4+idx]);
	        if (isNaN(num) == true) {
	            num = 0;
	        }
	        document.getElementById("q-"+x+"-12-"+i).innerHTML = num + "%";
	        document.getElementById("q-"+x+"-13-"+i).innerHTML = team_quarter_totals[x][5+idx];
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
                     distanceStats[2][x*3+idx]   +distanceStats[3][x*3+idx]) +
                     " for " +
                     (distanceStats[0][x*3+idx+2] +distanceStats[1][x*3+idx+2] +
                     distanceStats[2][x*3+idx+2] +distanceStats[3][x*3+idx+2]);
            document.getElementById("pd-"+x+"-4-"+i).innerHTML = n;
        }
        document.getElementById("pd-3-4-"+i).innerHTML = "";
        //distance table assignment

        //passing target table assignment
        if (playerReceivingName[i] != null) {
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
		//document.getElementById("tp-5-"+x+"-"+i).innerHTML = playerReceivingStats[i][x][5];
		if (playerReceivingStats[i][x][0] > 0) {
		    num = Math.round(100*playerReceivingStats[i][x][3] / playerReceivingStats[i][x][0]) / 100;
		    document.getElementById("tp-5-"+x+"-"+i).innerHTML = num;
		}
		else {
		    document.getElementById("tp-5-"+x+"-"+i).innerHTML = 0;
		}
		document.getElementById("tp-6-"+x+"-"+i).innerHTML = playerReceivingStats[i][x][4];
            }
        }
        //passing target table assignment end
	
        //rushing target table assignment
        if (playerRushingName[i] != null) {
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
        }
        //rushing target table assignment end

        //defender table assignment
        if (playerDefensiveName[i] != null) {
            document.getElementById('team'+i+"d").innerHTML = team_name[i] +" Defenders";
            for (x=0; x<defName[i].length; x++) {
                document.getElementById("d-0-"+x+"-"+i).innerHTML = defStats[i][x][0];
                document.getElementById("d-1-"+x+"-"+i).innerHTML = defStats[i][x][2] +
		                                                    defStats[i][x][4];

                document.getElementById("d-2-"+x+"-"+i).innerHTML = defStats[i][x][1];
		document.getElementById("d-3-"+x+"-"+i).innerHTML = defStats[i][x][2];
                document.getElementById("d-4-"+x+"-"+i).innerHTML = defStats[i][x][3];
		document.getElementById("d-5-"+x+"-"+i).innerHTML = defStats[i][x][4];
            }
        }
        //defender table assignment end

        //kicker table assignment
        if (playerKickingName[i] != null) {
            document.getElementById('team'+i+"k").innerHTML = team_name[i] +" Kickers";
            for (x=0; x<playerKickingName[i].length; x++) {
                document.getElementById("k-0-"+x+"-"+i).innerHTML = playerKickingStats[i][x][0];
                document.getElementById("k-1-"+x+"-"+i).innerHTML = playerKickingStats[i][x][1];
		var num = Math.round(10*playerKickingStats[i][x][1] / playerKickingStats[i][x][0]) / 10;
		if (isNaN(num) == true) {
		    num = 0;
		}
                document.getElementById("k-2-"+x+"-"+i).innerHTML = num;
                document.getElementById("k-3-"+x+"-"+i).innerHTML = playerKickingStats[i][x][2];
                document.getElementById("k-4-"+x+"-"+i).innerHTML = playerKickingStats[i][x][3];
            }
        }
        //kicker table assignment end

        //punter table assignment
        if (playerPuntingName[i] != null) {
            document.getElementById('team'+i+"pu").innerHTML = team_name[i] +" Punters";
            for (x=0; x<playerPuntingName[i].length; x++) {
                document.getElementById("pu-0-"+x+"-"+i).innerHTML = playerPuntingStats[i][x][0];
                document.getElementById("pu-1-"+x+"-"+i).innerHTML = playerPuntingStats[i][x][1];
		var num = Math.round(10*playerPuntingStats[i][x][1] / playerPuntingStats[i][x][0]) / 10;
		if (isNaN(num) == true) {
		    num = 0;
		}
                document.getElementById("pu-2-"+x+"-"+i).innerHTML = num;
                document.getElementById("pu-3-"+x+"-"+i).innerHTML = playerPuntingStats[i][x][2];
                document.getElementById("pu-4-"+x+"-"+i).innerHTML = playerPuntingStats[i][x][3];
            }
        }
        //punter table assignment end

        //punt return table assignment
        if (playerPuntReturnName[i] != null) {
            document.getElementById('team'+i+"pr").innerHTML = team_name[i] +" Punt Returns";
            for (x=0; x<playerPuntReturnName[i].length; x++) {
                document.getElementById("pr-0-"+x+"-"+i).innerHTML = playerPuntReturnStats[i][x][0];
                document.getElementById("pr-1-"+x+"-"+i).innerHTML = playerPuntReturnStats[i][x][1];
		var num = Math.round(10*playerPuntReturnStats[i][x][1] / playerPuntReturnStats[i][x][0]) / 10;
		if (isNaN(num) == true) {
		    num = 0;
		}
                document.getElementById("pr-2-"+x+"-"+i).innerHTML = num;
                document.getElementById("pr-3-"+x+"-"+i).innerHTML = playerPuntReturnStats[i][x][2];
            }
        }
        //punt return table assignment end

        //kick return table assignment
        if (playerKickReturnName[i] != null) {
            document.getElementById('team'+i+"kr").innerHTML = team_name[i] +" Kick Returns";
            for (x=0; x<playerKickReturnName[i].length; x++) {
                document.getElementById("kr-0-"+x+"-"+i).innerHTML = playerKickReturnStats[i][x][0];
                document.getElementById("kr-1-"+x+"-"+i).innerHTML = playerKickReturnStats[i][x][1];
		var num = Math.round(10*playerKickReturnStats[i][x][1] / playerKickReturnStats[i][x][0]) / 10;
		if (isNaN(num) == true) {
		    num = 0;
		}
                document.getElementById("kr-2-"+x+"-"+i).innerHTML = num;
                document.getElementById("kr-3-"+x+"-"+i).innerHTML = playerKickReturnStats[i][x][2];
            }
        }
        //kick return table assignment end

        //specteam defender table assignment
        if (stDefensiveName[i] != null) {
            document.getElementById('team'+i+"std").innerHTML = team_name[i] +" Defenders";
            for (x=0; x<stDefensiveName[i].length; x++) {
                document.getElementById("std-0-"+x+"-"+i).innerHTML = stDefensiveStats[i][x][0];
                document.getElementById("std-1-"+x+"-"+i).innerHTML = stDefensiveStats[i][x][1];
            }
        }
        //specteam defender table assignment end
	
	//drive table start
        if (driveList[i] != null) {
            document.getElementById('team'+i+"dr").innerHTML = team_name[i] +" Drive Chart (not 100% correct)";
            for (x=0; x<driveList[i].length; x++) {
		var drive = driveList[i][x];
		document.getElementById("dr-0-"+x+"-"+i).innerHTML = drive.startTime;

		var start = convertTime(drive.startTime);
		var end = convertTime(drive.endTime);
		if (start < end) start += 900;
		var time = start - end;
		var timestr = time%60 + "";
		while (timestr.length < 2) timestr = "0"+timestr;
		timestr = parseInt(time/60)+":"+timestr;
		document.getElementById("dr-1-"+x+"-"+i).innerHTML = timestr;

		document.getElementById("dr-2-"+x+"-"+i).innerHTML = drive.driveBegan;//+"/"+drive.driveEnded;
		document.getElementById("dr-3-"+x+"-"+i).innerHTML = drive.numOfPlays;
		document.getElementById("dr-4-"+x+"-"+i).innerHTML = 
		    yardDiff(drive.driveBegan,drive.driveEnded);
		document.getElementById("dr-5-"+x+"-"+i).innerHTML = drive.result;
	    }
	}
	//drive table end
	
    }
}



    function convertTime(s) {
	if (s == null) {
	    console.log("convertTime == null");
	    return 0;
	}
        var v = s.split(':');
        return parseFloat(v[0])*60 + parseFloat(v[1]);
    }

    function yardReverse(marker) {
	var y = parseFloat(marker.slice(4));
	if (marker.indexOf("OWN") == 0) return "OPP "+y;
	else return "OWN "+y;
    }

    function yardAddition(start, add) {
	if ((start == null) || (add == null)) return 0;
	var y = parseFloat(start.slice(4));
	if (start.slice(0,3) == "OPP") {
	    y += 50;
	}
	y += add;
	if (y < 50) {
	    y = "OWN "+y;
	}
	else {
	    y = 100 - y;
	    y = "OPP "+y;
	}
	//console.log(start+" - "+add+" : "+y);
	return y;
    }

    function yardDiff(start, end) {
	if ((start == null) || (end == null)) return 0;
	var starty = parseFloat(start.slice(4));
	var endy = parseFloat(end.slice(4));
	//console.log(starty+"--"+endy);
	var yards = -1000;
	if (start.slice(0,3) == "OWN") {
	    if (end.slice(0,3) == "OWN") {
		yards = endy - starty;
	    }
	    else {
		yards = 100-endy-starty;
	    }
	}
	else if (start.slice(0,3) == "OPP") {
	    if (end.slice(0,3) == "OPP") {
		yards = starty - endy;
	    }
	    else {
		yards = starty+endy-100;
	    }
	}
	return yards;
    }

    function Drive() {
	this.quarter;
	this.startTime;
	this.endTime;
	this.driveBegan;
	this.driveEnded;
	this.numOfPlays = 0;
	this.netYards = 0;
	this.result;
	
	this.toString = function() {
	    return this.quarter+" : "+this.startTime+" : "+this.endTime+" : " +
	        this.timePoss+" : "+this.driveBegan+" : " +
	        this.driveEnded+" : "+this.numOfPlays+" : " +
	        yardDiff(this.driveBegan,this.driveEnded) +
	        " : "+this.result;
	}
    }

    function Play() {
        this.quarter;
        this.team;
        this.timeRemaining;
        this.marker;
        this.down;
        this.togo;
        this.play;
        this.replay;

        this.toString = function() {
            return this.quarter+" : "+this.team+" - "+this.timeRemaining+" - "+
                   this.marker+" - "+this.down+"&"+this.togo;
        }
    }

    function defenseHandler(shift, playText) {
	//defenders
	var ct = (current_team+1)%2;
	var dt = false;
	var s1 = playText.indexOf("[tackle: ");		
	if (s1 == -1) {
	    s1 = playText.indexOf("[diving tackle: ");
	    dt = true;
	}
	if (s1 != -1) {
	    if (dt == false) s1 += "[tackle: ".length;
	    else s1 += "[diving tackle: ".length;
	    
	    var s2 = playText.slice(s1).indexOf("]");
	    s = playText.slice(s1,s1+s2);
	    //console.log(s);
	    var playerIndex = arrayPush(ct,playerDefensiveName,s,
		      playerDefensiveStats,[0,0,0,0,0,0,0]);
	    playerDefensiveStats[ct][playerIndex][0] += 1;
	    playerDefensiveStats[ct][playerIndex][1+shift] += 1;
	}
	
	var string = playText+"";
	while ( (s1 = string.indexOf("[missed tackle: ")) != -1) {
	    string = string.slice(s1+"[missed tackle: ".length);
	    s2 = string.indexOf("]");
	    s = string.slice(0,s2);

	    var playerIndex = arrayPush(ct,playerDefensiveName,s,
		      playerDefensiveStats,[0,0,0,0,0,0,0]);
	    playerDefensiveStats[ct][playerIndex][2+shift] += 1;
	    
	    string = string.slice(s2);
	}
    }
    
    var current_team = 0;
    var lastTime = 900;

    function playHandler(drive,p) {
//        console.log("playHandler loop: "+pages+" - "+p.replay);
        var playText = p.play;
	playText = trim(playText);
        var quarter = parseFloat(p.quarter);
        var down = parseFloat(p.down);
        var togo = -1;
        var minGain = -1;

        if (p.team == team_name[0]) current_team = 0;
        else current_team = 1;

        try {
	    try {
		if (p.togo ==  null) {
		    p.togo = -1;
		}
		else if (p.togo == "G") {
		    togo = parseFloat(p.marker.slice(4));
		}
		else if (p.togo.indexOf("inches") != -1) {
		    togo = 0.5;
		}
		else {
		    togo = parseFloat(p.togo);
		}
	    }
	    catch (err) {
		console.log(err);
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
	    var yt;
	    
	    var line = playText;
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
		    
		    if(yt.indexOf(" yd gain") != -1) {
			//y = y;
		    }
		    else if(yt.indexOf(" yd loss") != -1) {
			y = -y;
		    }
		}
	    } while (isNaN(y) == true);
        }
        catch (error) {
	    console.log(error);
        }
	
	if (drive.numOfPlays == 0) {
	    drive.driveBegan = null;
	    drive.quarter = quarter;
	    lastDrive.endTime = p.timeRemaining;
	}
	if (drive.startTime == null) {
	    drive.startTime = p.timeRemaining;
	}
	if (drive.driveBegan == null) {
	    drive.driveBegan = p.marker;
	}
	drive.endTime = p.timeRemaining;
	drive.driveEnded = p.marker; // fix me?
	drive.numOfPlays++;
	//console.log(drive+" -- "+playText.slice(0,30));


        //console.log(down_index+"/"+downs.length+" down="+down+"\tarr[d]="+((down-1)+current_team*4)+"\tdowntxt="+downs[down_index].innerHTML+" - "+playText);
        
        if ((playText.match(" rush") != null) || (playText.match(" pitch to ") != null)) {
	    //console.log("rush "+playText.slice(0,20));
	
	    var inside = true;
	    if (playText.match(" pitch to ") != null) {
		inside = false;
	    }
	    
	    if ((yt.indexOf(" yd return") != -1) || (playText.indexOf("(touchback)") != -1)) {
		//must have been a fumble here
		//can't include without calculating the position
		//and still won't know the direction of the run
		if (drive.numOfPlays == 1) {
		    lastDrive.result = "Fumble";
		    lastDrive.numOfPlays += 1;
		    if (lastDrive.driveBegan == null) {
			lastDrive.driveBegan = p.marker;
		    }
		    lastDrive.driveEnded = p.marker;
		    lastDrive.endTime = p.timeRemaining;

		    drive.numOfPlays = 0;
		    if (playText.indexOf("[TD]") != -1) {
			drive.result = "Touchdown";
			drive.driveEnded = "OPP 0";
			drive.driveStarted = p.marker;
		    }
		}
	    }	
	    else if(playText.indexOf("[SAFETY]") != -1) {
	        //must have been a safety here
                //and, of course, it's a possession for the wrong team
                //ignoring it for now as we don't know where the runner was tackled
		if (drive.numOfPlays == 1) {
		    lastDrive.result = "Safety";
		}
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
		    if ( (r2 = s.indexOf(", PAT m")) != -1) {
			s = s.slice(0,r2);
		    }
		}
		else {
		    if ( (r2=playText.indexOf(" to the left")) != -1) {
			index += 1;
		    }
		    else if ( (r2=playText.indexOf(" up the middle")) != -1) {
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
		
		var playerIndex = arrayPush(current_team,playerRushingName,s,
					    playerRushingStats,[0,0,0,0]);
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
		
		defenseHandler(0,playText);

		if (playText.indexOf("[TD]") != -1) {
		    drive.result = "Touchdown";
		    drive.driveEnded = "OPP 0";
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

	    var playerIndex = arrayPush(current_team,playerReceivingName,s,
					playerReceivingStats,[0,0,0,0,0,0]);
	
	    if ((yt.indexOf(" yd return") != -1) || (playText.indexOf("(touchback)") != -1)) {
		if (playText.indexOf(" intercepted by ") != -1) {
		    //interceptions are listed in PBP as possessions for the wrong team
		    
		    team_pass_att[(index+3)%6] += 1;
		    team_pass_att_down[((down-1)+(current_team*4)+4)%8] += 1;
		    
                    team_quarter_totals[0][4+((current_team*6)+6)%12] += 1;
                    team_quarter_totals[quarter][4+((current_team*6)+6)%12] += 1;
		    
                    playerReceivingName[current_team].pop();
                    playerReceivingStats[current_team].pop();
                    current_team = (current_team+1)%2;                
		    var playerIndex = arrayPush(current_team,playerReceivingName,s,
						playerReceivingStats,[0,0,0,0,0,0]);
		    playerReceivingStats[current_team][playerIndex][1] += 1;
                    current_team = (current_team+1)%2;                

		    if (drive.numOfPlays == 1) {
			lastDrive.result = "Interception";
//console.log(lastDrive.endTime+" -- "+drive.startTime+" -- "+p.timeRemaining);
			lastDrive.numOfPlays += 1;
			lastDrive.endTime = p.timeRemaining;
			if (lastDrive.driveBegan == null) {
			    lastDrive.driveBegan = p.marker;
			}
			//console.log(lastDrive+"\n\n"+drive);
			lastDrive.driveEnded = p.marker;

			drive.numOfPlays = 0;
			if (playText.indexOf("[TD]") != -1) {
			    drive.result = "Touchdown";
			    drive.driveEnded = "OPP 0";
			    drive.driveStarted = p.marker;
			}
		    }
		}
		else {
		    //must have been a fumble here
		    //can't include without calculating the position
		    //ignoring to be consistent with rushing
                    playerReceivingName[current_team].pop();
                    playerReceivingStats[current_team].pop();

		    if (drive.numOfPlays == 1) {
			lastDrive.result = "Fumble";
			lastDrive.numOfPlays += 1;
			if (lastDrive.driveBegan == null) {
			    lastDrive.driveBegan = p.marker;
			}
			lastDrive.driveEnded = p.marker;
			lastDrive.endTime = p.timeRemaining;

			drive.numOfPlays = 0;
			if (playText.indexOf("[TD]") != -1) {
			    drive.result = "Touchdown";
			    drive.driveEnded = "OPP 0";
			    drive.driveStarted = p.marker;
			}
		    }
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

		defenseHandler(2,playText);

		if (playText.indexOf("[TD]") != -1) {
		    drive.result = "Touchdown";
		    drive.driveEnded = "OPP 0";
		}
	    }
	    //console.log((down-1)+" "+((down-1)+current_team*4)+" "+downs[down_index].innerHTML+" "+playText);
        }
        else if ((playText.match(" sacked by ") != null) ||
		 (playText.indexOf("[forced fumble:") == 0) ||
		 (playText.indexOf("[tackle:") == 0)) {
	    //console.log("sack "+playText.slice(0,40));
	    if (drive.numOfPlays == 1) {
		//lost fumble on a sack
		if (playText.indexOf("[SAFETY]") != -1) {
		    lastDrive.result = "Safety";
		    lastDrive.numOfPlays += 1;
		    lastDrive.driveEnded = p.marker;
		    lastDrive.endTime = p.timeRemaining;
		    
		    drive.numOfPlays = 0;
		    drive.startTime = p.timeRemaining;
		}
		else if (playText.indexOf("[forced fumble:") != -1) {
		    lastDrive.result = "Fumble";
		    lastDrive.numOfPlays += 1;
		    lastDrive.driveEnded = p.marker;
		    lastDrive.endTime = p.timeRemaining;
		    
		    drive.numOfPlays = 0;
		    drive.startTime = p.timeRemaining;
		    if (playText.indexOf("[TD]") != -1) {
			drive.driveEnded = "Opp 0";
			drive.result = "Touchdown";
		    }
		}
	    }
	}
        else if (playText.indexOf("Kickoff by ") == 0) {
	    var ct = (current_team+1)%2;
	    var s1 = "Kickoff by ".length;
	    
	    var s2 = playText.slice(s1).indexOf(', ');
	    var s = playText.slice(s1,s1+s2);
	    var playerIndex = arrayPush(ct,playerKickingName,s,
					playerKickingStats,[0,0,0,0]);
	    
	    var s3 = playText.slice(s1+s2).indexOf(" yd");
	    var len = parseInt(playText.slice(s1+s2+s3-3,s1+s2+s3),10);
	    playerKickingStats[ct][playerIndex][0] += 1;
	    playerKickingStats[ct][playerIndex][1] += len;
	    if (len > playerKickingStats[ct][playerIndex][2]) {
		playerKickingStats[ct][playerIndex][2] = len;
	    }
	    if (playText.indexOf("fumble") == -1) {
		if (playText.indexOf("(touchback)") != -1) {
		    playerKickingStats[ct][playerIndex][3] += 1;
		}
		else if (playText.indexOf(" yd return)") != -1) {
		    var ct = current_team;
		    var namestr = playText.slice(playText.indexOf(" fielded by ")+" fielded by ".length);

		    var yidx = namestr.indexOf(" yd return)")-6;
		    yidx = yidx+namestr.slice(yidx).indexOf(" (");
		    var y = parseFloat(namestr.slice(yidx+2));

		    var namestr = namestr.slice(0,yidx);
		    if (namestr.indexOf(" [missed tackle:") != -1) {
			namestr = namestr.slice(0,namestr.indexOf(" [missed tackle:"));
		    }
		    
		    if (namestr.indexOf(", PAT m") != -1) {
			namestr = namestr.slice(0,namestr.indexOf(", PAT m"));
		    }
		    var playerIndex = arrayPush(ct, playerKickReturnName,namestr,
						playerKickReturnStats,[0,0,0]);
		    playerKickReturnName[ct][playerIndex] = namestr;
		    playerKickReturnStats[ct][playerIndex][0] += 1; 
		    playerKickReturnStats[ct][playerIndex][1] += y;
		    if (y > playerKickReturnStats[ct][playerIndex][2]) {
			playerKickReturnStats[ct][playerIndex][2] = y;
		    }
		}
		
		defenseHandler(4,playText);

		drive.driveBegan = yardAddition("OPP 30",-len);
		drive.startTime = p.timeRemaining;
		if (playText.indexOf("[TD]") != -1) {
		    if (p.marker == null) {
			drive.driveBegan = yardAddition("OWN 30",len);
		    }
		    else {
			//drive.driveBegan = yardAddition("p.marker");
		    }
		    drive.driveBegan = yardReverse(drive.driveBegan);
		    drive.driveEnded = "OPP 0";
		    drive.result = "Touchdown";
		}
	    }
	    else {
		//a damn fumble
		if (drive.numOfPlays != 1) {
		    //kicking team recovered
		}
		else {
		}
	    }
	}
	else if (playText.indexOf("Punt by ") == 0) {
	    var ct = (current_team+1)%2;
	    var s1 = "Punt by ".length;
	    
	    var s2 = playText.slice(s1).indexOf(', ');
	    var s = playText.slice(s1,s1+s2);
	    var playerIndex = arrayPush(ct,playerPuntingName,s,
					playerPuntingStats,[0,0,0,0]);
	    
	    var s3 = playText.slice(s1+s2).indexOf(" yd");
	    var len = parseInt(playText.slice(s1+s2+s3-3,s1+s2+s3),10);
	    playerPuntingStats[ct][playerIndex][0] += 1;
	    playerPuntingStats[ct][playerIndex][1] += len;
	    if (len > playerPuntingStats[ct][playerIndex][2]) {
		playerPuntingStats[ct][playerIndex][2] = len;
	    }
	    if (playText.indexOf("fumble") == -1) {
		//was a return, no fumbles
		if (playText.indexOf("(touchback)") != -1) {
		    playerPuntingStats[ct][playerIndex][3] += 1;
		}
		else if (playText.indexOf(" yd return)") != -1) {
		    var ct = current_team;
		    var namestr = playText.slice(playText.indexOf(" fielded by ")+" fielded by ".length);

		    var yidx = namestr.indexOf(" yd return)")-6;
		    yidx = yidx+namestr.slice(yidx).indexOf(" (");
		    var y = parseFloat(namestr.slice(yidx+2));

		    var namestr = namestr.slice(0,yidx);
		    if (namestr.indexOf(" [missed tackle:") != -1) {
			namestr = namestr.slice(0,namestr.indexOf(" [missed tackle:"));
		    }
		    
		    if (namestr.indexOf(", PAT m") != -1) {
			namestr = namestr.slice(0,namestr.indexOf(", PAT m"));
		    }
		    var playerIndex = arrayPush(ct, playerPuntReturnName,namestr,
						playerPuntReturnStats,[0,0,0]);
		    playerPuntReturnName[ct][playerIndex] = namestr;
		    playerPuntReturnStats[ct][playerIndex][0] += 1; 
		    playerPuntReturnStats[ct][playerIndex][1] += y;
		    if (y > playerPuntReturnStats[ct][playerIndex][2]) {
			playerPuntReturnStats[ct][playerIndex][2] = y;
		    }
		}
		defenseHandler(4,playText);
		
		lastDrive.result = "Punt";
		lastDrive.numOfPlays += 1;
		lastDrive.driveEnded = p.marker;
		//lastDrive.endTime = null;

		drive.numOfPlays = 0;
		drive.startTime = p.timeRemaining;
		if (playText.indexOf("[TD]") != -1) {
		    drive.driveBegan = yardAddition(p.marker,len);
		    drive.driveBegan = yardReverse(drive.driveBegan);
		    drive.driveEnded = "OPP 0";
		    drive.result = "Touchdown";
		}
	    }
	    else {
		if (drive.numOfPlays == 1) {
		    //punt was fumbled & lost
		    lastDrive.result = "Punt";
		    lastDrive.numOfPlays += 1;
		    lastDrive.driveEnded = p.marker;
		    lastDrive.endTime = p.timeRemaining;
		    
		    drive.numOfPlays = 0;
		    drive.startTime = p.timeRemaining;
		}
	    }
	}
	else if (playText.indexOf(" yd field goal attempted by ") != -1) {
	    if (playText.indexOf(", missed") == playText.length - ", missed".length) {
		lastDrive.result = "Missed FG";
		lastDrive.endTime = p.timeRemaining;
		lastDrive.driveEnded = p.marker;
		lastDrive.numOfPlays++;
		drive.numOfPlays = 0;
	    }
	    else {
		drive.result = "FG";
		//drive.driveEnded = p.marker;
	    }
	    //console.log(drive);
	}
        else {
	    //something really wierd
	    console.log("You shouldn't see me, so I'm probably a bug: '"+playText+"'");
        }

	if (playText.indexOf("turnover on downs") != -1) {
	    drive.result = "Downs";
	    //drive.driveEnded = p.marker;
	}

	if (lastTime == null) {
	}
	else {
	    if (lastTime < convertTime(p.timeRemaining)) {
		team_possession[current_team*6] += lastTime;
		team_possession[current_team*6+quarter-1] += lastTime;
	    }
	    else {
		team_possession[current_team*6] += lastTime - convertTime(p.timeRemaining);
		team_possession[current_team*6+quarter] += lastTime - convertTime(p.timeRemaining);
	    }
	}
	lastTime = convertTime(p.timeRemaining);
    }




    var pbpTable = document.getElementById("play_by_play_table");
    var quarter = 0;
    var team;
    var pages;
    var p = null;
    var driveList = [[],[]];
    var lastDrive = new Drive();
    var d = null;

    console.log("start");
    pages = pbpTable.rows.length;
    for each (htmlTableRowElement in pbpTable.rows) {
        var className = htmlTableRowElement.className;
        if (className == null) {
            continue;
        }
        if (className.match("pbp_quarter") != null) {
            quarter++;
	    if (quarter == 3) {
		if (d != null) {
		    if (d.result == null) {
			d.result = "End of Half";
		    }
		    d.endTime = "0:00";
		    //console.log(d);
		    lastDrive = d;
		    driveList[current_team].push(d);
		    d = new Drive();
		}
	    }
	}
        else if (className.match("pbp_team") != null) {
            var coll = htmlTableRowElement.cells;
            var node = coll.item(0);
            var idx = 0;
            do {
                var s = node.innerHTML.slice(idx,node.innerHTML.length);
                var i = s.indexOf(" ");
                if (i != -1) idx += i + 1;
            } 
            while (i != -1);
            team = node.innerHTML.slice(0,idx-1);

            var found = false;
            for each (t in team_name) {
                if (t == team) {
                    found = true;
                    break;
                }
            }
            if (found == false) {
                team_name.push(team);
            }
	    if (d != null) {
		if (d.quarter != null) {
		    //console.log(d);
		    lastDrive = d;		
		    driveList[current_team].push(lastDrive);
		}
	    }
	    d = new Drive();
        }
        else if (className.match("pbp_play_row") != null) {
            p = new Play();
            p.quarter = quarter;
            p.team = team;
	    
            var coll = htmlTableRowElement.cells;
            for each (node in coll) {
                var cName = node.className;
                if (cName.match("pbp_time_remaining") != null) {
                    p.timeRemaining = node.innerHTML;
                }
                else if (cName.match("pbp_marker") != null) {
                    p.marker = node.innerHTML;
                }
                else if (cName.match("pbp_down") != null) {
                    p.down = node.innerHTML.slice(0,1);
                    p.togo = node.innerHTML.slice(node.innerHTML.indexOf("amp; ")+5);
                }
                else if (cName.match("pbp_replay") != null) {
                    p.replay = node.firstChild;
                    playHandler(d,p);
                }
                else if (cName.match("pbp_play") != null) {
                    p.play = node.firstChild.data;
                }
            }
        }
        else {
//            console.log("main loop removal : "+pages+" / "+pbpTable.rows.length);
        }
	
    }

    d.endTime = "00:00";
    d.result = "End of Game";
    driveList[current_team].push(d);

    //time of posession for last play
    if ((p.quarter != 5) && ((window.location.toString()).indexOf("quarter=5") == -1)) {
	team_possession[current_team*6] += lastTime;
	team_possession[current_team*6+p.quarter] += lastTime;
    }
    if (p.quarter == 1) {
	d.result = "End of Quarter";
    }

    fillTables();

    changeVisibility(0,1);
    console.log("main loop done");

    console.log("boxscore fetch start");
    var e = document.getElementsByClassName("subhead_link_bar");
    var t = e[0].innerHTML;
    var i = t.indexOf('"');
    t = t.slice(i+1);
    var i = t.indexOf('"');
    t = t.slice(0,i);
    getPage("http://goallineblitz.com/"+t);
    console.log("boxscore fetch done");
}, 100);
