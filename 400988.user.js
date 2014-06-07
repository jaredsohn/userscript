// ==UserScript==
// @name           GLB HomePageRewrite Season 12+ - pabst fix
// @namespace      GLB
// @author         DDCUnderground
// @description    ReWrite Homepage to try to better utilize space script includes player links, next game spread, cash to homepage, contract expiration, training value and some other features.
// @include        http://glb.warriorgeneral.com/game/home.pl
// @include        http://glb.warriorgeneral.com/game/boost_player.pl
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version	   14.03.01
// ==/UserScript==
// 

$(document).ready(function(){
    //functions
    function createCookie(name,value,days) {
    	if (days) {
    		var date = new Date();
    		date.setTime(date.getTime()+(days*24*60*60*1000));
    		var expires = "; expires="+date.toGMTString();
    	}
    	else var expires = "";
    	document.cookie = name+"="+value+expires+"; path=/";
    }
    
    function readCookie(name) {
    	var nameEQ = name + "=";
    	var ca = document.cookie.split(';');
    	for(var i=0;i < ca.length;i++) {
    		var c = ca[i];
    		while (c.charAt(0)==' ') c = c.substring(1,c.length);
    		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    	}
    	return null;
    }
    
    function eraseCookie(name) {
    	createCookie(name,"",-1);
    }

    function buildsettingsdiv(){
        
        var tablist = document.createElement('div');
        tablist.setAttribute('class', 'tabs');
        var tabhomeset = document.createElement('div');
        tabhomeset.setAttribute('class', 'subtab_on');
        tabhomeset.setAttribute('id', 'tabhomeset');
        var tabhomesetlink = document.createElement('a');
        tabhomesetlink.setAttribute('id','ddctablink');
        tabhomesetlink.addEventListener('click', showsettings, false);
        tabhomesettextnode = document.createTextNode('Show Settings');
        tabhomesetlink.appendChild(tabhomesettextnode);
        tabhomeset.appendChild(tabhomesetlink);
        var tabhomeset2 = document.createElement('div');
        tabhomeset2.setAttribute('class', 'subtab_on');
        tabhomeset2.setAttribute('id', 'tabhomeset2');
        var tabhomeset2link = document.createElement('a');
        tabhomeset2link.setAttribute('id','ddctablink');
        tabhomeset2link.addEventListener('click', showsettings, false);
        tabhomeset2textnode = document.createTextNode('Hide Settings');
        tabhomeset2link.appendChild(tabhomeset2textnode);
        tabhomeset2.appendChild(tabhomeset2link);


        tablist.appendChild(tabhomeset);
        tablist.appendChild(tabhomeset2);
        var homesetdiv = document.createElement('div');
        homesetdiv.setAttribute('class', 'content_container');
        homesetdiv.setAttribute('id', 'DDChomesetdiv');
        //$("div[class*='medium_head']:eq(0)").prepend(homesetdiv);
        //$("div[class*='medium_head']:eq(0)").prepend(tablist);
        $('ul[id="modules"]').prepend(homesetdiv);
        $('ul[id="modules"]').prepend(tablist);

        var settable = document.createElement('table');
        var rowhead0 = document.createElement('tr');
        var cellhead01 = document.createElement('td');
        settable.appendChild(rowhead0);
        rowhead0.appendChild(cellhead01);
        cellhead01.setAttribute('colspan', '2');
        cellhead01.setAttribute('align','center');
        cellhead01.innerHTML='<font align="center"><b><i>Team Items</b></i></font><hr>';
        var row1 = document.createElement('tr');
        var cell11 = document.createElement('td');
        var cell12 = document.createElement('td');
        var row2 = document.createElement('tr');
        var cell21 = document.createElement('td');
        var cell22 = document.createElement('td');
        settable.appendChild(row1);
        row1.appendChild(cell11);
        row1.appendChild(cell12);
        var rowhead1 = document.createElement('tr');
        var cellhead11 = document.createElement('td');
        settable.appendChild(rowhead1);
        rowhead1.appendChild(cellhead11);
        cellhead11.setAttribute('colspan', '2');
        cellhead11.setAttribute('align','center');
        cellhead11.innerHTML='<font align="center"><b><i>Boost Items</b></i></font><hr>';
        settable.appendChild(row2);
        row2.appendChild(cell21);
        row2.appendChild(cell22);
        cell11.setAttribute('width', '50%');
        cell12.setAttribute('width', '50%');
        cell21.setAttribute('width', '50%');
        cell22.setAttribute('width', '50%');
        var rowhead2 = document.createElement('tr');
        var cellhead21 = document.createElement('td');
        settable.appendChild(rowhead2);
        rowhead2.appendChild(cellhead21);
        cellhead21.setAttribute('colspan', '2');
        cellhead21.setAttribute('align','center');
        cellhead21.innerHTML='<font align="center"><b><i>Player Items</b></i></font><hr>';
        

        var row3 = document.createElement('tr');
        var cell31 = document.createElement('td');
        var cell32 = document.createElement('td');
        var row4 = document.createElement('tr');
        var cell41 = document.createElement('td');
        var cell42 = document.createElement('td');
        settable.appendChild(row3);
        row3.appendChild(cell31);
        row3.appendChild(cell32);
        settable.appendChild(row4);
        row4.appendChild(cell41);
        row4.appendChild(cell42);
        cell31.setAttribute('width', '50%');
        cell32.setAttribute('width', '50%');
        cell41.setAttribute('width', '50%');
        cell42.setAttribute('width', '50%');
        var row5 = document.createElement('tr');
        var cell51 = document.createElement('td');
        var cell52 = document.createElement('td');
        var row6 = document.createElement('tr');
        var cell61 = document.createElement('td');
        var cell62 = document.createElement('td');
        settable.appendChild(row5);
        row5.appendChild(cell51);
        row5.appendChild(cell52);
        settable.appendChild(row6);
        row6.appendChild(cell61);
        row6.appendChild(cell62);
        cell51.setAttribute('width', '50%');
        cell52.setAttribute('width', '50%');
        cell61.setAttribute('width', '50%');
        cell62.setAttribute('width', '50%');

        var row7 = document.createElement('tr');
        var cell71 = document.createElement('td');
        var cell72 = document.createElement('td');
        var row8 = document.createElement('tr');
        var cell81 = document.createElement('td');
        var cell82 = document.createElement('td');
        settable.appendChild(row7);
        row7.appendChild(cell71);
        row7.appendChild(cell72);
        settable.appendChild(row8);
        row8.appendChild(cell81);
        row8.appendChild(cell82);
        var rowhead3 = document.createElement('tr');
        var cellhead31 = document.createElement('td');
        settable.appendChild(rowhead3);
        rowhead3.appendChild(cellhead31);
        cellhead31.setAttribute('colspan', '2');
        cellhead31.setAttribute('align','center');
        cellhead31.innerHTML='<font align="center"><b><i>Homepage Items</b></i></font><hr>';
        cell71.setAttribute('width', '50%');
        cell72.setAttribute('width', '50%');
        cell81.setAttribute('width', '50%');
        cell82.setAttribute('width', '50%');
        
        var row9 = document.createElement('tr');
        var cell91 = document.createElement('td');
        var cell92 = document.createElement('td');
        settable.appendChild(row9);
        row9.appendChild(cell91);
        row9.appendChild(cell92);
        cell91.setAttribute('width', '50%');
        cell92.setAttribute('width', '50%');
        cell91.setAttribute('align', 'left');

        var rowhead4 = document.createElement('tr');
        var cellhead41 = document.createElement('td');
        settable.appendChild(rowhead4);
        rowhead4.appendChild(cellhead41);
        cellhead41.setAttribute('colspan', '2');
        cellhead41.setAttribute('align','center');
        cellhead41.innerHTML='<font align="center"><b><i>Firefox Options</b></i></font><hr>';

        var row10 = document.createElement('tr');
        var cell101 = document.createElement('td');
        var cell102 = document.createElement('td');
        var row11 = document.createElement('tr');
        var cell111 = document.createElement('td');
        var cell112 = document.createElement('td');
        settable.appendChild(row10);
        row10.appendChild(cell101);
        row10.appendChild(cell102);
        settable.appendChild(row11);
        row11.appendChild(cell111);
        row11.appendChild(cell112);
        cell101.setAttribute('width', '50%');
        cell102.setAttribute('width', '50%');
        cell111.setAttribute('width', '50%');
        cell112.setAttribute('width', '50%');


        var row12 = document.createElement('tr');
        var cell121 = document.createElement('td');
        var cell122 = document.createElement('td');
        var row13 = document.createElement('tr');
        var cell131 = document.createElement('td');
        settable.appendChild(row12);
        row12.appendChild(cell121);
        row12.appendChild(cell122);
        settable.appendChild(row13);
        row13.appendChild(cell131);
        cell121.setAttribute('width', '50%');
        cell122.setAttribute('width', '50%');
        cell131.setAttribute('colspan', '2');
        cell131.setAttribute('align', 'center');




        settable.setAttribute('cellpadding','3');
        settable.setAttribute('cellspacing','3');
        settable.setAttribute('width','90%');

        var playerstatschk = document.createElement('input');
        playerstatschk.setAttribute('type', 'checkbox');
        playerstatschk.setAttribute('id', 'chk_playerstats');
        var playerstatstext = document.createTextNode('Players Stats');
        cell42.appendChild(playerstatschk);
        cell42.appendChild(playerstatstext);

        var teamlinkschk = document.createElement('input');
        teamlinkschk.setAttribute('type', 'checkbox');
        teamlinkschk.setAttribute('id', 'chk_teamlinks');
        var teamlinkstext = document.createTextNode('Quick Links');
        cell91.appendChild(teamlinkschk);
        cell91.appendChild(teamlinkstext);

        var showcontractschk = document.createElement('input');
        showcontractschk.setAttribute('type', 'checkbox');
        showcontractschk.setAttribute('id', 'chk_showcontracts');
        var showcontractschktext = document.createTextNode('Contract Info');
        cell41.appendChild(showcontractschk);
        cell41.appendChild(showcontractschktext);

        var boostschk = document.createElement('input');
        boostschk.setAttribute('type', 'checkbox');
        boostschk.setAttribute('id', 'chk_boosts');
        var boostschktext = document.createTextNode('Available Boosts');
        cell21.appendChild(boostschk);
        cell21.appendChild(boostschktext);

        var blueboxeschk = document.createElement('input');
        blueboxeschk.setAttribute('type', 'checkbox');
        blueboxeschk.setAttribute('id', 'chk_blueboxes');
        var blueboxeschktext = document.createTextNode('Blue Box Display');
        cell31.appendChild(blueboxeschk);
        cell31.appendChild(blueboxeschktext);

        var cashchk = document.createElement('input');
        cashchk.setAttribute('type', 'checkbox');
        cashchk.setAttribute('id', 'chk_cash');
        var cashchktext = document.createTextNode('Player Cash');
        cell32.appendChild(cashchk);
        cell32.appendChild(cashchktext);

        var sortchk = document.createElement('input');
        sortchk.setAttribute('type', 'checkbox');
        sortchk.setAttribute('id', 'chk_sort');
        var sortchktext = document.createTextNode('Sort Players');
        cell92.appendChild(sortchk);
        cell92.appendChild(sortchktext);

        var agechk = document.createElement('input');
        agechk.setAttribute('type', 'checkbox');
        agechk.setAttribute('id', 'chk_age');
        var agechktext = document.createTextNode('Player Age');
        cell81.appendChild(agechk);
        cell81.appendChild(agechktext);

        var teamspreadchk = document.createElement('input');
        teamspreadchk.setAttribute('type', 'checkbox');
        teamspreadchk.setAttribute('id', 'chk_teamspread');
        var teamspreadchktext = document.createTextNode('Team Spread');
        cell11.appendChild(teamspreadchk);
        cell11.appendChild(teamspreadchktext);

        var teamscolorschk = document.createElement('input');
        teamscolorschk.setAttribute('type', 'checkbox');
        teamscolorschk.setAttribute('id', 'chk_teamscolors');
        var teamscolorschktext = document.createTextNode('Team Colors');
        cell12.appendChild(teamscolorschk);
        cell12.appendChild(teamscolorschktext);

        var countdownchk = document.createElement('input');
        countdownchk.setAttribute('type', 'checkbox');
        countdownchk.setAttribute('id', 'chk_countdown');
        var countdownchktext = document.createTextNode('Gametime Countdown');
        cell101.appendChild(countdownchk);
        cell101.appendChild(countdownchktext);

        var famechk = document.createElement('input');
        famechk.setAttribute('type', 'checkbox');
        famechk.setAttribute('id', 'chk_fame');
        var famechktext = document.createTextNode('Player Fame');
        cell52.appendChild(famechk);
        cell52.appendChild(famechktext);

        var bonuschk = document.createElement('input');
        bonuschk.setAttribute('type', 'checkbox');
        bonuschk.setAttribute('id', 'chk_bonus');
        var bonuschktext = document.createTextNode('Bonus Tokens');
        cell61.appendChild(bonuschk);
        cell61.appendChild(bonuschktext);

        var vetpointschk = document.createElement('input');
        vetpointschk.setAttribute('type', 'checkbox');
        vetpointschk.setAttribute('id', 'chk_vetpoints');
        var vetpointschktext = document.createTextNode('Veteran Points');
        cell62.appendChild(vetpointschk);
        cell62.appendChild(vetpointschktext);

        var ratingsbarschk = document.createElement('input');
        ratingsbarschk.setAttribute('type', 'checkbox');
        ratingsbarschk.setAttribute('id', 'chk_ratingsbars');
        var ratingsbarschktext = document.createTextNode('Rating Bars');
        cell51.appendChild(ratingsbarschk);
        cell51.appendChild(ratingsbarschktext);

        var linksnewchk = document.createElement('input');
        linksnewchk.setAttribute('type', 'checkbox');
        linksnewchk.setAttribute('id', 'chk_linksnew');
        var linksnewtext = document.createTextNode('Open Links in new Tab/Window');
        cell111.appendChild(linksnewchk);
        cell111.appendChild(linksnewtext);
        
        cell121.innerHTML='<br><br>';

        var savebutton = document.createElement('input');
        savebutton.setAttribute('type', 'button');
        savebutton.setAttribute('value','Save Settings');
        savebutton.setAttribute('id','savebutton');
        cell131.appendChild(savebutton);

        

        $('#DDChomesetdiv').append(settable);
        $('#DDChomesetdiv').hide();
        $('#tabhomeset2').hide();
        $('#savebutton').click(savesettings);
        $('input[id*="chk_"]','#DDChomesetdiv').change(checkchange);
        $('input[id*="chk_"]','#DDChomesetdiv').each(function(j){
            if (settingsarray[j] == '1'){
                $(this).attr('checked',true);
            };
        });
        checkchange();



    }

    function checkchange(){
        var teamcolors = $('input[id*="chk_"]:eq(1)','#DDChomesetdiv').attr('checked');
        if (teamcolors==true) {
            $('input[id*="chk_"]:eq(3)','#DDChomesetdiv').attr('checked', '');
            $('input[id*="chk_"]:eq(3)','#DDChomesetdiv').attr('disabled', 'disabled');
        }else{
            $('input[id*="chk_"]:eq(3)','#DDChomesetdiv').attr('disabled', '');
        }
        var bluebox = $('input[id*="chk_"]:eq(3)','#DDChomesetdiv').attr('checked');
        if (bluebox==true) {
            $('input[id*="chk_"]:eq(1)','#DDChomesetdiv').attr('checked', '');
            $('input[id*="chk_"]:eq(1)','#DDChomesetdiv').attr('disabled', 'disabled');
        }else{
            $('input[id*="chk_"]:eq(1)','#DDChomesetdiv').attr('disabled', '');
        }
    }

    function showsettings(){
        var vision = $('#DDChomesetdiv').is(':hidden');
        if (vision == true) {
            $('#tabhomeset').hide();
            $('#tabhomeset2').show();
        }else{
            $('#tabhomeset2').hide();
            $('#tabhomeset').show();
        }
        $('#DDChomesetdiv').toggle();
    }

    
    function savesettings(){
        var cookstring ='';
        $('input[id*="chk_"]','#DDChomesetdiv').each(function(j){
            if($(this).attr('checked')){
                cookstring+='1,';
            }else{
                cookstring+='0,';
            }
        });
        cookstring = cookstring.substring(0,cookstring.length-1);
        createCookie('DDChome',cookstring,90);
        window.location.reload();
    }

    function intvalue(a,b){
        var x = parseInt(a[1]);
        var y = parseInt(b[1]);
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }

    function getBoosts(){
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.text = "function GotoBoosts(playerid){document.cookie='boostid=' + playerid + '; expires=15/02/2010 00:00:00';window.location.href='http://glb.warriorgeneral.com/game/boost_player.pl';}";
        document.body.appendChild(script);
        
        $.get("/game/multi_boost_player.pl",function(returned_data){
            var boosttotal = 0;
            $('tr[class="alternating_color1"]', returned_data).each(function(t){
                var playerlink = $('a[href*="/game/player.pl?player_id="]',$(this)).attr('href');
                if ($('select',$(this)).size()>0) {
                    var boostsavail = $('select',$(this)).attr('value');
                    var boosttext = $('select',$(this)).val();
                    boosttext = boosttext.substring(boosttext.indexOf(' - ')+3);
                    var boostcost = parseInt(boosttext.substring(0,boosttext.indexOf(' ')));
                    boosttotal+=boostcost;
                    for (var z=0;z<playersinfo.length;z++) {
                        if (('/game/player.pl?player_id=' + playersinfo[z][0]) == playerlink) {
                            playersinfo[z][12] = parseInt(boostsavail);
                            playersinfo[z][21] = parseInt(boostcost);
                            var inspoint1 = playersinfo[z][7].indexOf('<div class="player_xp">',playersinfo[z][7].indexOf('<div class="player_xp">')+23);
                            var insertpoint = playersinfo[z][7].indexOf('</div>', (inspoint1))+6;
                            var pre = playersinfo[z][7].substring(0, insertpoint);
                            var post = playersinfo[z][7].substring(insertpoint);
                            strholding = '<a href="/game/boost_player.pl?player_id=' + playersinfo[z][0] + '">Boost(' + boostsavail + ') Cost:' + boostcost + '</a>';
                            playersinfo[z][7] = pre + '<div class="player_xp boostclass">' + strholding + '</div>' + post;
                        };
                    };
                }
                
            });

            /*var total = $('td[class="account_value"]:last').text();
            total = total.substring(0,total.indexOf(' ('));
            */
            var total = 0;
            $('td[class="account_value"]').each(function(j){
                var selecttext = $(this).text();
                if (selecttext.indexOf('spend') > 0) {
                    total += parseInt(selecttext.substring(0,selecttext.indexOf(' (')));
                }
            })

            var newrow = document.createElement('tr');
            var newcell1 = document.createElement('td');
            var newcell2 = document.createElement('td');
            newcell1.setAttribute('class','account_head');
            newcell2.setAttribute('class','account_value');
            newcell1.innerHTML = 'Boost Cost:';
            newcell2.innerHTML = boosttotal;
            var newrow2 = document.createElement('tr');
            var newcell21 = document.createElement('td');
            var newcell22 = document.createElement('td');
            newcell21.setAttribute('class','account_head');
            newcell22.setAttribute('class','account_value');
            newcell21.innerHTML = 'Remaining Flex:';
            newcell22.innerHTML = parseInt(total) - parseInt(boosttotal);

            newrow.appendChild(newcell1);
            newrow.appendChild(newcell2);
            newrow2.appendChild(newcell21);
            newrow2.appendChild(newcell22);

            var insertpos = $('tr',$('#my_account_content')).size();
            insertpos = insertpos - 2;

            $('tr:eq(' + insertpos + ')',$('#my_account_content')).before(newrow2);
            $('tr:eq(' + insertpos + ')',$('#my_account_content')).before(newrow);
            //$('tr:last',$('#my_account_content')).before(newrow);

            applyChanges();

        });

    }

    function getTeamSpreads(){
        $('a[href*="/game/compare_teams.pl?team1="]').each(function(i){
            teamslist[i] = new Array;
            teamslist[i][0] = $(this).attr('href');
            teamslist[i][1] = teamslist[i][0].substr(teamslist[i][0].indexOf('team2=')+6,(teamslist[i][0].length - (teamslist[i][0].indexOf('team2=')+6)));
            teamslist[i][2] = '';
        })
        teamslist.sort(value);

        var pulllinks = new Array;
        pullhold = '';
        for (var t=0;t<teamslist.length;t++) {
            if (pullhold != teamslist[t][1]){
                pulllinks.push(teamslist[t][0]);
            }
            pullhold = teamslist[t][1];
        }
        loopcount = pulllinks.length;
        var overall1 = '';
        var overall2 = '';
        var counter = 0;
        for (var q=0;q<pulllinks.length;q++) {
            overall1 = '';
            overall2 = '';
            var myteamid ='';
            $.get(pulllinks[q],function(returned_data){
                $('div[class*="team_content"]', returned_data).each(function(t){
                    if (t==0) {
                        overall1 = $('div[class*="rating_bar_fill"]:first', $(this)).html();
                    }else{
                        myteamid = $('img[src*="/game/team_pic.pl?team_id="]:first', $(this)).attr('src');
                        myteamid = myteamid.substring(myteamid.indexOf('team_id=')+8,myteamid.length);
                        overall2 = $('div[class*="rating_bar_fill"]:first', $(this)).html();
                    }
                });
                overall1 = parseInt(overall1);
                overall2 = parseInt(overall2);
                var spread = overall2 - overall1;
                if (spread > 0) {
                    spread = '+' + spread;
                }
                var overallstring = '(' + overall2 + ')' + '(' + spread + ')';
                // add overallstring to all rows in teamslist array that match
                for (var z=0;z<teamslist.length;z++) {
                    if (teamslist[z][1] == myteamid) {
                        teamslist[z][2] = overallstring;
                    }
                }
                counter++;
                if (counter==pulllinks.length) {
                    for (var wi=0;wi<playersinfo.length;wi++) {
                        for (var zz=0;zz<teamslist.length;zz++) {
                            // update team overall ranking
                            if (playersinfo[wi][7].indexOf(teamslist[zz][0].replace(/&/g,'&amp;'))>-1){

                                var part1 = playersinfo[wi][7].substring(0,playersinfo[wi][7].indexOf('(',playersinfo[wi][7].indexOf(teamslist[zz][0].replace(/&/g,'&amp;'))));
                                var part2 = playersinfo[wi][7].substring(playersinfo[wi][7].indexOf('(',playersinfo[wi][7].indexOf(teamslist[zz][0].replace(/&/g,'&amp;'))));
                                playersinfo[wi][7] = part1+ '<span class="opponentspread">' + teamslist[zz][2]+ '</span>'+part2;
                                break;
                            };
                        };
                        
                    };
                    applyChanges();
                    $('a[href*="/game/compare_teams.pl?team1="]', 'div[class="team"]').each(function(qw){
                        var thislink =$(this).html();
                        var teamlink = $(this).attr('href');
                        teamlink = teamlink.substr(teamlink.indexOf('team2=')+6,(teamlink.length - (teamlink.indexOf('team2=')+6)));
                        for (var teamloop =0;teamloop<teamslist.length;teamloop++) {
                            if (teamslist[teamloop][1]==teamlink) {
                                thislink += ' ' + teamslist[teamloop][2];
                                $(this).html(thislink);
                                break;
                            }
                        }
                    });
                }
                },'html');

        };
    }

    function buildSortDiv(){
        var sort1 = document.createElement('select');
        sort1.setAttribute('id', 'DDCsort1');
        sort1.options[0]=new Option('No Filter', '', true, true)
        var sort2 = document.createElement('select');
        sort2.setAttribute('id', 'DDCsort2');
        sort2.options[0]=new Option('No Filter', '', true, true)
        var sort1dir = document.createElement('select');
        sort1dir.setAttribute('id', 'DDCsort1dir');
        sort1dir.options[0]=new Option('Ascending', '0', true, true)
        sort1dir.options[1]=new Option('Descending', '1', false, false)
        sort1.options[1] = new Option('Date Created',0);
        sort2.options[1] = new Option('Date Created',0);
        sort1.options[2] = new Option('Name',1);
        sort2.options[2] = new Option('Name',1);
        sort1.options[3] = new Option('Team',3);
        sort2.options[3] = new Option('Team',3);
        sort1.options[4] = new Option('Level',5);
        sort2.options[4] = new Option('Level',5);
        sort1.options[5] = new Option('XP',6);
        sort2.options[5] = new Option('XP',6);
        sort1.options[6] = new Option('Skill Points',9);
        sort2.options[6] = new Option('Skill Points',9);
        sort1.options[7] = new Option('Vet XP',14);
        sort2.options[7] = new Option('Vet XP',14);
        sort1.options[8] = new Option('Position',4);
        sort2.options[8] = new Option('Position',4);
        sort1.options[9] = new Option('Training Pts',10);
        sort2.options[9] = new Option('Training Pts',10);
        sort1.options[10] = new Option('Next Game',8);
        sort2.options[10] = new Option('Next Game',8);

        optioncount=11;
        for (var q=0;q<settingsarray.length;q++) {
            if (settingsarray[q] == '1') {
                switch(q) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    sort1.options[optioncount] = new Option('Boosts',12);
                    sort2.options[optioncount] = new Option('Boosts',12);
                    optioncount++;
                    sort1.options[optioncount] = new Option('Boosts Costs',21);
                    sort2.options[optioncount] = new Option('Boosts Costs',21);
                    optioncount++;
                    break;
                case 3:
                    break;
                case 4:

                    break;
                case 5:
                    break;
                case 6:
                    break;
                case 7:
                    break;
                case 8:
                    break;
                case 9:
                    sort1.options[optioncount] = new Option('Bonus Tokens',15);
                    sort2.options[optioncount] = new Option('Bonus Tokens',15);
                    optioncount++;
                    break;
                case 10:
                    sort1.options[optioncount] = new Option('Vet Points',19);
                    sort2.options[optioncount] = new Option('Vet Points',19);
                    optioncount++;
                    break;
                case 11:
                    sort1.options[optioncount] = new Option('Age',20);
                    sort2.options[optioncount] = new Option('Age',20);
                    optioncount++;
                    break;
                    break;
                case 12:
                    break;
                case 13:
                    break;
                case 14:
                    break;
                }

            }
        }
        var sorttext1 = document.createTextNode('Sort By:');
        var sorttext2 = document.createTextNode('Sub-Sort By:');
        sort1.addEventListener('change',dosort, false);
        sort2.addEventListener('change',dosort, false);
        sort1dir.addEventListener('change',dosort, false);
        var spanitems = document.createElement('span');
        spanitems.style.fontSize = '11px';
        spanitems.appendChild(sorttext1);
        spanitems.appendChild(sort1);
        spanitems.appendChild(sort1dir);
        spanitems.appendChild(sorttext2);
        spanitems.appendChild(sort2);
        $('#sort_players').prepend(spanitems);
        var sortcookie = readCookie("DDCSort");
        if (sortcookie!=null) {
            var cooksplit = sortcookie.split(',');
            $('#DDCsort1 option[value="'+cooksplit[0]+'"]').attr('selected', 'selected');
            $('#DDCsort2 option[value="'+cooksplit[1]+'"]').attr('selected', 'selected');
            $('#DDCsort1dir option[value="'+cooksplit[2]+'"]').attr('selected', 'selected');
            dosort();
        }
    }

    function dosort(){
        var sortstring ='';
        $('select[id*="DDCsort"]').each(function(po){
            
            
            if ($(this).attr('id') == 'DDCsort1dir') {
                sortdirection = $(this).attr('value');
            }else{
                sortstring += $(this).attr('value') + ',';
                var selecteditems = $(this).attr('value');
                if ($(this).attr('id')=='DDCsort1') {
                    $('#DDCsort2>option').each(function(z){
                        $(this).show();
                        if ($(this).attr('value')==selecteditems) {
                            $(this).hide();
                        }
                    })
                }else{
                    $('#DDCsort1>option').each(function(z){
                        $(this).show();
                        if ($(this).attr('value')==selecteditems) {
                            $(this).hide();
                        }
                    })
                }
            }
        });
        var sortstringlength = sortstring.length;
        sortstring = sortstring.substring(0,(sortstringlength-1));
        createCookie('DDCSort',sortstring + ',' + sortdirection,90);
        sortitems = sortstring;
        playersinfo.sort(value);
        applyChanges();
    }

    function getPlayersInfo(){
        // retrieve player info
        for (var c=0;c<playersinfo.length;c++) {
            $.get("/game/player.pl?player_id=" + playersinfo[c][0],function(returned_data){
                
                // get current playerid
                var curplayerid = $('#tab_player_profile>a',returned_data).attr('href');
                curplayerid = curplayerid.substring(curplayerid.indexOf('player_id=')+10);
                var playerpoints = $('.player_points_value',returned_data).html();
                var playerpointssplit = playerpoints.split('<td>');
                var shoppingtokens = '0'; //playerpointssplit[5].substring(0,playerpointssplit[5].indexOf('<'));
                var bonustokens = playerpointssplit[4].substring(0,playerpointssplit[4].indexOf('<'));
                var playervetpts = returned_data.substring(returned_data.indexOf('>',returned_data.indexOf('<a href="/game/vet_skills.pl?player_id=')+5)+1,returned_data.indexOf('</a>',returned_data.indexOf('<a href="/game/vet_skills.pl?player_id=')+5));
                var playersplit1= returned_data.split('"position');
                var playerposition = playersplit1[1].substring(playersplit1[1].indexOf('>')+1,playersplit1[1].indexOf('<'));
				var playerarc = $('img[src*="/images/game/archetypes"]:first',returned_data).parent().html();
                if (settingsarray[6]=='1') {
                    var playersplit2= returned_data.split('stat_value_tall');
                    var StatsArray = new Array(14);
                    var StatsNames = new Array(14);
                    StatsNames[0] = 'Str:';
                    StatsNames[1] = 'Blk:';
                    StatsNames[2] = 'Spe:';
                    StatsNames[3] = 'Tac:';
                    StatsNames[4] = 'Agi:';
                    StatsNames[5] = 'Thr:';
                    StatsNames[6] = 'Jmp:';
                    StatsNames[7] = 'Cat:';
                    StatsNames[8] = 'Sta:';
                    StatsNames[9] = 'Car:';
                    StatsNames[10] = 'Vis:';
                    StatsNames[11] = 'Kic:';
                    StatsNames[12] = 'Con:';
                    StatsNames[13] = 'Pun:';
                    
                    var attributes = new Array(16);
                    
                    attributes[0] = new Array(2);
                    attributes[0][0] = new Array(5);
                    attributes[0][0][0] = 0;
                    attributes[0][0][1] = 5;
                    attributes[0][0][2] = 10;
                    attributes[0][0][3] = 12;
                    attributes[0][0][4] = 8;
                    attributes[0][1] = new Array(5);
                    attributes[0][1][0] = 4;
                    attributes[0][1][1] = 6;
                    attributes[0][1][2] = 9;
                    attributes[0][1][3] = 2;
                    attributes[0][1][4] = 7;
                    attributes[1] = new Array(2);
                    attributes[1][0] = new Array(6);
                    attributes[1][0][0] = 4;
                    attributes[1][0][1] = 2;
                    attributes[1][0][2] = 0;
                    attributes[1][0][3] = 10;
                    attributes[1][0][4] = 9;
                    attributes[1][0][5] = 12;
                    attributes[1][1] = new Array(5);
                    attributes[1][1][0] = 7;
                    attributes[1][1][1] = 1;
                    attributes[1][1][2] = 6;
                    attributes[1][1][3] = 5;
                    attributes[1][1][4] = 8;
                    attributes[2] = new Array(2);
                    attributes[2][0] = new Array(4);
                    attributes[2][0][0] = 0;
                    attributes[2][0][1] = 1;
                    attributes[2][0][2] = 4;
                    attributes[2][0][3] = 9;
                    attributes[2][1] = new Array(5);
                    attributes[2][1][0] = 12;
                    attributes[2][1][1] = 10;
                    attributes[2][1][2] = 7;
                    attributes[2][1][3] = 3;
                    attributes[2][1][4] = 8;
                    attributes[3] = new Array(2);
                    attributes[3][0] = new Array(2);
                    attributes[3][0][0] = 0;
                    attributes[3][0][1] = 1;
                    attributes[3][1] = new Array(5);
                    attributes[3][1][0] = 12;
                    attributes[3][1][1] = 4;
                    attributes[3][1][2] = 10;
                    attributes[3][1][3] = 3;
                    attributes[3][1][4] = 8;
                    attributes[4] = new Array(2);
                    attributes[4][0] = new Array(3);
                    attributes[4][0][0] = 0;
                    attributes[4][0][1] = 1;
                    attributes[4][0][2] = 12;
                    attributes[4][1] = new Array(4);
                    attributes[4][1][0] = 4;
                    attributes[4][1][1] = 10;
                    attributes[4][1][2] = 3;
                    attributes[4][1][3] = 8;
                    attributes[5] = new Array(2);
                    attributes[5][0] = new Array(5);
                    attributes[5][0][0] = 0;
                    attributes[5][0][1] = 1;
                    attributes[5][0][2] = 12;
                    attributes[5][0][3] = 4;
                    attributes[5][0][4] = 10;
                    attributes[5][1] = new Array(2);
                    attributes[5][1][0] = 3;
                    attributes[5][1][1] = 8;
                    attributes[6] = new Array(2);
                    attributes[6][0] = new Array(4);
                    attributes[6][0][0] = 0;
                    attributes[6][0][1] = 1;
                    attributes[6][0][2] = 7;
                    attributes[6][0][3] = 10;
                    attributes[6][1] = new Array(6);
                    attributes[6][1][0] = 4;
                    attributes[6][1][1] = 2;
                    attributes[6][1][2] = 12;
                    attributes[6][1][3] = 9;
                    attributes[6][1][4] = 8;
                    attributes[6][1][5] = 3;
                    attributes[7] = new Array(2);
                    attributes[7][0] = new Array(6);
                    attributes[7][0][0] = 2;
                    attributes[7][0][1] = 4;
                    attributes[7][0][2] = 7;
                    attributes[7][0][3] = 6;
                    attributes[7][0][4] = 10;
                    attributes[7][0][5] = 8;
                    attributes[7][1] = new Array(2);
                    attributes[7][1][0] = 12;
                    attributes[7][1][1] = 9;
                    attributes[8] = new Array(2);
                    attributes[8][0] = new Array(3);
                    attributes[8][0][0] = 0;
                    attributes[8][0][1] = 3;
                    attributes[8][0][2] = 4;
                    attributes[8][1] = new Array(5);
                    attributes[8][1][0] = 1;
                    attributes[8][1][1] = 12;   
                    attributes[8][1][2] = 10;
                    attributes[8][1][3] = 2;
                    attributes[8][1][4] = 8;
                    attributes[9] = new Array(2);
                    attributes[9][0] = new Array(4);
                    attributes[9][0][0] = 0;
                    attributes[9][0][1] = 3;
                    attributes[9][0][2] = 4;
                    attributes[9][0][3] = 2;
                    attributes[9][1] = new Array(5);
                    attributes[9][1][0] = 1;
                    attributes[9][1][1] = 12;   
                    attributes[9][1][2] = 10;
                    attributes[9][1][3] = 6;
                    attributes[9][1][4] = 8;
                    attributes[10] = new Array(2);
                    attributes[10][0] = new Array(6);
                    attributes[10][0][0] = 0;
                    attributes[10][0][1] = 10;
                    attributes[10][0][2] = 3;
                    attributes[10][0][3] = 4;
                    attributes[10][0][4] = 12;
                    attributes[10][0][5] = 8;
                    attributes[10][1] = new Array(4);
                    attributes[10][1][0] = 2;
                    attributes[10][1][1] = 6;   
                    attributes[10][1][2] = 1;
                    attributes[10][1][3] = 7;
                    attributes[11] = new Array(2);
                    attributes[11][0] = new Array(6);
                    attributes[11][0][0] = 2;
                    attributes[11][0][1] = 4;
                    attributes[11][0][2] = 6;
                    attributes[11][0][3] = 10;
                    attributes[11][0][4] = 7;
                    attributes[11][0][5] = 8;
                    attributes[11][1] = new Array(4);
                    attributes[11][1][0] = 0;
                    attributes[11][1][1] = 3;   
                    attributes[11][1][2] = 12;
                    attributes[11][1][3] = 9;
                    attributes[12] = new Array(2);
                    attributes[12][0] = new Array(5);
                    attributes[12][0][0] = 0;
                    attributes[12][0][1] = 2;
                    attributes[12][0][2] = 10;
                    attributes[12][0][3] = 3;
                    attributes[12][0][4] = 8;
                    attributes[12][1] = new Array(6);
                    attributes[12][1][0] = 4;
                    attributes[12][1][1] = 6;   
                    attributes[12][1][2] = 12;
                    attributes[12][1][3] = 1;
                    attributes[12][1][4] = 7;
                    attributes[12][1][5] = 9;
                    attributes[13] = new Array(2);
                    attributes[13][0] = new Array(5);
                    attributes[13][0][0] = 2;
                    attributes[13][0][1] = 10;
                    attributes[13][0][2] = 3;
                    attributes[13][0][3] = 7;
                    attributes[13][0][4] = 8;
                    attributes[13][1] = new Array(6);
                    attributes[13][1][0] = 4;
                    attributes[13][1][1] = 6;   
                    attributes[13][1][2] = 0;
                    attributes[13][1][3] = 12;
                    attributes[13][1][4] = 1;
                    attributes[13][1][5] = 9;
                    attributes[14] = new Array(2);
                    attributes[14][0] = new Array(2);
                    attributes[14][0][0] = 11;
                    attributes[14][0][1] = 12;
                    attributes[14][1] = new Array(6);
                    attributes[14][1][0] = 0;
                    attributes[14][1][1] = 10;   
                    attributes[14][1][2] = 4;
                    attributes[14][1][3] = 2;
                    attributes[14][1][4] = 6;
                    attributes[14][1][5] = 5;
                    attributes[15] = new Array(2);
                    attributes[15][0] = new Array(2);
                    attributes[15][0][0] = 13;
                    attributes[15][0][1] = 12;
                    attributes[15][1] = new Array(6);
                    attributes[15][1][0] = 0;
                    attributes[15][1][1] = 10;   
                    attributes[15][1][2] = 4;
                    attributes[15][1][3] = 2;
                    attributes[15][1][4] = 6;
                    attributes[15][1][5] = 5;
                    
                    for (var q=1;q<playersplit2.length;q++) {
                      StatsArray[q-1]=playersplit2[q].substring(playersplit2[q].indexOf('>')+1,playersplit2[q].indexOf('<'));
                    }
                    
                    var htmlstringadd = '';
                    switch(playerposition) {
                    case 'QB':
                      htmlstringadd = '<font size="1" color="green">';
                      for (var w=0;w<attributes[0][0].length;w++) {
                          htmlstringadd += StatsNames[attributes[0][0][w]] + StatsArray[attributes[0][0][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd+='</font><br><font size="1" color="black">';
                      for (var w=0;w<attributes[0][1].length;w++) {
                          htmlstringadd += StatsNames[attributes[0][1][w]] + StatsArray[attributes[0][1][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd += '</font>';
                      break;
                    case 'HB':
                      htmlstringadd = '<font size="1" color="green">';
                      for (var w=0;w<attributes[1][0].length;w++) {
                          htmlstringadd += StatsNames[attributes[1][0][w]] + StatsArray[attributes[1][0][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd+='</font><br><font size="1" color="black">';
                      for (var w=0;w<attributes[1][1].length;w++) {
                          htmlstringadd += StatsNames[attributes[1][1][w]] + StatsArray[attributes[1][1][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd += '</font>';
                      break;
                    case 'FB':
                      htmlstringadd = '<font size="1" color="green">';
                      for (var w=0;w<attributes[2][0].length;w++) {
                          htmlstringadd += StatsNames[attributes[2][0][w]] + StatsArray[attributes[2][0][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd+='</font><br><font size="1" color="black">';
                      for (var w=0;w<attributes[2][1].length;w++) {
                          htmlstringadd += StatsNames[attributes[2][1][w]] + StatsArray[attributes[2][1][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd += '</font>';
                      break;
                    case 'C':
                      htmlstringadd = '<font size="1" color="green">';
                      for (var w=0;w<attributes[3][0].length;w++) {
                          htmlstringadd += StatsNames[attributes[3][0][w]] + StatsArray[attributes[3][0][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd+='</font><br><font size="1" color="black">';
                      for (var w=0;w<attributes[3][1].length;w++) {
                          htmlstringadd += StatsNames[attributes[3][1][w]] + StatsArray[attributes[3][1][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd += '</font>';
                      break;
                    case 'G':
                      htmlstringadd = '<font size="1" color="green">';
                      for (var w=0;w<attributes[4][0].length;w++) {
                          htmlstringadd += StatsNames[attributes[4][0][w]] + StatsArray[attributes[4][0][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd+='</font><br><font size="1" color="black">';
                      for (var w=0;w<attributes[4][1].length;w++) {
                          htmlstringadd += StatsNames[attributes[4][1][w]] + StatsArray[attributes[4][1][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd += '</font>';
                      break;
                    case 'OT':
                      htmlstringadd = '<font size="1" color="green">';
                      for (var w=0;w<attributes[5][0].length;w++) {
                          htmlstringadd += StatsNames[attributes[5][0][w]] + StatsArray[attributes[5][0][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd+='</font><br><font size="1" color="black">';
                      for (var w=0;w<attributes[5][1].length;w++) {
                          htmlstringadd += StatsNames[attributes[5][1][w]] + StatsArray[attributes[5][1][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd += '</font>';
                      break;
                    case 'TE':
                      htmlstringadd = '<font size="1" color="green">';
                      for (var w=0;w<attributes[6][0].length;w++) {
                          htmlstringadd += StatsNames[attributes[6][0][w]] + StatsArray[attributes[6][0][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd+='</font><br><font size="1" color="black">';
                      for (var w=0;w<attributes[6][1].length;w++) {
                          htmlstringadd += StatsNames[attributes[6][1][w]] + StatsArray[attributes[6][1][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd += '</font>';
                      break;
                    case 'WR':
                      htmlstringadd = '<font size="1" color="green">';
                      for (var w=0;w<attributes[7][0].length;w++) {
                          htmlstringadd += StatsNames[attributes[7][0][w]] + StatsArray[attributes[7][0][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd+='</font><br><font size="1" color="black">';
                      for (var w=0;w<attributes[7][1].length;w++) {
                          htmlstringadd += StatsNames[attributes[7][1][w]] + StatsArray[attributes[7][1][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd += '</font>';
                      break;
                    case 'DT':
                      htmlstringadd = '<font size="1" color="green">';
                      for (var w=0;w<attributes[8][0].length;w++) {
                          htmlstringadd += StatsNames[attributes[8][0][w]] + StatsArray[attributes[8][0][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd+='</font><br><font size="1" color="black">';
                      for (var w=0;w<attributes[8][1].length;w++) {
                          htmlstringadd += StatsNames[attributes[8][1][w]] + StatsArray[attributes[8][1][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd += '</font>';
                      break;
                    case 'DE':
                      htmlstringadd = '<font size="1" color="green">';
                      for (var w=0;w<attributes[9][0].length;w++) {
                          htmlstringadd += StatsNames[attributes[9][0][w]] + StatsArray[attributes[9][0][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd+='</font><br><font size="1" color="black">';
                      for (var w=0;w<attributes[9][1].length;w++) {
                          htmlstringadd += StatsNames[attributes[9][1][w]] + StatsArray[attributes[9][1][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd += '</font>';
                      break;
                    case 'LB':
                      htmlstringadd = '<font size="1" color="green">';
                      for (var w=0;w<attributes[10][0].length;w++) {
                          htmlstringadd += StatsNames[attributes[10][0][w]] + StatsArray[attributes[10][0][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd+='</font><br><font size="1" color="black">';
                      for (var w=0;w<attributes[10][1].length;w++) {
                          htmlstringadd += StatsNames[attributes[10][1][w]] + StatsArray[attributes[10][1][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd += '</font>';
                      break;
                    case 'CB':
                      htmlstringadd = '<font size="1" color="green">';
                      for (var w=0;w<attributes[11][0].length;w++) {
                          htmlstringadd += StatsNames[attributes[11][0][w]] + StatsArray[attributes[11][0][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd+='</font><br><font size="1" color="black">';
                      for (var w=0;w<attributes[11][1].length;w++) {
                          htmlstringadd += StatsNames[attributes[11][1][w]] + StatsArray[attributes[11][1][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd += '</font>';
                      break;
                    case 'SS':
                      htmlstringadd = '<font size="1" color="green">';
                      for (var w=0;w<attributes[12][0].length;w++) {
                          htmlstringadd += StatsNames[attributes[12][0][w]] + StatsArray[attributes[12][0][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd+='</font><br><font size="1" color="black">';
                      for (var w=0;w<attributes[12][1].length;w++) {
                          htmlstringadd += StatsNames[attributes[12][1][w]] + StatsArray[attributes[12][1][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd += '</font>';
                      break;
                    case 'FS':
                      htmlstringadd = '<font size="1" color="green">';
                      for (var w=0;w<attributes[13][0].length;w++) {
                          htmlstringadd += StatsNames[attributes[13][0][w]] + StatsArray[attributes[13][0][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd+='</font><br><font size="1" color="black">';
                      for (var w=0;w<attributes[13][1].length;w++) {
                          htmlstringadd += StatsNames[attributes[13][1][w]] + StatsArray[attributes[13][1][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd += '</font>';
                      break;
                    case 'K':
                      htmlstringadd = '<font size="1" color="green">';
                      for (var w=0;w<attributes[14][0].length;w++) {
                          htmlstringadd += StatsNames[attributes[14][0][w]] + StatsArray[attributes[14][0][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd+='</font><br><font size="1" color="black">';
                      for (var w=0;w<attributes[14][1].length;w++) {
                          htmlstringadd += StatsNames[attributes[14][1][w]] + StatsArray[attributes[14][1][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd += '</font>';
                      break;
                    case 'P':
                      htmlstringadd = '<font size="1" color="green">';
                      for (var w=0;w<attributes[15][0].length;w++) {
                          htmlstringadd += StatsNames[attributes[15][0][w]] + StatsArray[attributes[15][0][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd+='</font><br><font size="1" color="black">';
                      for (var w=0;w<attributes[15][1].length;w++) {
                          htmlstringadd += StatsNames[attributes[15][1][w]] + StatsArray[attributes[15][1][w]] +', ';
                      }
                      htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
                      htmlstringadd += '</font>';
                      break;
                    
                    }
                }
                // retrieve needed stats
                var playercash = $('td[class="player_money"]',returned_data).html()
                playercash = playercash.substring(playercash.indexOf('</span>') + 8,playercash.indexOf('&nbsp;'));
                var playercontract = $('td[class*="vital_data"]:eq(3)',returned_data).text()
                playercontract = playercontract.substring(playercontract.indexOf('Exp. ')+5);
                var playerage = $('td[class*="vital_data"]:eq(2)',returned_data).text();
                playerage = playerage.substring(1,playerage.indexOf('d old'));
                playerage = parseInt(playerage);

                var playermorale = $('div[class="rating_bar"]:last',returned_data).html()
                var playerscouting = '';
                var playerscoutingbars = new Array;
                var playerscoutingheads = new Array;
                $('div[class="rating_head"]',$('#player_scouting_report',returned_data)).each(function(we){
                    playerscoutingheads.push($(this).html());
                });
                $('div[class="rating_bar"]',$('#player_scouting_report',returned_data)).each(function(we){
                    playerscoutingbars.push($(this).html());
                });
                for (var me =0; me<playerscoutingbars.length;me++) {
                    var baramount = playerscoutingbars[me].substring(playerscoutingbars[me].indexOf('style="width: ')+14,playerscoutingbars[me].indexOf('%;">'));
                    playerscouting += '<div class="rating_bar"><span style="font-size: 4px;">' + playerscoutingbars[me].replace('&nbsp;','<font color="black">' + baramount + '<br>' + playerscoutingheads[me]) + '</font></span></div>';
                };
                
                var playerfame = $('.current_stats_fame',returned_data).text();

                playerfame = playerfame.replace('$','');

                // modify the HTML in [7] to be updated 

                for (var te = 0; te < playersinfo.length;te++) {
                    if (parseInt(curplayerid) == parseInt(playersinfo[te][0])) {
                        //update array items for sorting
                        playersinfo[te][11] = parseInt(shoppingtokens);
                        playersinfo[te][15] = parseInt(bonustokens);
                        playersinfo[te][19] = parseInt(playervetpts);
                        playersinfo[te][20] = playerage;
                        if (isNaN(parseInt(playervetpts))==true) {
                            playersinfo[te][19] = 0;
                        }


                        //restructure player table
                        var rowsplit = playersinfo[te][7].split('<tr>');
                        for (var re=0;re<rowsplit.length;re++) {
                            
                            if (rowsplit[re].indexOf('<td class="simple_player_vital_head">Team:</td>')>-1) {
                                var teamcells = rowsplit[re].substring(0,rowsplit[re].indexOf('</tr>'));
                                teamcells = teamcells.replace('<td class="simple_player_vital_head">','<td class="simple_player_vital_head" width="5%">');
                                teamcells = teamcells.replace('<td>','<td width="45%">');
                            };
                            if (rowsplit[re].indexOf('<td class="simple_player_vital_head">Last Game:</td>')>-1) {
                                var lastcells = rowsplit[re].substring(0,rowsplit[re].indexOf('</tr>'));
                                lastcells = lastcells.replace('Last Game:','Last:');
                                lastcells = lastcells.replace('<td class="simple_player_vital_head">','<td class="simple_player_vital_head" width="5%">');
                                lastcells = lastcells.replace('<td>','<td width="45%">');
                            }
                            if (rowsplit[re].indexOf('<td class="simple_player_vital_head">Next Game: </td>')>-1) {
                                var nextcells = rowsplit[re].substring(0,rowsplit[re].indexOf('</tr>'));
                                nextcells = nextcells.replace('Next Game:','Next:');
                                var cellsplit = nextcells.split('</td>');
                                nextcells = cellsplit[0] + '</td>' + cellsplit[1].replace('<td>', '<td colspan=3>') + '</td>';
                            }
                        }
                        var endcap = playersinfo[te][7].substring(playersinfo[te][7].indexOf('</table>'));
                        playersinfo[te][7] = rowsplit[0];
                        if (settingsarray[12]=='1') {
                            playersinfo[te][7] += rowsplit[1];
                        }
                        if (typeof(lastcells)!='undefined') {
                            playersinfo[te][7] += '<tr>' + teamcells + lastcells + '</tr>';
                        }else{
                            playersinfo[te][7] += '<tr>' + teamcells + '</tr>';
                        }
                        if (typeof(nextcells)!='undefined'){
                            playersinfo[te][7] += '<tr>' + nextcells + '</tr>';
                        }
                        playersinfo[te][7] += '<tr><td class="simple_player_vital_head" width="5%">Energy:</td><td width="45%">' + playersinfo[te][18] + '</td><td class="simple_player_vital_head" width="5%">Morale:</td><td width="45%">' + playermorale + '</td></tr>' + endcap;
                        
                        if (settingsarray[10]=='1') {
                            if (isNaN(parseInt(playervetpts))==false) {
                                playersinfo[te][7] = playersinfo[te][7].replace('<a href="/game/vet_skills.pl?player_id='+playersinfo[te][0]+'"><img src="/images/game/design/veteran_pt_button.gif"></a>','');
                                playervetpts = parseInt(playervetpts);
                                var pre1 = playersinfo[te][7].substring(0,playersinfo[te][7].indexOf('</table>'));
                                var post1 = playersinfo[te][7].substring(playersinfo[te][7].indexOf('</table>'));
                                if (settingsarray[11]=='1') {
                                    playersinfo[te][7] =  pre1+ '<tr><td width="5%"><b>Vet Pts:</b></td><td align="left"><a href="/game/vet_skills.pl?player_id='+playersinfo[te][0]+'">'+playervetpts+'</a></td><td width="5%"><b>Age:</b></td><td align="left">'+playerage+' Days</td></tr>' + post1;
                                }else{
                                    playersinfo[te][7] = pre1+ '<tr><td width="5%"><b>Vet Pts:</b></td><td colspan=3 align="left"><a href="/game/vet_skills.pl?player_id='+playersinfo[te][0]+'">'+playervetpts+'</a></td></tr>' + post1;
                                }
                            }else{
                                var pre1 = playersinfo[te][7].substring(0,playersinfo[te][7].indexOf('</table>'));
                                var post1 = playersinfo[te][7].substring(playersinfo[te][7].indexOf('</table>'));
                                if (settingsarray[11]=='1') {
                                    playersinfo[te][7] =  pre1 + '<tr><td width="5%"><b>Age:</b></td><td colspan=3 align="left">'+playerage+' Days</td></tr>' + post1;
                                }
                            }
                        }else{
                            var pre1 = playersinfo[te][7].substring(0,playersinfo[te][7].indexOf('</table>'));
                            var post1 = playersinfo[te][7].substring(playersinfo[te][7].indexOf('</table>'));

                            if (settingsarray[11]=='1') {
                                playersinfo[te][7] =  pre1 + '<tr><td width="5%"><b>Age:</b></td><td colspan=3 align="left">'+playerage+' Days</td></tr>' + post1;
                            }
                        }
                        if (settingsarray[5]=='1') {
                            var fontsize = 2;
                            var lastcap = playersinfo[te][7].substring(playersinfo[te][7].indexOf('</table>'));
                            if (playercontract.indexOf('(No Trade)')>-1) {
                                fontsize = 1;
                            }
                            playersinfo[te][7] = playersinfo[te][7].substring(0,playersinfo[te][7].indexOf('</table>')) + '<tr><td width="5%"><b>Contract:</b></td><td width="45%"><font size="'+fontsize+'">' + playercontract + '</font></td>';
                            if (settingsarray[8]=='1'){
                                playersinfo[te][7] += '<td width="5%"><b>Fame:</b></td><td width="45%" align="left">' + playerfame + '</td></tr>' + lastcap;
                            }
                            playersinfo[te][7] += lastcap;
                        }
                        if (settingsarray[6]=='1') {
                            var pre1 = playersinfo[te][7].substring(0,playersinfo[te][7].indexOf('</table>'));
                            var post1 = playersinfo[te][7].substring(playersinfo[te][7].indexOf('</table>'));
                            playersinfo[te][7] = pre1 + '<tr><td colspan=4>' + htmlstringadd + '</td></tr>' + post1;
                        }

                        if (settingsarray[7]=='1') {
                            playersinfo[te][7] = playersinfo[te][7].substring(0,playersinfo[te][7].indexOf('</table>')) + '<tr><td width="5%"><br><b>Ratings:</b><br></td><td colspan=3 align="left">' + playerscouting + '</td></tr>' + playersinfo[te][7].substring(playersinfo[te][7].indexOf('</table>'));
                        }

                        if (settingsarray[5]=='0' && settingsarray[8]=='1') {
                            playersinfo[te][7] = playersinfo[te][7].substring(0,playersinfo[te][7].indexOf('</table>')) + '<tr><td width="5%"><b>Fame:</b></td><td colspan=3 align="left">' + playerfame + '</td></tr>' + playersinfo[te][7].substring(playersinfo[te][7].indexOf('</table>'));
                        }

                        

                        if (settingsarray[12]=='1'){
                             playersinfo[te][7] = playersinfo[te][7].replace('Shop</a>','Shop('+shoppingtokens+')</a>');
                             if (settingsarray[9]=='1') {
                                playersinfo[te][7] = playersinfo[te][7].replace('Bonus</a>','Bonus('+bonustokens+')</a>');
                             }
                        }else{
                            if (settingsarray[9]=='1') {
                                playersinfo[te][7] = playersinfo[te][7].substring(0,playersinfo[te][7].indexOf('</table>')) + '<tr><td width="5%"><b>Bonus:</b></td><td colspan=3 align="left"><a href="/game/bonus_tokens.pl?player_id='+playersinfo[te][0] + '">' + bonustokens + '</a></td></tr>' + playersinfo[te][7].substring(playersinfo[te][7].indexOf('</table>'));
                            }
                        }
                        
                        
                        
                        playersinfo[te][11] = shoppingtokens;
                        playersinfo[te][15] = bonustokens;
                        playersinfo[te][16] = htmlstringadd;
                        if (settingsarray[4]=='1') {
                            var inspoint1 = playersinfo[te][7].indexOf('<div class="player_xp">',playersinfo[te][7].indexOf('<div class="player_xp">')+23);
                            var insertpoint = playersinfo[te][7].indexOf('</div>', (inspoint1))+6;
                            var pre = playersinfo[te][7].substring(0, insertpoint);
                            var post = playersinfo[te][7].substring(insertpoint);
                            playersinfo[te][7] = pre + '<div class="player_xp cashclass"> Cash:' + playercash + '</div>' + post;
                        }
						
						if (typeof(playerarc)!= 'undefined') {
							var prearc = playersinfo[te][7].substring(0, playersinfo[te][7].indexOf('<div id="level_button_container">'));
							var postarc = playersinfo[te][7].substring(playersinfo[te][7].indexOf('<div id="level_button_container">'), playersinfo[te][7].length);
							playersinfo[te][7] = prearc + playerarc + postarc;
						}
						
                        
                    };
                };
                
                playercount++;
                
                if (playercount == playersinfo.length) {
                    
                    // update each player's html
                    applyChanges();

                    buildsettingsdiv();
                    if (settingsarray[14] == '1') {
                        window.setInterval(updateClocks,1000);
                    }
                    if (settingsarray[13] == '1') {
                        buildSortDiv();
                    }
                }
            });
        }
    }

    function resize() {
        $('div[class*="team_data"]').each(function(Y){
            var stylestring = 'padding-bottom: 1px;padding-top: 1px;';
            $('div',$(this)).each(function(P){
                var divstyle2 ='margin-bottom: 1px;padding-top: 1px;padding-bottom: 1px;';
                var divstyle = $(this).attr('style');
                if (divstyle != null) {
                    divstyle2 = divstyle + divstyle2;
                }
                var innerhtml = $(this).html();
                $(this).html('<span style="font-size: 10px;">' + innerhtml + '</span>');
                $(this).attr('style',divstyle2);
            })
            $(this).attr('style',stylestring);    
            
        })
    	$('div[class*="player_box_vet"]').each(function(Z){
            var height = $('div[class*="player_left_side"]',$(this)).attr('offsetHeight');
            $(this).children().each(function(zw){
                var s = 0;
                if ($(this).attr('offsetHeight') != null) {
                    s += $(this).attr('offsetHeight');
                }
                
                if (s > height) {
                    height = s;
                }
            })
        
            height += lead;
            if (height>minheight) {
                minheight = height;
            }
        });
        $('div[class*="player_box_vet"]').each(function(Z){
            var newStyle = "height: "+minheight+"px;";
        	var style = $(this).attr("style");
            if (typeof(style) != 'undefined') {
                if (style.indexOf('height: ')>-1) {
                    var styleexistingheight = style.substring(style.indexOf('height: '),style.indexOf('px;',style.indexOf('height: ')+8)+3);
                    style = style.replace(styleexistingheight,'');
                }
            
                if (style != null) {
                    newStyle += style;
                }
            }
            $(this).attr("style",newStyle);
        });
    }

    function updateClocks(){
        $('a[href*="/game/compare_teams.pl?team1"]').each(function(QW){
            var oldhtml = $(this).parent().html();
            var time = oldhtml.substring(oldhtml.indexOf('(in ')+4,oldhtml.length-1);
            var hours = parseInt(time.substring(0,time.indexOf(':')));
            var minsend = time.indexOf(':',time.indexOf(':')+1);
            var mins = parseInt(time.substring(time.indexOf(':')+1,minsend));
            var secs = parseInt(time.substring(minsend+1));
            secs = secs-1;
            if (secs<0) {
                mins = mins-1;
                secs=59;
                if (mins<0) {
                    hours = hours-1;
                    mins=59;
                }
            }
            var newtime = hours+':'+mins+':'+secs;
            var newhtml = oldhtml.replace(time,newtime);
            $(this).parent().html(newhtml);
        })
    }

    function value(a,b) {
        var sortsplit = sortitems.split(',');
        var ahold ='';
        var bhold ='';
        for (var loop =0;loop<sortsplit.length;loop++) {
            ahold += a[sortsplit[loop]];
            bhold += b[sortsplit[loop]];
        }
        if(isNaN(parseInt(ahold))==false) {
            ahold=parseInt(ahold);
            bhold=parseInt(bhold);
        }
        a=ahold;
        b=bhold;
        if (sortdirection==0) {
            return a == b ? 0 : (a < b ? -1 : 1)
        }else{
            return a == b ? 0 : (a > b ? -1 : 1)
        }
    }

    function getTeamColors(){
        // get list of teams in players and teams
        $('div[class="team"]').each(function(fr){
            // copy teams colors for teams displaying 
            teamcolors[fr]=new Array;
            teamcolors[fr][0] = $('a[href*="/game/team.pl?team_id="]',$(this)).attr('href');
            teamcolors[fr][0] = teamcolors[fr][0].substring(teamcolors[fr][0].indexOf('team_id=')+8);
            var tempstyle = $(this).attr('style');
            tempstyle = tempstyle.substring(tempstyle.indexOf('background:'), tempstyle.indexOf(')')+1);
            teamcolors[fr][1] = tempstyle;
            teamcolors[fr][2] = $('img[class="team_secondary_color"]', $(this)).attr('src');
            teamcolors[fr][2] = teamcolors[fr][2].replace('../','/')
            teamcolors[fr][2] = teamcolors[fr][2].substring(teamcolors[fr][2].indexOf('secondary_')+10,teamcolors[fr][2].indexOf('.png'));
            teamcolors[fr][2] = teamcolors[fr][2].toUpperCase();
        })
        var teamcount = teamcolors.length;
        // get team profile page for pulling primary and secondary colors
        $('a[href*="/game/team.pl?team_id="]', $('#players')).each(function(ut){
            var foundteam = 0;
            var teamid = $(this).attr('href');
            teamid = teamid.substring(teamid.indexOf('team_id=')+8)
            for (var w=0;w<teamcolors.length;w++) {
                if (teamcolors[w][0]==teamid) {
                    foundteam = 1;
                    break;
                }
            }
            if (foundteam==0) {
                teamcolors[teamcount] = new Array;
                teamcolors[teamcount][0]=teamid;
                teamcolors[teamcount][1]='';
                teamcolors[teamcount][2]='';
                teamcount++;
            }
        })
        var missingteams = 0;
        for (var te=0;te<teamcolors.length;te++) {
            if (teamcolors[te][1]=='') {
                missingteams++;
            }
        }
        if (missingteams>0) {
            for (var te=0;te<teamcolors.length;te++) {
                if (teamcolors[te][1]=='') {
                    $.get("/game/team.pl?team_id="+teamcolors[te][0],function(data){
                        var newteamid = $('a[href*="/game/team.pl?team_id="]',data).attr('href');
                        newteamid = newteamid.substring(newteamid.indexOf('team_id=')+8)
                        $('img[src*="/images/dots/"]',data).each(function(you){
                            var thiscolor = $(this).attr('src');
                            thiscolor = thiscolor.substring(thiscolor.indexOf('dots/')+5,thiscolor.indexOf('.'));
                            for(var j=0;j<teamcolors.length;j++) {
                                if (teamcolors[j][0]==newteamid) {
                                    if (you==0) {
                                        teamcolors[j][1] = "background: url('/images/game/design/team_cards/primary_"+thiscolor+".png')";
                                    }else{
                                        teamcolors[j][2] = thiscolor;
                                        teamcolors[j][2] = teamcolors[j][2].substring(teamcolors[j][2].indexOf('secondary_')+10,teamcolors[j][2].indexOf('.png'));
                                        teamcolors[j][2] = teamcolors[j][2].toUpperCase();
                                    }
                                }
                            }
                            
                        })
                        missingteams = missingteams-1;
                        
                    })
                }
            }
        }
    }


    function applyChanges(){
        // update each player's html
        $('div[class*="player_box_vet"]').each(function(z){
			$(this).html(playersinfo[z][7]);
            var thisclass = $(this).attr('class');
            if (thisclass.indexOf('content_container_sp')>-1) {
                $(this).removeClass('content_container_sp');
                $(this).addClass('content_container');
            }
            if (settingsarray[3] == '1') {
                if (parseInt(playersinfo[z][9])>0 ) {
                    $(this).addClass('content_container_sp');
                    $(this).removeClass('content_container');
                }
            }
            if (settingsarray[1]=='1') {
                
                for (var team=0;team<teamcolors.length;team++) {
                    if (teamcolors[team][0]==playersinfo[z][17]) {
                        var primaryurl = teamcolors[team][1].substring(teamcolors[team][1].indexOf("url(")+4, teamcolors[team][1].indexOf(")"));
                        var curstyle =$(this).attr('style');
                        if (typeof(curstyle)=='undefined') {
                            curstyle='';
                        }
                        
                        if (curstyle.indexOf('-moz-border-image:')>-1) {
                            
                            if (curstyle.indexOf('-moz-border-image:')==0) {
                                curstyle='';
                            }else{
                                
                                curstyle = curstyle.substring(0,curstyle.indexOf('-moz-border-image:'));
                            }
                        }
                        if (settingsarray[11]=='1' || settingsarray[4]=='1' || settingsarray[5] =='1' || settingsarray[6]=='1' || settingsarray[7]=='1' || settingsarray[8]=='1' || settingsarray[9]=='1' || settingsarray[10]=='1') {
                            curstyle += "-moz-border-image: url("+primaryurl+") 0;";
                            
                        }else{
                            curstyle += "-moz-border-image: url("+primaryurl+") 0;";
                            
                        }
                        
                        $(this).attr('style',curstyle);
                        $(this).addClass('team');         
                        $('table[class="player_vitals"]',$(this)).attr('style', 'background-color: rgb(220, 220, 220); opacity: 0.85;');
                    }
                }
                if (parseInt(playersinfo[z][17])==0) {
                    var curstyle =$(this).attr('style');
                    if (typeof(curstyle)=='undefined') {
                        curstyle='';
                    }
                    if (curstyle.indexOf('-moz-border-image:')>-1) {
                        if (curstyle.indexOf('-moz-border-image:')==0) {
                            curstyle='';
                        }else{
                            curstyle = curstyle.substring(0,curstyle.indexOf('-moz-border-image:'));
                        }
                    }
                    curstyle+="-moz-border-image: url('/images/game/design/team_cards/primary_white.png');";
                    
                    
                    $(this).attr('style',curstyle);
                    
                    $(this).addClass('team');                        
                }
            }
            
            
            
            
        })
        if (settingsarray[15] =='1') {
            $('a[href!="javascript:;"]','#players').attr('target','_blank');
            $('a[href!="javascript:;"]','#players_teams').attr('target','_blank');
        }
        resize();
    }

    var sortitems ='';
    var sortdirection = 0;
    // settings
    var lead = 30;
    var minheight = 160; 
    //if boost link clicked
    if (window.location.href=="/game/boost_player.pl") {
        var boostPlayer = readCookie("boostid");
        if (boostPlayer!= null) {
            $('select[name*="player_id"] option[value="' + boostPlayer + '"]').attr('selected', 'selected');
            document.cookie='boostid=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
            //retrieve elements (to box, subject box, message box) from send pm page
            $('input:last').click();
        }
    //if homepage
    }else{

        var settingscookie = readCookie('DDChome');
        $('#editControl').html(' ');
        if (settingscookie == null) {
            // build default settings
            // ;0=show team spread 
            // ;1=showboosts
            // ;2=blueboxeson
            // ;3=showcash
            // ;4=showcontract
            // ;5=show player stats
            // ;6=ratings bars
            // ;7=show fame
            // ;8=show bonus
            // ;9=show vet points
            // ;10=quick links
            // ;11=show sort
            // ;12=do countdown
            settingscookie = '0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0';
        }
        var settingsarray = settingscookie.split(',');
        var teamcolors = new Array;
        // retrieve team spread info
        var teamslist = new Array;
        if (settingsarray[0] =='1') {
            getTeamSpreads();
        }

        if (settingsarray[1] =='1') {
            getTeamColors();
        }

        // build player array
        //playersinfo(x,0) = playerid
        //playersinfo(x,1) = player name
        //playersinfo(x,2) = next game link
        //playersinfo(x,3) = team
        //playersinfo(x,4) = position
        //playersinfo(x,5) = level
        //playersinfo(x,6) = xp
        //playersinfo(x,7) = playercontent
        //playersinfo(x,8) = gameclock
        //playersinfo(x,9) = skillpoints
        //playersinfo(x,10) = training points
        //playersinfo(x,11) = shopping tokens
        //playersinfo(x,12) = Boost
        //playersinfo(x,13) = next game team
        //playersinfo(x,14) = vet xp
        //playersinfo(x,15) = bonus tokens
        //playersinfo(x,16) = stats
        //playersinfo(x,17) = teamid
        //playersinfo(x,18) = energy
        //playersinfo(x,19) = vetPoints
        //playersinfo(x,20) = player age 
        //playersinfo(x,21) = Boost Cost
        var idlength = 0;
        var playersinfo = new Array;
        $('div[class*="player_box_vet"]').each(function(e){
            
            // parse existing player info
            playersinfo[e] = new Array;
            var playerlink = $('a[href*="/game/player.pl?player_id="]',$(this));
            playersinfo[e][0] = playerlink.attr('href');
            playersinfo[e][0] = playersinfo[e][0].substring(playersinfo[e][0].indexOf('player_id=')+10,playersinfo[e][0].length);
            playersinfo[e][0] = parseInt(playersinfo[e][0]);
            playersinfo[e][1] = playerlink.text();
            playersinfo[e][1] = playersinfo[e][1].toUpperCase();
            var nextgame = $('a[href*="/game/compare_teams.pl?team1="]', $(this));
            if (typeof(nextgame.attr('href')) !='undefined') {
                playersinfo[e][2] = nextgame.attr('href');
                var nextgameparent = nextgame.parent();
                playersinfo[e][8] = nextgameparent.html();
                playersinfo[e][8] = playersinfo[e][8].substr(playersinfo[e][8].indexOf('(in ') + 4,(playersinfo[e][8].indexOf(')', playersinfo[e][8].indexOf('(in ') + 4) - (playersinfo[e][8].indexOf('(in ')+4)));
                playersinfo[e][8] = parseInt(playersinfo[e][8].replace(/:/g,''));
                playersinfo[e][13] = nextgame.text();
                playersinfo[e][13] = playersinfo[e][13].toUpperCase();
            }else{
                playersinfo[e][2] = '';
                playersinfo[e][8] = 0;
                playersinfo[e][13] = '';
            }
            playersinfo[e][3] = $('a[href*="/game/team.pl?team_id="]',$(this)).text();
            playersinfo[e][17] = $('a[href*="/game/team.pl?team_id="]',$(this)).attr('href');
            if (typeof(playersinfo[e][17])=='undefined') {
                playersinfo[e][17]='0000';
                playersinfo[e][3]='None';
            }else{
                playersinfo[e][17] = playersinfo[e][17].substring(playersinfo[e][17].indexOf('team_id=')+8);
            }
            playersinfo[e][4] = $('div[class*="position"]',$(this)).text();
            playersinfo[e][5] = $('div[class="simple_player_level"]',$(this)).text();
            playersinfo[e][5] = parseInt(playersinfo[e][5].substring(playersinfo[e][5].indexOf('. ')+2));
            playersinfo[e][6] = $('div[class="player_xp"]:first', $(this)).text();
            playersinfo[e][6] = parseInt(playersinfo[e][6].substring(0,playersinfo[e][6].indexOf('/')));
            playersinfo[e][14] = $('div[class="player_xp"]:last', $(this)).text();
            playersinfo[e][14] = parseInt(playersinfo[e][14].substring(0,playersinfo[e][14].indexOf('/')));
            playersinfo[e][18] = $('div[class="rating_bar"]',$(this)).html();
            playersinfo[e][7] = $(this).html();
            playersinfo[e][9] = $('#level_button_container',$(this)).text();
            if (playersinfo[e][9].length ==0) {
                playersinfo[e][9] = '0';
            }
            playersinfo[e][9] = parseInt(playersinfo[e][9]);
            playersinfo[e][10] = $('a[href*="/game/training.pl?player_id="]', $(this)).parent().text();
            if (playersinfo[e][10].indexOf('(')>-1) {
                playersinfo[e][10] = playersinfo[e][10].substring(0,playersinfo[e][10].indexOf('('));
            }
            if (playersinfo[e][10].length==0) {
                playersinfo[e][10] = '0';
            }
            playersinfo[e][10] = parseInt(playersinfo[e][10]);
            playersinfo[e][11] = 0;
            playersinfo[e][15] = 0;
            playersinfo[e][16] = 0;
            playersinfo[e][12] = 0;
            playersinfo[e][19] = 0;
            playersinfo[e][20] = 0;
            playersinfo[e][21] = 0;
            if (settingsarray[12]=='1') {
                var inspoint1 = playersinfo[e][7].indexOf('<tbody') + 1;
                var insertpoint = playersinfo[e][7].indexOf('>', inspoint1) + 1;
                
                var pre = playersinfo[e][7].substring(0,insertpoint);
                var post = playersinfo[e][7].substring(insertpoint);
                
                playersinfo[e][7] = pre + '<tr><td colspan="4"><a href="/game/equipment.pl?player_id=' + playersinfo[e][0] + '">EQ</a> | <a href="/game/player_tactics.pl?player_id=' + playersinfo[e][0] + '">Tactics</a> | <a href="/game/forum_thread_list.pl?team_id=' + playersinfo[e][17] + '">Forum</a> | <a href="/game/depth_chart.pl?team_id='+playersinfo[e][17]+'">DC</a> | <a href="/game/team_player_stats.pl?team_id='+playersinfo[e][17]+'">Leaders</a> | <a href="/game/training.pl?player_id='+playersinfo[e][0]+'">Train('+playersinfo[e][10]+')</a> | <a href="/game/bonus_tokens.pl?player_id='+playersinfo[e][0]+'">Bonus</a> | <a href="/game/adv_equipment.pl?player_id=' + playersinfo[e][0] + '">Shop</a></td></tr>' + post;
                var rowsplit = playersinfo[e][7].split('<tr>');
                playersinfo[e][7] = '';
                for (var wq=0;wq<rowsplit.length;wq++) {
                    if (rowsplit[wq].indexOf('<td class="simple_player_vital_head">Train Pts:</td>')>-1) {
                        rowsplit[wq] ='';
                    }else{
                    
                        playersinfo[e][7]+=rowsplit[wq] + '<tr>';
                    }
                }
                playersinfo[e][7] = playersinfo[e][7].substring(0, playersinfo[e][7].length - 4);
                if (e==0){
                    $('div[class="team"]').each(function(y){
                        var teamid = $('a[href*="/game/team.pl?team_id="]',$(this)).attr('href');
                        teamid = teamid.substring(teamid.indexOf('=')+1);
                        var linksstring = '<font size="1"><a href="/game/forum_thread_list.pl?team_id='+teamid+'">Forum</a> | <a href="/game/roster.pl?team_id=' + teamid +'">Roster</a> | <a href="/game/depth_chart.pl?team_id=' + teamid + '">DC</a> | <a href="/game/team_player_stats.pl?team_id=' + teamid + '">Leaders</a> | <a href="/game/stadium.pl?team_id=' + teamid + '">Stadium</a> | <a href="/game/team_item_fund.pl?team_id=' + teamid + '">EQ</a> | <a href="/game/team_gm.pl?team_id=' + teamid + '">GMs</a> | <a href="/game/team_loan.pl?team_id=' + teamid + '">Loan</a> | <a href="/game/team_offers.pl?team_id=' + teamid + '">Offers</a> | <a href="/game/team_tactics.pl?team_id=' + teamid + '">Tactics</a></font>';
                        $('div[class*="team_data"]', $(this)).prepend(linksstring);
                    })
                    $('div[class*="team_simple"]').each(function(y){
                        var teamid = $('a[href*="/game/team.pl?team_id="]',$(this)).attr('href');
                        teamid = teamid.substring(teamid.indexOf('=')+1);
                        var linksstring = '<font size="1"><a href="/game/forum_thread_list.pl?team_id='+teamid+'">Forum</a> | <a href="/game/roster.pl?team_id=' + teamid +'">Roster</a> | <a href="/game/depth_chart.pl?team_id=' + teamid + '">DC</a> | <a href="/game/team_player_stats.pl?team_id=' + teamid + '">Leaders</a> | <a href="/game/stadium.pl?team_id=' + teamid + '">Stadium</a> | <a href="/game/team_item_fund.pl?team_id=' + teamid + '">EQ</a> | <a href="/game/team_gm.pl?team_id=' + teamid + '">GMs</a> | <a href="/game/team_loan.pl?team_id=' + teamid + '">Loan</a> | <a href="/game/team_offers.pl?team_id=' + teamid + '">Offers</a> | <a href="/game/team_tactics.pl?team_id=' + teamid + '">Tactics</a></font>';
                        $('div[class*="team_data"]', $(this)).prepend(linksstring);
                    })
                    
                }
                
            }

        });


        var playercount = 0;

        // retrieve boost info
        var boostsavail = new Array;
        if (settingsarray[2]=='1') {
            getBoosts();
        };

        if (settingsarray[11]=='1' || settingsarray[4]=='1' || settingsarray[5] =='1' || settingsarray[6]=='1' || settingsarray[7]=='1' || settingsarray[8]=='1' || settingsarray[9]=='1' || settingsarray[10]=='1') {
            getPlayersInfo();
        }else{
            applyChanges();
            buildsettingsdiv();
            if (settingsarray[14] == '1') {
                window.setInterval(updateClocks,1000);
            }
            if (settingsarray[13] == '1') {
                buildSortDiv();
            }
        }
        

        
}
});



