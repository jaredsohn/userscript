// ==UserScript==
// @name           GLB DDC AI Enhancer
// @namespace      GLB - DDCUnderground addition to rockitsauces AI Enhancer Script http://userscripts.org/scripts/show/50619
// @description    GLB AI Enhancer
// @include        http://goallineblitz.com/game/team_defense_ai.pl?team_id=*
// @include        http://goallineblitz.com/game/team_offense_ai.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js






// ==/UserScript==

$(document).ready( function() {

    function showsort(){
        $("#sort").removeClass("subtab_off");
        $("#sort").addClass("subtab_on");
        $("#mass, #showall, #filter, #drag").removeClass("subtab_on");
        $("#mass, #showall, #filter, #drag").addClass("subtab_off");
        $('#DDCMassDiv, #DDCDragDiv, #DDCFiltDiv, #DDCShowDiv').hide();
        $('#DDCSortDiv').show();
        $('input[id*="chk_"]').hide();
    };

    function showmass(){
        $("#mass").removeClass("subtab_off");
        $("#mass").addClass("subtab_on");
        $("#sort, #showall, #filter, #drag").removeClass("subtab_on");
        $("#sort, #showall, #filter, #drag").addClass("subtab_off");
        $('#DDCSortDiv, #DDCDragDiv, #DDCFiltDiv, #DDCShowDiv').hide();
        $('#DDCMassDiv,').show();
        $('input[id*="chk_"]').show();
        
    };

    function showdrag(){
        $("#mass, #sort, #showall, #filter").removeClass("subtab_on");
        $("#mass, #sort, #showall, #filter").addClass("subtab_off");
        $("#drag").removeClass("subtab_off");
        $("#drag").addClass("subtab_on");
        $('input[id*="chk_"]').hide();
        $('div[id*="input_"]').each(function(j){
            var sortdivid = $(this).attr('id');
            sortdivid = sortdivid.substring(6,sortdivid.length);
            if (isNaN(sortdivid)==false) {
                $('.outputs[id*="outputs_"]',$(this)).each(function(t){
                    $(this).sortable({
                        update: function(event, ui) {
                         var divArray = $(this).sortable("toArray");
                         for (var i = 0; i < divArray.length; i++) {
                             alert(divArray[i]);

                         }
                        } 
                    });
                    $(this).sortable('enable');

                        $('div[id*="output_"]',$(this)).each(function(t){
                            var outsortdivid2 = $(this).attr('id');
                            outsortdivid2 = outsortdivid2.substring(7,outsortdivid2.length);
                            if (isNaN(outsortdivid2)==false) {
                                $(this).attr('style',"border: 2px solid rgb(0, 0, 0);");
                                $(this).children().disableSelection();

                            };
                        });
                    
                });
            }
        });
        $('#DDCDragDiv').show();
        $('#DDCMassDiv,#DDCSortDiv, #DDCFiltDiv, #DDCShowDiv').hide();
    };

    function showall(){
        $("#mass, #sort, #filter, #drag").removeClass("subtab_on");
        $("#mass, #sort, #filter, #drag").addClass("subtab_off");
        $("#showall").removeClass("subtab_off");
        $("#showall").addClass("subtab_on");
        $('#DDCMassDiv, #DDCDragDiv, #DDCSortDiv, #DDCFiltDiv').hide();
        $('#DDCShowDiv').show();
        $('input[id*="chk_"]').hide();
        // set all divs to show
        $('div[id*="input_"]').each(function(o){
            var divid = $(this).attr('id');
            divid = divid.substring(divid.indexOf('input_')+6, divid.length);
            if (isNaN(divid)==false) {
                $(this).show();
            };
        }); 
        var arrlength =0;
        var sortsettings = new Array;
        //  get what filter requests are set
        $('select','#DDCSortDiv').each(function(i){
            var valueitem = $(this).attr('value');
            if (valueitem.length >0) {
                sortsettings[arrlength] = new Array;
                sortsettings[arrlength][0] = $(this).attr('id');
                sortsettings[arrlength][1] = $(this).attr('value');
                arrlength++;
            }
        });
        $('input, select','#DDCFiltDiv, #DDCSortDiv').each(function(i){
            $(this).attr('value','');
        });
        if (sortsettings.length >0) {
            sortselectchange();
            doSort(1);
        }
    };

    function showfilter(){
        $("#mass, #sort, #drag, #showall").removeClass("subtab_on");
        $("#mass, #sort, #drag, #showall").addClass("subtab_off");
        $("#filter").removeClass("subtab_off");
        $("#filter").addClass("subtab_on");
        $('#DDCMassDiv, #DDCDragDiv, #DDCSortDiv, #DDCShowDiv').hide();
        $('#DDCFiltDiv').show();
        $('input[id*="chk_"]').hide();
    };

    function builddragdiv(){
        $("#DDCDragDiv").html('<b>Drag Objects to the desired order. (Dont forget a button to save the d&d )</b><hr />');
        $('#DDCDragDiv').attr('style','display: none');

    };


    function buildfiltdiv(){
        $("#DDCFiltDiv").html('<b>Filter Options (leave text boxes blank in order to not filter on)</b><hr />');
        if(iso==1) {
            var filttable = document.createElement('table');
            var row1 = document.createElement('tr');
            var cell11 = document.createElement('td');
            var cell12 = document.createElement('td');
            var cell13 = document.createElement('td');
            var cell14 = document.createElement('td');
            var row2 = document.createElement('tr');
            var cell21 = document.createElement('td');
            var cell22 = document.createElement('td');
            var cell23 = document.createElement('td');
            var cell24 = document.createElement('td');
            filttable.appendChild(row1);
            row1.appendChild(cell11);
            row1.appendChild(cell12);
            row1.appendChild(cell13);
            row1.appendChild(cell14);
            filttable.appendChild(row2);
            row2.appendChild(cell21);
            row2.appendChild(cell22);
            row2.appendChild(cell23);
            row2.appendChild(cell24);
    
            var row3 = document.createElement('tr');
            var cell31 = document.createElement('td');
            var cell32 = document.createElement('td');
            var cell33 = document.createElement('td');
            var cell34 = document.createElement('td');
    
            cell31.setAttribute('width','20%');
            cell32.setAttribute('width','30%');
            cell33.setAttribute('width','20%');
            cell34.setAttribute('width','30%');
            filttable.appendChild(row3);
            row3.appendChild(cell31);
            row3.appendChild(cell32);
            row3.appendChild(cell33);
            row3.appendChild(cell34);
    
    
            var row4 = document.createElement('tr');
            var cell41 = document.createElement('td');
            var cell42 = document.createElement('td');
            var cell43 = document.createElement('td');
            var cell44 = document.createElement('td');
    
            cell41.setAttribute('width','20%');
            cell42.setAttribute('width','30%');
            cell43.setAttribute('width','20%');
            cell44.setAttribute('width','30%');
            filttable.appendChild(row4);
            row4.appendChild(cell41);
            row4.appendChild(cell42);
            row4.appendChild(cell43);
            row4.appendChild(cell44);
    
    
            var row5 = document.createElement('tr');
            var cell51 = document.createElement('td');
            var cell52 = document.createElement('td');
            var cell53 = document.createElement('td');
            var cell54 = document.createElement('td');
            cell51.setAttribute('width','20%');
            cell52.setAttribute('width','30%');
            cell53.setAttribute('width','20%');
            cell54.setAttribute('width','30%');
            filttable.appendChild(row5);
            row5.appendChild(cell51);
            row5.appendChild(cell52);
            row5.appendChild(cell53);
            row5.appendChild(cell54);
    
    
            var row6 = document.createElement('tr');
            var cell61 = document.createElement('td');
            var cell62 = document.createElement('td');
            var cell63 = document.createElement('td');
            var cell64 = document.createElement('td');
            cell61.setAttribute('width','20%');
            cell62.setAttribute('width','30%');
            cell63.setAttribute('width','20%');
            cell64.setAttribute('width','30%');
            filttable.appendChild(row6);
            row6.appendChild(cell61);
            row6.appendChild(cell62);
            row6.appendChild(cell63);
            row6.appendChild(cell64);
    
    
    
            filttable.setAttribute('cellpadding','3');
            filttable.setAttribute('cellspacing','3');
            filttable.setAttribute('width','90%');
    
    
    
            var filttimetxt = document.createElement('input');
            filttimetxt.setAttribute('type','text');
            filttimetxt.setAttribute('id','filttimetxt');
            cell12.appendChild(filttimetxt);
            cell11.innerHTML = '<b>Time Remaining:</b>'
            cell12.innerHTML = 'less than ' + cell12.innerHTML  + ' secs ';
    
            var filtballspot = document.createElement('select');
            filtballspot.setAttribute('id', 'filtballspot');
            filtballspot.options[0]= new Option('Any Spot', '', true, true);
            filtballspot.options[1]= new Option('Own Goal',"0", false, false);
            filtballspot.options[2]= new Option('Own 3',"3", false, false);
            filtballspot.options[3]= new Option('Own 5',"5", false, false);
            filtballspot.options[4]= new Option('Own 10',"10", false, false);
            filtballspot.options[5]= new Option('Own 15',"15", false, false);
            filtballspot.options[6]= new Option('Own 20',"20", false, false);
            filtballspot.options[7]= new Option('Own 25',"25", false, false);
            filtballspot.options[8]= new Option('Own 30',"30", false, false);
            filtballspot.options[9]= new Option('Own 35',"35", false, false);
            filtballspot.options[10]= new Option('Own 40',"40", false, false);
            filtballspot.options[11]= new Option('Own 45',"45", false, false);
            filtballspot.options[12]= new Option('The 50',"50", false, false);
            filtballspot.options[13]= new Option('Opponent 45',"55", false, false);
            filtballspot.options[14]= new Option('Opponent 40',"60", false, false);
            filtballspot.options[15]= new Option('Opponent 35',"65", false, false);
            filtballspot.options[16]= new Option('Opponent 30',"70", false, false);
            filtballspot.options[17]= new Option('Opponent 25',"75", false, false);
            filtballspot.options[18]= new Option('Opponent 20',"80", false, false);
            filtballspot.options[19]= new Option('Opponent 15',"85", false, false);
            filtballspot.options[20]= new Option('Opponent 10',"90", false, false);
            filtballspot.options[21]= new Option('Opponent 5',"95", false, false);
            filtballspot.options[22]= new Option('Opponent 3',"97", false, false);
            filtballspot.options[23]= new Option('Opponent Goal',"100", false, false);
    
            cell14.appendChild(filtballspot);
            cell13.innerHTML = '<b>Ball Position:</b> ';
    
            var filtdown = document.createElement('select');
            filtdown.setAttribute('id', 'filtdown');
            filtdown.options[0]= new Option('Any Down', '', true, true);
            filtdown.options[1]= new Option('First',"1", false, false);
            filtdown.options[2]= new Option('Second',"2", false, false);
            filtdown.options[3]= new Option('Third',"3", false, false);
            filtdown.options[4]= new Option('Fourth',"4", false, false);
    
            cell21.innerHTML = '<b>Down:</b>';
            cell22.appendChild(filtdown);
    
            var filtydstofirst = document.createElement('input');
            filtydstofirst.setAttribute('type','text');
            filtydstofirst.setAttribute('id','filtydstofirst');
            cell24.appendChild(filtydstofirst);
            cell23.innerHTML = '<b>Yards to First:</b> ';
    
    
            var filtmytoleft = document.createElement('select');
            filtmytoleft.setAttribute('id', 'filtmytoleft');
            filtmytoleft.options[0]= new Option('Any Amount', '', true, true);
            filtmytoleft.options[1]= new Option('3',"3", false, false);
            filtmytoleft.options[2]= new Option('2',"2", false, false);
            filtmytoleft.options[3]= new Option('1',"1", false, false);
            filtmytoleft.options[4]= new Option('0',"0", false, false);
    
            cell31.innerHTML = '<b>My Timeouts Left:</b>';
            cell32.appendChild(filtmytoleft);
    
    
            var filtopptoleft = document.createElement('select');
            filtopptoleft.setAttribute('id', 'filtopptoleft');
            filtopptoleft.options[0]= new Option('Any Amount', '', true, true);
            filtopptoleft.options[1]= new Option('3',"3", false, false);
            filtopptoleft.options[2]= new Option('2',"2", false, false);
            filtopptoleft.options[3]= new Option('1',"1", false, false);
            filtopptoleft.options[4]= new Option('0',"0", false, false);
    
            cell33.innerHTML = '<b>Opponents Timeouts Left:</b>';
            cell34.appendChild(filtopptoleft);
    
    
    
            var filtclockrun = document.createElement('select');
            filtclockrun.setAttribute('id', 'filtclockrun');
            filtclockrun.options[0]= new Option('Either', '', true, true);
            filtclockrun.options[1]= new Option('Yes',"1", false, false);
            filtclockrun.options[2]= new Option('No',"0", false, false);
    
            cell41.innerHTML = '<b>Clock Running:</b>';
            cell42.appendChild(filtclockrun);
    
            var filtscorediff = document.createElement('input');
            filtscorediff.setAttribute('type','text');
            filtscorediff.setAttribute('id','filtscorediff');
            cell44.appendChild(filtscorediff);
            cell43.innerHTML = '<b>Score Difference:<img src="/images/question.gif" onmouseover="set_tip(' + String.fromCharCode(39) + 'Points difference in the score.<br><br>Negative numbers: you are losing.<br>Positive numbers: you are winning.' + String.fromCharCode(39) + ', 0, 1, 1, 1)" onmouseout="unset_tip()"></b> ';
    
    
            var filtspec = document.createElement('select');
            filtspec.setAttribute('id', 'filtspec');
            filtspec.options[0]= new Option('None', '', true, true);
            filtspec.options[1]= new Option('Within Field Goal Range',"in_field_goal_range", false, false);
            filtspec.options[2]= new Option('Outside Field Goal Range',"out_field_goal_range", false, false);
            filtspec.options[3]= new Option('Near Field Goal Range (5yds)',"near_field_goal_range_5", false, false);
            filtspec.options[4]= new Option('Near Field Goal Range (10yds)',"near_field_goal_range_10", false, false);
    
    
            cell51.innerHTML = '<b>Special Circumstances:</b>';
            cell52.appendChild(filtspec);
    
    
            var filtautoadj = document.createElement('select');
            filtautoadj.setAttribute('id', 'filtautoadj');
            filtautoadj.options[0]= new Option('None', '', true, true);
            filtautoadj.options[1]= new Option('Adjust Very Quickly',"5", false, false);
            filtautoadj.options[2]= new Option('Adjust Quickly',"4", false, false);
            filtautoadj.options[3]= new Option('Adjust Medium',"3", false, false);
            filtautoadj.options[4]= new Option('Adjust Slowly',"2", false, false);
            filtautoadj.options[5]= new Option('Adjust Very Slowly',"1", false, false);
    
            cell53.innerHTML = '<b>Auto Adjust:</b>';
            cell54.appendChild(filtautoadj);
    
            var filtplays = document.createElement('select');
            filtplays.setAttribute('id','filtplays');
            filtplays.options[0]= new Option('No Filter', "", true, true);
            filtplays.options[1]= new Option('Inside Run',"inside_run", false, false);
            filtplays.options[2]= new Option('Outside Run',"outside_run", false, false);
            filtplays.options[3]= new Option('Outside Run - Handoff',"outside_run_off_tackle", false, false);
            filtplays.options[4]= new Option('Outside Run - Pitch',"outside_run_pitch", false, false);
            filtplays.options[5]= new Option('Run (random)',"run", false, false);
            filtplays.options[6]= new Option('Pass',"pass", false, false);
            filtplays.options[7]= new Option('Goal Line',"goal_line", false, false);
            filtplays.options[8]= new Option('QB Kneel',"kneel", false, false);
            filtplays.options[9]= new Option('QB Spike',"spike", false, false);
            filtplays.options[10]= new Option('Field Goal',"field_goal", false, false);
            filtplays.options[11]= new Option('Punt',"punt", false, false);
    
            cell61.innerHTML = '<b>Play Type:</b>';
            cell62.appendChild(filtplays);
    
            var filtpackages = document.createElement('select');
            filtpackages.setAttribute('id', 'filtpackages');
            filtpackages.options[0]=new Option('No Filter', '', true, true)
            for (var q=0;q<playlistid.length;q++) {
                filtpackages.options[q+1] = new Option(playlistname[q],playlistid[q],false,false);
            }
            
            cell63.innerHTML = '<b>Package:</b>';
            cell64.appendChild(filtpackages);
    
        }else{
            var filttable = document.createElement('table');
            var row1 = document.createElement('tr');
            var cell11 = document.createElement('td');
            var cell12 = document.createElement('td');
            var cell13 = document.createElement('td');
            var cell14 = document.createElement('td');
            var row2 = document.createElement('tr');
            var cell21 = document.createElement('td');
            var cell22 = document.createElement('td');
            var cell23 = document.createElement('td');
            var cell24 = document.createElement('td');
            filttable.appendChild(row1);
            row1.appendChild(cell11);
            row1.appendChild(cell12);
            row1.appendChild(cell13);
            row1.appendChild(cell14);
            filttable.appendChild(row2);
            row2.appendChild(cell21);
            row2.appendChild(cell22);
            row2.appendChild(cell23);
            row2.appendChild(cell24);
    
            var row3 = document.createElement('tr');
            var cell31 = document.createElement('td');
            var cell32 = document.createElement('td');
            var cell33 = document.createElement('td');
            var cell34 = document.createElement('td');
    
            cell31.setAttribute('width','20%');
            cell32.setAttribute('width','30%');
            cell33.setAttribute('width','20%');
            cell34.setAttribute('width','30%');
            filttable.appendChild(row3);
            row3.appendChild(cell31);
            row3.appendChild(cell32);
            row3.appendChild(cell33);
            row3.appendChild(cell34);
    
    
            var row4 = document.createElement('tr');
            var cell41 = document.createElement('td');
            var cell42 = document.createElement('td');
            var cell43 = document.createElement('td');
            var cell44 = document.createElement('td');
    
            cell41.setAttribute('width','20%');
            cell42.setAttribute('width','30%');
            cell43.setAttribute('width','20%');
            cell44.setAttribute('width','30%');
            filttable.appendChild(row4);
            row4.appendChild(cell41);
            row4.appendChild(cell42);
            row4.appendChild(cell43);
            row4.appendChild(cell44);
    
    
            var row5 = document.createElement('tr');
            var cell51 = document.createElement('td');
            var cell52 = document.createElement('td');
            var cell53 = document.createElement('td');
            var cell54 = document.createElement('td');
            cell51.setAttribute('width','20%');
            cell52.setAttribute('width','30%');
            cell53.setAttribute('width','20%');
            cell54.setAttribute('width','30%');
            filttable.appendChild(row5);
            row5.appendChild(cell51);
            row5.appendChild(cell52);
            row5.appendChild(cell53);
            row5.appendChild(cell54);
    
    
            var row6 = document.createElement('tr');
            var cell61 = document.createElement('td');
            var cell62 = document.createElement('td');
            var cell63 = document.createElement('td');
            var cell64 = document.createElement('td');
            cell61.setAttribute('width','20%');
            cell62.setAttribute('width','30%');
            cell63.setAttribute('width','20%');
            cell64.setAttribute('width','30%');
            filttable.appendChild(row6);
            row6.appendChild(cell61);
            row6.appendChild(cell62);
            row6.appendChild(cell63);
            row6.appendChild(cell64);
    
    
    
            filttable.setAttribute('cellpadding','3');
            filttable.setAttribute('cellspacing','3');
            filttable.setAttribute('width','90%');
    
    
    
            var filttimetxt = document.createElement('input');
            filttimetxt.setAttribute('type','text');
            filttimetxt.setAttribute('id','filttimetxt');
            cell12.appendChild(filttimetxt);
            cell11.innerHTML = '<b>Time Remaining:</b>'
            cell12.innerHTML = 'less than ' + cell12.innerHTML  + ' secs ';
    
            var filtballspot = document.createElement('select');
            filtballspot.setAttribute('id', 'filtballspot');
            filtballspot.options[0]= new Option('Any Spot', '', true, true);
            filtballspot.options[1]= new Option('Own Goal',"0", false, false);
            filtballspot.options[2]= new Option('Own 3',"3", false, false);
            filtballspot.options[3]= new Option('Own 5',"5", false, false);
            filtballspot.options[4]= new Option('Own 10',"10", false, false);
            filtballspot.options[5]= new Option('Own 15',"15", false, false);
            filtballspot.options[6]= new Option('Own 20',"20", false, false);
            filtballspot.options[7]= new Option('Own 25',"25", false, false);
            filtballspot.options[8]= new Option('Own 30',"30", false, false);
            filtballspot.options[9]= new Option('Own 35',"35", false, false);
            filtballspot.options[10]= new Option('Own 40',"40", false, false);
            filtballspot.options[11]= new Option('Own 45',"45", false, false);
            filtballspot.options[12]= new Option('The 50',"50", false, false);
            filtballspot.options[13]= new Option('Opponent 45',"55", false, false);
            filtballspot.options[14]= new Option('Opponent 40',"60", false, false);
            filtballspot.options[15]= new Option('Opponent 35',"65", false, false);
            filtballspot.options[16]= new Option('Opponent 30',"70", false, false);
            filtballspot.options[17]= new Option('Opponent 25',"75", false, false);
            filtballspot.options[18]= new Option('Opponent 20',"80", false, false);
            filtballspot.options[19]= new Option('Opponent 15',"85", false, false);
            filtballspot.options[20]= new Option('Opponent 10',"90", false, false);
            filtballspot.options[21]= new Option('Opponent 5',"95", false, false);
            filtballspot.options[22]= new Option('Opponent 3',"97", false, false);
            filtballspot.options[23]= new Option('Opponent Goal',"100", false, false);
    
            cell14.appendChild(filtballspot);
            cell13.innerHTML = '<b>Ball Position:</b> ';
    
            var filtdown = document.createElement('select');
            filtdown.setAttribute('id', 'filtdown');
            filtdown.options[0]= new Option('Any Down', '', true, true);
            filtdown.options[1]= new Option('First',"1", false, false);
            filtdown.options[2]= new Option('Second',"2", false, false);
            filtdown.options[3]= new Option('Third',"3", false, false);
            filtdown.options[4]= new Option('Fourth',"4", false, false);
    
            cell21.innerHTML = '<b>Down:</b>';
            cell22.appendChild(filtdown);
    
            var filtydstofirst = document.createElement('input');
            filtydstofirst.setAttribute('type','text');
            filtydstofirst.setAttribute('id','filtydstofirst');
            cell24.appendChild(filtydstofirst);
            cell23.innerHTML = '<b>Yards to First:</b> ';
    
    
            var filtmytoleft = document.createElement('select');
            filtmytoleft.setAttribute('id', 'filtmytoleft');
            filtmytoleft.options[0]= new Option('Any Amount', '', true, true);
            filtmytoleft.options[1]= new Option('3',"3", false, false);
            filtmytoleft.options[2]= new Option('2',"2", false, false);
            filtmytoleft.options[3]= new Option('1',"1", false, false);
            filtmytoleft.options[4]= new Option('0',"0", false, false);
    
            cell31.innerHTML = '<b>My Timeouts Left:</b>';
            cell32.appendChild(filtmytoleft);
    
    
            var filtopptoleft = document.createElement('select');
            filtopptoleft.setAttribute('id', 'filtopptoleft');
            filtopptoleft.options[0]= new Option('Any Amount', '', true, true);
            filtopptoleft.options[1]= new Option('3',"3", false, false);
            filtopptoleft.options[2]= new Option('2',"2", false, false);
            filtopptoleft.options[3]= new Option('1',"1", false, false);
            filtopptoleft.options[4]= new Option('0',"0", false, false);
    
            cell33.innerHTML = '<b>Opponents Timeouts Left:</b>';
            cell34.appendChild(filtopptoleft);
    
    
    
            var filtclockrun = document.createElement('select');
            filtclockrun.setAttribute('id', 'filtclockrun');
            filtclockrun.options[0]= new Option('Either', '', true, true);
            filtclockrun.options[1]= new Option('Yes',"1", false, false);
            filtclockrun.options[2]= new Option('No',"0", false, false);
    
            cell41.innerHTML = '<b>Clock Running:</b>';
            cell42.appendChild(filtclockrun);
    
            var filtscorediff = document.createElement('input');
            filtscorediff.setAttribute('type','text');
            filtscorediff.setAttribute('id','filtscorediff');
            cell44.appendChild(filtscorediff);
            cell43.innerHTML = '<b>Score Difference:<img src="/images/question.gif" onmouseover="set_tip(' + String.fromCharCode(39) + 'Points difference in the score.<br><br>Negative numbers: you are losing.<br>Positive numbers: you are winning.' + String.fromCharCode(39) + ', 0, 1, 1, 1)" onmouseout="unset_tip()"></b> ';
    
    
            var filtspec = document.createElement('select');
            filtspec.setAttribute('id', 'filtspec');
            filtspec.options[0]= new Option('Any Formation', '', true, true);
            filtspec.options[1]= new Option('I (any variation)',"I", false, false);
            filtspec.options[2]= new Option('Weak I',"I Weak", false, false);
            filtspec.options[3]= new Option('Strong I',"I Strong", false, false);
            filtspec.options[4]= new Option('Big I',"I Big", false, false);
            filtspec.options[5]= new Option('Single Back',"Singleback", false, false);
            filtspec.options[6]= new Option('Single Back Big',"Singleback Big", false, false);
            filtspec.options[7]= new Option('Pro Set',"Splitbacks Pro", false, false);
            filtspec.options[8]= new Option('Shotgun',"Shotgun", false, false);
            filtspec.options[9]= new Option('Goal Line',"Goal Line", false, false);
            
    
    
            cell51.innerHTML = '<b>Opponent Formation:</b>';
            cell52.appendChild(filtspec);
    
    
            var filtautoadj = document.createElement('select');
            filtautoadj.setAttribute('id', 'filtautoadj');
            filtautoadj.options[0]= new Option('None', '', true, true);
            filtautoadj.options[1]= new Option('Adjust Very Quickly',"5", false, false);
            filtautoadj.options[2]= new Option('Adjust Quickly',"4", false, false);
            filtautoadj.options[3]= new Option('Adjust Medium',"3", false, false);
            filtautoadj.options[4]= new Option('Adjust Slowly',"2", false, false);
            filtautoadj.options[5]= new Option('Adjust Very Slowly',"1", false, false);
    
            cell53.innerHTML = '<b>Auto Adjust:</b>';
            cell54.appendChild(filtautoadj);
    
            var filtplays = document.createElement('select');
            filtplays.setAttribute('id','filtplays');
            filtplays.options[0]= new Option('No Filter', "", true, true);
            filtplays.options[1]= new Option('Base Formation',"base", false, false);
            filtplays.options[2]= new Option('3-4',"3-4", false, false);
            filtplays.options[3]= new Option('4-3',"4-3", false, false);
            filtplays.options[4]= new Option('4-2-5 Nickel (3 CBs)',"nickel", false, false);
            filtplays.options[5]= new Option('4-1-6 Dime (4 CBs)',"dime", false, false);
            filtplays.options[6]= new Option('3-1-7 Quarter (5 CBs)',"quarter", false, false);
            filtplays.options[7]= new Option('3-3-5 Nickel (3 CBs)',"nickel 3-4", false, false);
            filtplays.options[8]= new Option('3-2-6 Dime (4 CBs)',"dime 3-4", false, false);
            filtplays.options[9]= new Option('Goal Line',"goal line d", false, false);

            cell61.innerHTML = '<b>Formation:</b>';
            cell62.appendChild(filtplays);

            // bubblesort
            var x, y
                // The Bubble Sort method.
            var holder = new Array;
            var holder2 = new Array;
            for(x = 0; x < playlistname.length; x++) {
                for(y = 0; y < (playlistname.length-1); y++) {
                    if(playlistname[y].toUpperCase() > playlistname[y+1].toUpperCase()) {
                        holder = playlistname[y+1];
                        playlistname[y+1] = playlistname[y];
                        playlistname[y] = holder;
                        holder2 = playlistid[y+1];
                        playlistid[y+1] = playlistid[y];
                        playlistid[y] = holder2;
                    }
                }
            }
    
            var filtpackages = document.createElement('select');
            filtpackages.setAttribute('id', 'filtpackages');
            filtpackages.options[0]=new Option('No Filter', '', true, true)
            for (var q=0;q<playlistid.length;q++) {
                filtpackages.options[q+1] = new Option(playlistname[q],playlistid[q],false,false);
            }
            
            cell63.innerHTML = '<b>Custom Play:</b>';
            cell64.appendChild(filtpackages);
        }


        $('#DDCFiltDiv').append(filttable);
        $('#DDCFiltDiv').attr('style','display: none');
        $('input, select','#DDCFiltDiv').bind('change',function(e){
            doFilt();
        });
    }


    function buildmassdiv(){
        $("#DDCMassDiv").html('<b>Mass Update Options (leave text boxes blank in order to not update on)</b><hr />');
        if(iso==1) {
            var masstable = document.createElement('table');
            var row1 = document.createElement('tr');
            var cell11 = document.createElement('td');
            var cell12 = document.createElement('td');
            var cell13 = document.createElement('td');
            var cell14 = document.createElement('td');
            var row2 = document.createElement('tr');
            var cell21 = document.createElement('td');
            var cell22 = document.createElement('td');
            var cell23 = document.createElement('td');
            var cell24 = document.createElement('td');
            masstable.appendChild(row1);
            row1.appendChild(cell11);
            row1.appendChild(cell12);
            row1.appendChild(cell13);
            row1.appendChild(cell14);
            masstable.appendChild(row2);
            row2.appendChild(cell21);
            row2.appendChild(cell22);
            row2.appendChild(cell23);
            row2.appendChild(cell24);
    
            var row3 = document.createElement('tr');
            var cell31 = document.createElement('td');
            var cell32 = document.createElement('td');
            var cell33 = document.createElement('td');
            var cell34 = document.createElement('td');
    
            cell31.setAttribute('width','20%');
            cell32.setAttribute('width','30%');
            cell33.setAttribute('width','20%');
            cell34.setAttribute('width','30%');
            masstable.appendChild(row3);
            row3.appendChild(cell31);
            row3.appendChild(cell32);
            row3.appendChild(cell33);
            row3.appendChild(cell34);
    
    
            var row4 = document.createElement('tr');
            var cell41 = document.createElement('td');
            var cell42 = document.createElement('td');
            var cell43 = document.createElement('td');
            var cell44 = document.createElement('td');
    
            cell41.setAttribute('width','20%');
            cell42.setAttribute('width','30%');
            cell43.setAttribute('width','20%');
            cell44.setAttribute('width','30%');
            masstable.appendChild(row4);
            row4.appendChild(cell41);
            row4.appendChild(cell42);
            row4.appendChild(cell43);
            row4.appendChild(cell44);
    
    
            var row5 = document.createElement('tr');
            var cell51 = document.createElement('td');
            var cell52 = document.createElement('td');
            var cell53 = document.createElement('td');
            var cell54 = document.createElement('td');
            cell51.setAttribute('width','20%');
            cell52.setAttribute('width','30%');
            cell53.setAttribute('width','20%');
            cell54.setAttribute('width','30%');
            masstable.appendChild(row5);
            row5.appendChild(cell51);
            row5.appendChild(cell52);
            row5.appendChild(cell53);
            row5.appendChild(cell54);
    
    
            var row6 = document.createElement('tr');
            var cell61 = document.createElement('td');
            var cell62 = document.createElement('td');
            var cell63 = document.createElement('td');
            var cell64 = document.createElement('td');
            cell61.setAttribute('width','20%');
            cell62.setAttribute('width','30%');
            cell63.setAttribute('width','20%');
            cell64.setAttribute('width','30%');
            masstable.appendChild(row6);
            row6.appendChild(cell61);
            row6.appendChild(cell62);
            row6.appendChild(cell63);
            row6.appendChild(cell64);


            var row7 = document.createElement('tr');
            var cell71 = document.createElement('td');
            var cell72 = document.createElement('td');
            var cell73 = document.createElement('td');
            var cell74 = document.createElement('td');
            cell71.setAttribute('width','20%');
            cell72.setAttribute('width','30%');
            cell73.setAttribute('width','20%');
            cell74.setAttribute('width','30%');
            masstable.appendChild(row7);
            row7.appendChild(cell71);
            row7.appendChild(cell72);
            row7.appendChild(cell73);
            row7.appendChild(cell74);
    
    
            masstable.setAttribute('cellpadding','3');
            masstable.setAttribute('cellspacing','3');
            masstable.setAttribute('width','90%');
    
    
    
            var masstimetxt = document.createElement('input');
            masstimetxt.setAttribute('type','text');
            masstimetxt.setAttribute('id','masstimetxt');
            cell12.appendChild(masstimetxt);
            cell11.innerHTML = '<b>Time Remaining:</b>'
            cell12.innerHTML = 'less than ' + cell12.innerHTML  + ' secs ';
    
            var massballspot1 = document.createElement('select');
            massballspot1.setAttribute('id', 'massballspot1');
            massballspot1.options[0]= new Option('Empty', '', true, true);
            massballspot1.options[1]= new Option('Own Goal',"0", false, false);
            massballspot1.options[2]= new Option('Own 3',"3", false, false);
            massballspot1.options[3]= new Option('Own 5',"5", false, false);
            massballspot1.options[4]= new Option('Own 10',"10", false, false);
            massballspot1.options[5]= new Option('Own 15',"15", false, false);
            massballspot1.options[6]= new Option('Own 20',"20", false, false);
            massballspot1.options[7]= new Option('Own 25',"25", false, false);
            massballspot1.options[8]= new Option('Own 30',"30", false, false);
            massballspot1.options[9]= new Option('Own 35',"35", false, false);
            massballspot1.options[10]= new Option('Own 40',"40", false, false);
            massballspot1.options[11]= new Option('Own 45',"45", false, false);
            massballspot1.options[12]= new Option('The 50',"50", false, false);
            massballspot1.options[13]= new Option('Opponent 45',"55", false, false);
            massballspot1.options[14]= new Option('Opponent 40',"60", false, false);
            massballspot1.options[15]= new Option('Opponent 35',"65", false, false);
            massballspot1.options[16]= new Option('Opponent 30',"70", false, false);
            massballspot1.options[17]= new Option('Opponent 25',"75", false, false);
            massballspot1.options[18]= new Option('Opponent 20',"80", false, false);
            massballspot1.options[19]= new Option('Opponent 15',"85", false, false);
            massballspot1.options[20]= new Option('Opponent 10',"90", false, false);
            massballspot1.options[21]= new Option('Opponent 5',"95", false, false);
            massballspot1.options[22]= new Option('Opponent 3',"97", false, false);
            massballspot1.options[23]= new Option('Opponent Goal',"100", false, false);


            var massballspot2 = document.createElement('select');
            massballspot2.setAttribute('id', 'massballspot2');
            massballspot2.options[0]= new Option('Empty', '', true, true);
            massballspot2.options[1]= new Option('Own Goal',"0", false, false);
            massballspot2.options[2]= new Option('Own 3',"3", false, false);
            massballspot2.options[3]= new Option('Own 5',"5", false, false);
            massballspot2.options[4]= new Option('Own 10',"10", false, false);
            massballspot2.options[5]= new Option('Own 15',"15", false, false);
            massballspot2.options[6]= new Option('Own 20',"20", false, false);
            massballspot2.options[7]= new Option('Own 25',"25", false, false);
            massballspot2.options[8]= new Option('Own 30',"30", false, false);
            massballspot2.options[9]= new Option('Own 35',"35", false, false);
            massballspot2.options[10]= new Option('Own 40',"40", false, false);
            massballspot2.options[11]= new Option('Own 45',"45", false, false);
            massballspot2.options[12]= new Option('The 50',"50", false, false);
            massballspot2.options[13]= new Option('Opponent 45',"55", false, false);
            massballspot2.options[14]= new Option('Opponent 40',"60", false, false);
            massballspot2.options[15]= new Option('Opponent 35',"65", false, false);
            massballspot2.options[16]= new Option('Opponent 30',"70", false, false);
            massballspot2.options[17]= new Option('Opponent 25',"75", false, false);
            massballspot2.options[18]= new Option('Opponent 20',"80", false, false);
            massballspot2.options[19]= new Option('Opponent 15',"85", false, false);
            massballspot2.options[20]= new Option('Opponent 10',"90", false, false);
            massballspot2.options[21]= new Option('Opponent 5',"95", false, false);
            massballspot2.options[22]= new Option('Opponent 3',"97", false, false);
            massballspot2.options[23]= new Option('Opponent Goal',"100", false, false);

            cell14.appendChild(massballspot1);
            cell14.innerHTML += ' and ';
            cell14.appendChild(massballspot2);
            cell13.innerHTML = '<b>Ball Position:</b> ';
    
            var massdown1 = document.createElement('select');
            massdown1.setAttribute('id', 'massdown1');
            massdown1.options[0]= new Option('Empty', '', true, true);
            massdown1.options[1]= new Option('First',"1", false, false);
            massdown1.options[2]= new Option('Second',"2", false, false);
            massdown1.options[3]= new Option('Third',"3", false, false);
            massdown1.options[4]= new Option('Fourth',"4", false, false);

            var massdown2 = document.createElement('select');
            massdown2.setAttribute('id', 'massdown2');
            massdown2.options[0]= new Option('Empty', '', true, true);
            massdown2.options[1]= new Option('First',"1", false, false);
            massdown2.options[2]= new Option('Second',"2", false, false);
            massdown2.options[3]= new Option('Third',"3", false, false);
            massdown2.options[4]= new Option('Fourth',"4", false, false);
    
            cell21.innerHTML = '<b>Down:</b>';
            cell22.appendChild(massdown1);
            cell22.innerHTML += ' and ';
            cell22.appendChild(massdown2);

    
            var massydstofirst1 = document.createElement('input');
            massydstofirst1.setAttribute('type','text');
            massydstofirst1.setAttribute('id','massydstofirst1');
            massydstofirst1.setAttribute('size','4');
            var massydstofirst2 = document.createElement('input');
            massydstofirst2.setAttribute('type','text');
            massydstofirst2.setAttribute('id','massydstofirst2');
            massydstofirst2.setAttribute('size','4');
            cell24.appendChild(massydstofirst1);
            cell24.innerHTML += ' and ';
            cell24.appendChild(massydstofirst2);
            cell23.innerHTML = '<b>Yards to First:</b> ';
    
    
            var massmytoleft = document.createElement('select');
            massmytoleft.setAttribute('id', 'massmytoleft');
            massmytoleft.options[0]= new Option('Any Amount', '', true, true);
            massmytoleft.options[1]= new Option('3',"3", false, false);
            massmytoleft.options[2]= new Option('2',"2", false, false);
            massmytoleft.options[3]= new Option('1',"1", false, false);
            massmytoleft.options[4]= new Option('0',"0", false, false);
    
            cell31.innerHTML = '<b>My Timeouts Left:</b>';
            cell32.appendChild(massmytoleft);
    
    
            var massopptoleft = document.createElement('select');
            massopptoleft.setAttribute('id', 'massopptoleft');
            massopptoleft.options[0]= new Option('Any Amount', '', true, true);
            massopptoleft.options[1]= new Option('3',"3", false, false);
            massopptoleft.options[2]= new Option('2',"2", false, false);
            massopptoleft.options[3]= new Option('1',"1", false, false);
            massopptoleft.options[4]= new Option('0',"0", false, false);
    
            cell33.innerHTML = '<b>Opponents Timeouts Left:</b>';
            cell34.appendChild(massopptoleft);
    
    
    
            var massclockrun = document.createElement('select');
            massclockrun.setAttribute('id', 'massclockrun');
            massclockrun.options[0]= new Option('Either', '', true, true);
            massclockrun.options[1]= new Option('Yes',"1", false, false);
            massclockrun.options[2]= new Option('No',"0", false, false);
    
            cell41.innerHTML = '<b>Clock Running:</b>';
            cell42.appendChild(massclockrun);
    
            var massscorediff1 = document.createElement('input');
            massscorediff1.setAttribute('type','text');
            massscorediff1.setAttribute('id','massscorediff1');
            massscorediff1.setAttribute('size','4');
            var massscorediff2 = document.createElement('input');
            massscorediff2.setAttribute('type','text');
            massscorediff2.setAttribute('id','massscorediff2');
            massscorediff2.setAttribute('size','4');
            cell44.appendChild(massscorediff1);
            cell44.innerHTML += ' and ';
            cell44.appendChild(massscorediff2);
            cell43.innerHTML = '<b>Score Difference:<img src="/images/question.gif" onmouseover="set_tip(' + String.fromCharCode(39) + 'Points difference in the score.<br><br>Negative numbers: you are losing.<br>Positive numbers: you are winning.' + String.fromCharCode(39) + ', 0, 1, 1, 1)" onmouseout="unset_tip()"></b> ';
    
    
            var massspec = document.createElement('select');
            massspec.setAttribute('id', 'massspec');
            massspec.options[0]= new Option('None', '', true, true);
            massspec.options[1]= new Option('Within Field Goal Range',"in_field_goal_range", false, false);
            massspec.options[2]= new Option('Outside Field Goal Range',"out_field_goal_range", false, false);
            massspec.options[3]= new Option('Near Field Goal Range (5yds)',"near_field_goal_range_5", false, false);
            massspec.options[4]= new Option('Near Field Goal Range (10yds)',"near_field_goal_range_10", false, false);
    
    
            cell51.innerHTML = '<b>Special Circumstances:</b>';
            cell52.appendChild(massspec);
    
    
            var massautoadj = document.createElement('select');
            massautoadj.setAttribute('id', 'massautoadj');
            massautoadj.options[0]= new Option('None', '', true, true);
            massautoadj.options[1]= new Option('Adjust Very Quickly',"5", false, false);
            massautoadj.options[2]= new Option('Adjust Quickly',"4", false, false);
            massautoadj.options[3]= new Option('Adjust Medium',"3", false, false);
            massautoadj.options[4]= new Option('Adjust Slowly',"2", false, false);
            massautoadj.options[5]= new Option('Adjust Very Slowly',"1", false, false);
    
            cell53.innerHTML = '<b>Auto Adjust:</b>';
            cell54.appendChild(massautoadj);
    
            var massplays = document.createElement('select');
            massplays.setAttribute('id','massplays');
            massplays.options[0]= new Option('No Update', "", true, true);
            massplays.options[1]= new Option('Inside Run',"inside_run", false, false);
            massplays.options[2]= new Option('Outside Run',"outside_run", false, false);
            massplays.options[3]= new Option('Outside Run - Handoff',"outside_run_off_tackle", false, false);
            massplays.options[4]= new Option('Outside Run - Pitch',"outside_run_pitch", false, false);
            massplays.options[5]= new Option('Run (random)',"run", false, false);
            massplays.options[6]= new Option('Pass',"pass", false, false);
            massplays.options[7]= new Option('Goal Line',"goal_line", false, false);
            massplays.options[8]= new Option('QB Kneel',"kneel", false, false);
            massplays.options[9]= new Option('QB Spike',"spike", false, false);
            massplays.options[10]= new Option('Field Goal',"field_goal", false, false);
            massplays.options[11]= new Option('Punt',"punt", false, false);
    
            cell61.innerHTML = '<b>Play Type:</b>';
            cell62.appendChild(massplays);
    
            var masspackages = document.createElement('select');
            masspackages.setAttribute('id', 'masspackages');
            masspackages.options[0]=new Option('No Update', '', true, true)
            for (var q=0;q<playlistid.length;q++) {
                masspackages.options[q+1] = new Option(playlistname[q],playlistid[q],false,false);
            }
            
            cell63.innerHTML = '<b>Package:</b>';
            cell64.appendChild(masspackages);
            
    
        }else{
            var masstable = document.createElement('table');
            var row1 = document.createElement('tr');
            var cell11 = document.createElement('td');
            var cell12 = document.createElement('td');
            var cell13 = document.createElement('td');
            var cell14 = document.createElement('td');
            var row2 = document.createElement('tr');
            var cell21 = document.createElement('td');
            var cell22 = document.createElement('td');
            var cell23 = document.createElement('td');
            var cell24 = document.createElement('td');
            masstable.appendChild(row1);
            row1.appendChild(cell11);
            row1.appendChild(cell12);
            row1.appendChild(cell13);
            row1.appendChild(cell14);
            masstable.appendChild(row2);
            row2.appendChild(cell21);
            row2.appendChild(cell22);
            row2.appendChild(cell23);
            row2.appendChild(cell24);
    
            var row3 = document.createElement('tr');
            var cell31 = document.createElement('td');
            var cell32 = document.createElement('td');
            var cell33 = document.createElement('td');
            var cell34 = document.createElement('td');
    
            cell31.setAttribute('width','20%');
            cell32.setAttribute('width','30%');
            cell33.setAttribute('width','20%');
            cell34.setAttribute('width','30%');
            masstable.appendChild(row3);
            row3.appendChild(cell31);
            row3.appendChild(cell32);
            row3.appendChild(cell33);
            row3.appendChild(cell34);
    
    
            var row4 = document.createElement('tr');
            var cell41 = document.createElement('td');
            var cell42 = document.createElement('td');
            var cell43 = document.createElement('td');
            var cell44 = document.createElement('td');
    
            cell41.setAttribute('width','20%');
            cell42.setAttribute('width','30%');
            cell43.setAttribute('width','20%');
            cell44.setAttribute('width','30%');
            masstable.appendChild(row4);
            row4.appendChild(cell41);
            row4.appendChild(cell42);
            row4.appendChild(cell43);
            row4.appendChild(cell44);
    
    
            var row5 = document.createElement('tr');
            var cell51 = document.createElement('td');
            var cell52 = document.createElement('td');
            var cell53 = document.createElement('td');
            var cell54 = document.createElement('td');
            cell51.setAttribute('width','20%');
            cell52.setAttribute('width','30%');
            cell53.setAttribute('width','20%');
            cell54.setAttribute('width','30%');
            masstable.appendChild(row5);
            row5.appendChild(cell51);
            row5.appendChild(cell52);
            row5.appendChild(cell53);
            row5.appendChild(cell54);
    
    
            var row6 = document.createElement('tr');
            var cell61 = document.createElement('td');
            var cell62 = document.createElement('td');
            var cell63 = document.createElement('td');
            var cell64 = document.createElement('td');
            cell61.setAttribute('width','20%');
            cell62.setAttribute('width','30%');
            cell63.setAttribute('width','20%');
            cell64.setAttribute('width','30%');
            masstable.appendChild(row6);
            row6.appendChild(cell61);
            row6.appendChild(cell62);
            row6.appendChild(cell63);
            row6.appendChild(cell64);

            var row7 = document.createElement('tr');
            var cell71 = document.createElement('td');
            var cell72 = document.createElement('td');
            var cell73 = document.createElement('td');
            var cell74 = document.createElement('td');
            cell71.setAttribute('width','20%');
            cell72.setAttribute('width','30%');
            cell73.setAttribute('width','20%');
            cell74.setAttribute('width','30%');
            masstable.appendChild(row7);
            row7.appendChild(cell71);
            row7.appendChild(cell72);
            row7.appendChild(cell73);
            row7.appendChild(cell74);
    
    
    
            masstable.setAttribute('cellpadding','3');
            masstable.setAttribute('cellspacing','3');
            masstable.setAttribute('width','90%');
    
    
    
            var masstimetxt = document.createElement('input');
            masstimetxt.setAttribute('type','text');
            masstimetxt.setAttribute('id','masstimetxt');
            cell12.appendChild(masstimetxt);
            cell11.innerHTML = '<b>Time Remaining:</b>'
            cell12.innerHTML = 'less than ' + cell12.innerHTML  + ' secs ';
    
            var massballspot1 = document.createElement('select');
            massballspot1.setAttribute('id', 'massballspot1');
            massballspot1.options[0]= new Option('Empty', '', true, true);
            massballspot1.options[1]= new Option('Own Goal',"0", false, false);
            massballspot1.options[2]= new Option('Own 3',"3", false, false);
            massballspot1.options[3]= new Option('Own 5',"5", false, false);
            massballspot1.options[4]= new Option('Own 10',"10", false, false);
            massballspot1.options[5]= new Option('Own 15',"15", false, false);
            massballspot1.options[6]= new Option('Own 20',"20", false, false);
            massballspot1.options[7]= new Option('Own 25',"25", false, false);
            massballspot1.options[8]= new Option('Own 30',"30", false, false);
            massballspot1.options[9]= new Option('Own 35',"35", false, false);
            massballspot1.options[10]= new Option('Own 40',"40", false, false);
            massballspot1.options[11]= new Option('Own 45',"45", false, false);
            massballspot1.options[12]= new Option('The 50',"50", false, false);
            massballspot1.options[13]= new Option('Opponent 45',"55", false, false);
            massballspot1.options[14]= new Option('Opponent 40',"60", false, false);
            massballspot1.options[15]= new Option('Opponent 35',"65", false, false);
            massballspot1.options[16]= new Option('Opponent 30',"70", false, false);
            massballspot1.options[17]= new Option('Opponent 25',"75", false, false);
            massballspot1.options[18]= new Option('Opponent 20',"80", false, false);
            massballspot1.options[19]= new Option('Opponent 15',"85", false, false);
            massballspot1.options[20]= new Option('Opponent 10',"90", false, false);
            massballspot1.options[21]= new Option('Opponent 5',"95", false, false);
            massballspot1.options[22]= new Option('Opponent 3',"97", false, false);
            massballspot1.options[23]= new Option('Opponent Goal',"100", false, false);


            var massballspot2 = document.createElement('select');
            massballspot2.setAttribute('id', 'massballspot2');
            massballspot2.options[0]= new Option('Empty', '', true, true);
            massballspot2.options[1]= new Option('Own Goal',"0", false, false);
            massballspot2.options[2]= new Option('Own 3',"3", false, false);
            massballspot2.options[3]= new Option('Own 5',"5", false, false);
            massballspot2.options[4]= new Option('Own 10',"10", false, false);
            massballspot2.options[5]= new Option('Own 15',"15", false, false);
            massballspot2.options[6]= new Option('Own 20',"20", false, false);
            massballspot2.options[7]= new Option('Own 25',"25", false, false);
            massballspot2.options[8]= new Option('Own 30',"30", false, false);
            massballspot2.options[9]= new Option('Own 35',"35", false, false);
            massballspot2.options[10]= new Option('Own 40',"40", false, false);
            massballspot2.options[11]= new Option('Own 45',"45", false, false);
            massballspot2.options[12]= new Option('The 50',"50", false, false);
            massballspot2.options[13]= new Option('Opponent 45',"55", false, false);
            massballspot2.options[14]= new Option('Opponent 40',"60", false, false);
            massballspot2.options[15]= new Option('Opponent 35',"65", false, false);
            massballspot2.options[16]= new Option('Opponent 30',"70", false, false);
            massballspot2.options[17]= new Option('Opponent 25',"75", false, false);
            massballspot2.options[18]= new Option('Opponent 20',"80", false, false);
            massballspot2.options[19]= new Option('Opponent 15',"85", false, false);
            massballspot2.options[20]= new Option('Opponent 10',"90", false, false);
            massballspot2.options[21]= new Option('Opponent 5',"95", false, false);
            massballspot2.options[22]= new Option('Opponent 3',"97", false, false);
            massballspot2.options[23]= new Option('Opponent Goal',"100", false, false);

            cell14.appendChild(massballspot1);
            cell14.innerHTML += ' and ';
            cell14.appendChild(massballspot2);
            cell13.innerHTML = '<b>Ball Position:</b> ';
    
            var massdown1 = document.createElement('select');
            massdown1.setAttribute('id', 'massdown1');
            massdown1.options[0]= new Option('Empty', '', true, true);
            massdown1.options[1]= new Option('First',"1", false, false);
            massdown1.options[2]= new Option('Second',"2", false, false);
            massdown1.options[3]= new Option('Third',"3", false, false);
            massdown1.options[4]= new Option('Fourth',"4", false, false);

            var massdown2 = document.createElement('select');
            massdown2.setAttribute('id', 'massdown2');
            massdown2.options[0]= new Option('Empty', '', true, true);
            massdown2.options[1]= new Option('First',"1", false, false);
            massdown2.options[2]= new Option('Second',"2", false, false);
            massdown2.options[3]= new Option('Third',"3", false, false);
            massdown2.options[4]= new Option('Fourth',"4", false, false);
    
            cell21.innerHTML = '<b>Down:</b>';
            cell22.appendChild(massdown1);
            cell22.innerHTML += ' and ';
            cell22.appendChild(massdown2);

    
            var massydstofirst1 = document.createElement('input');
            massydstofirst1.setAttribute('type','text');
            massydstofirst1.setAttribute('id','massydstofirst1');
            massydstofirst1.setAttribute('size','4');
            var massydstofirst2 = document.createElement('input');
            massydstofirst2.setAttribute('type','text');
            massydstofirst2.setAttribute('id','massydstofirst2');
            massydstofirst2.setAttribute('size','4');
            cell24.appendChild(massydstofirst1);
            cell24.innerHTML += ' and ';
            cell24.appendChild(massydstofirst2);
            cell23.innerHTML = '<b>Yards to First:</b> ';


            var massmytoleft = document.createElement('select');
            massmytoleft.setAttribute('id', 'massmytoleft');
            massmytoleft.options[0]= new Option('Any Amount', '', true, true);
            massmytoleft.options[1]= new Option('3',"3", false, false);
            massmytoleft.options[2]= new Option('2',"2", false, false);
            massmytoleft.options[3]= new Option('1',"1", false, false);
            massmytoleft.options[4]= new Option('0',"0", false, false);
    
            cell31.innerHTML = '<b>My Timeouts Left:</b>';
            cell32.appendChild(massmytoleft);
    
    
            var massopptoleft = document.createElement('select');
            massopptoleft.setAttribute('id', 'massopptoleft');
            massopptoleft.options[0]= new Option('Any Amount', '', true, true);
            massopptoleft.options[1]= new Option('3',"3", false, false);
            massopptoleft.options[2]= new Option('2',"2", false, false);
            massopptoleft.options[3]= new Option('1',"1", false, false);
            massopptoleft.options[4]= new Option('0',"0", false, false);
    
            cell33.innerHTML = '<b>Opponents Timeouts Left:</b>';
            cell34.appendChild(massopptoleft);
    
    
    
            var massclockrun = document.createElement('select');
            massclockrun.setAttribute('id', 'massclockrun');
            massclockrun.options[0]= new Option('Either', '', true, true);
            massclockrun.options[1]= new Option('Yes',"1", false, false);
            massclockrun.options[2]= new Option('No',"0", false, false);
    
            cell41.innerHTML = '<b>Clock Running:</b>';
            cell42.appendChild(massclockrun);
    
            var massscorediff1 = document.createElement('input');
            massscorediff1.setAttribute('type','text');
            massscorediff1.setAttribute('id','massscorediff1');
            massscorediff1.setAttribute('size','4');
            var massscorediff2 = document.createElement('input');
            massscorediff2.setAttribute('type','text');
            massscorediff2.setAttribute('id','massscorediff2');
            massscorediff2.setAttribute('size','4');
            cell44.appendChild(massscorediff1);
            cell44.innerHTML += ' and ';
            cell44.appendChild(massscorediff2);
            cell43.innerHTML = '<b>Score Difference:<img src="/images/question.gif" onmouseover="set_tip(' + String.fromCharCode(39) + 'Points difference in the score.<br><br>Negative numbers: you are losing.<br>Positive numbers: you are winning.' + String.fromCharCode(39) + ', 0, 1, 1, 1)" onmouseout="unset_tip()"></b> ';
        
    
            var massspec = document.createElement('select');
            massspec.setAttribute('id', 'massspec');
            massspec.options[0]= new Option('No Update', '', true, true);
            massspec.options[1]= new Option('I (any variation)',"I", false, false);
            massspec.options[2]= new Option('Weak I',"I Weak", false, false);
            massspec.options[3]= new Option('Strong I',"I Strong", false, false);
            massspec.options[4]= new Option('Big I',"I Big", false, false);
            massspec.options[5]= new Option('Single Back',"Singleback", false, false);
            massspec.options[6]= new Option('Single Back Big',"Singleback Big", false, false);
            massspec.options[7]= new Option('Pro Set',"Splitbacks Pro", false, false);
            massspec.options[8]= new Option('Shotgun',"Shotgun", false, false);
            massspec.options[9]= new Option('Goal Line',"Goal Line", false, false);
            
    
    
            cell51.innerHTML = '<b>Opponent Formation:</b>';
            cell52.appendChild(massspec);
    
    
            var massautoadj = document.createElement('select');
            massautoadj.setAttribute('id', 'massautoadj');
            massautoadj.options[0]= new Option('None', '', true, true);
            massautoadj.options[1]= new Option('Adjust Very Quickly',"5", false, false);
            massautoadj.options[2]= new Option('Adjust Quickly',"4", false, false);
            massautoadj.options[3]= new Option('Adjust Medium',"3", false, false);
            massautoadj.options[4]= new Option('Adjust Slowly',"2", false, false);
            massautoadj.options[5]= new Option('Adjust Very Slowly',"1", false, false);
    
            cell53.innerHTML = '<b>Auto Adjust:</b>';
            cell54.appendChild(massautoadj);
    
            var massplays = document.createElement('select');
            massplays.setAttribute('id','massplays');
            massplays.options[0]= new Option('No Update', "", true, true);
            massplays.options[1]= new Option('Base Formation',"base", false, false);
            massplays.options[2]= new Option('3-4',"3-4", false, false);
            massplays.options[3]= new Option('4-3',"4-3", false, false);
            massplays.options[4]= new Option('4-2-5 Nickel (3 CBs)',"nickel", false, false);
            massplays.options[5]= new Option('4-1-6 Dime (4 CBs)',"dime", false, false);
            massplays.options[6]= new Option('3-1-7 Quarter (5 CBs)',"quarter", false, false);
            massplays.options[7]= new Option('3-3-5 Nickel (3 CBs)',"nickel 3-4", false, false);
            massplays.options[8]= new Option('3-2-6 Dime (4 CBs)',"dime 3-4", false, false);
            massplays.options[9]= new Option('Goal Line',"goal line d", false, false);

            cell61.innerHTML = '<b>Formation:</b>';
            cell62.appendChild(massplays);

            // bubblesort
            var x, y
                // The Bubble Sort method.
            var holder = new Array;
            var holder2 = new Array;
            for(x = 0; x < playlistname.length; x++) {
                for(y = 0; y < (playlistname.length-1); y++) {
                    if(playlistname[y].toUpperCase() > playlistname[y+1].toUpperCase()) {
                        holder = playlistname[y+1];
                        playlistname[y+1] = playlistname[y];
                        playlistname[y] = holder;
                        holder2 = playlistid[y+1];
                        playlistid[y+1] = playlistid[y];
                        playlistid[y] = holder2;
                    }
                }
            }
    
            var masspackages = document.createElement('select');
            masspackages.setAttribute('id', 'masspackages');
            masspackages.options[0]=new Option('No Update', '', true, true)
            for (var q=0;q<playlistid.length;q++) {
                masspackages.options[q+1] = new Option(playlistname[q],playlistid[q],false,false);
            }
            
            cell63.innerHTML = '<b>Custom Play:</b>';
            cell64.appendChild(masspackages);
        }

        cell71.innerHTML = '<b>Pct Chance:</b>';
        var masspctchance = document.createElement('input');
        masspctchance.setAttribute('type', 'text');
        masspctchance.setAttribute('id', 'masspctchance');
        masspctchance.setAttribute('size', '4');
        cell72.appendChild(masspctchance);



        $('.content_container').each(function(f){
            if (f>4) {
                var chkid = $(this).parent().attr('id');
                var chkid = 'chk_' + chkid;
                var chkbox = document.createElement('input');
                chkbox.setAttribute('type', 'checkbox');
                chkbox.setAttribute('id', chkid);
                chkbox.setAttribute('name', chkid);
                chkbox.setAttribute('value', chkid.substring(4, chkid.length));
                $(this).parent().prepend(chkbox);
            }
        })
        $('input[id*="chk_"]').hide();


        var updatebutton = document.createElement('input');
        updatebutton.setAttribute('type', 'button');
        updatebutton.setAttribute('value', ' Apply ');
        updatebutton.setAttribute('name', 'applybut');
        updatebutton.setAttribute('id', 'applybut');
        //updatebutton.setAttribute('alt', 'Update');
        

        cell74.appendChild(updatebutton);

        
        $('#DDCMassDiv').append(masstable);
        $('#DDCMassDiv').attr('style','display: none');
        $('#DDCMassDiv').hide();
        updatebutton.addEventListener('click', doMassUpdate, false);
    }


    function doMassUpdate(){
        // get what values are set
        var massvalues = new Array;
        var masscount =0;
        $('select, input','#DDCMassDiv').each(function(z){
            var vallength = $(this).attr('value');
            if(vallength.length>0) {
                massvalues[masscount] = new Array;
                massvalues[masscount][0] = $(this).attr('id');
                massvalues[masscount][1] = $(this).attr('value');
                masscount++;
            };
        });
        // if value exists 
        if(massvalues.length > 0) {
    
            // validate some checkboxes are checked
            var checkboxes = new Array;
            var checkcount = 0;
            $('input[id*="chk_"]').each(function(t){
                if ($(this).attr('checked') == true) {
                    checkboxes[checkcount] = new Array;
                    checkboxes[checkcount][0] = $(this).attr('id');
                    checkboxes[checkcount][0] = checkboxes[checkcount][0].substring(4, checkboxes[checkcount][0].length);
                    var thisid = $(this).attr('id');
                    if (thisid.indexOf('input_')>-1) {
                        checkboxes[checkcount][1] = 0;
                    }else{
                        checkboxes[checkcount][1] = 1;
                    }
                    checkcount++;
                }
            })
            // loop through inputs and outputs
            $('div[id*="input_"], div[id*="output_"]').each(function(y){
                var divid = $(this).attr('id');
                dividhold = divid.substring(divid.indexOf('_')+1, divid.length);
                if (isNaN(dividhold)==false) {
                    // loop through array 
                    for (var w=0;w<checkboxes.length;w++) {
                        // if match
                        if(divid == checkboxes[w][0]) {
                            for (var q=0;q<massvalues.length;q++) {
                                switch(massvalues[q][0]) {
                                case 'masstimetxt':
                                    $('input[id*="time_remaining_"]', $(this)).attr('value',massvalues[q][1]);
                                    break;
                                case 'massballspot1':
                                    $('select[name*="i_spot_min_"]', $(this)).attr('value',massvalues[q][1]);
                                    break;
                                case 'massballspot2':
                                    $('select[name*="i_spot_max_"]', $(this)).attr('value',massvalues[q][1]);
                                    break;
                                case 'massdown1':
                                    $('input[id*="min_down_"]', $(this)).attr('value',massvalues[q][1]);
                                    break;
                                case 'massdown2':
                                    $('input[id*="max_down_"]', $(this)).attr('value',massvalues[q][1]);
                                    break;
                                case 'massydstofirst1':
                                    $('input[id*="min_yards_to_go_"]', $(this)).attr('value',massvalues[q][1]);
                                    break;
                                case 'massydstofirst2':
                                    $('input[id*="max_yards_to_go_"]', $(this)).attr('value',massvalues[q][1]);
                                    break;
                                case 'massmytoleft':
                                    $('select[id*="my_timeouts_"]', $(this)).attr('value',massvalues[q][1]);
                                    break;
                                case 'massopptoleft':
                                    $('select[id*="opponent_timeouts_"]', $(this)).attr('value',massvalues[q][1]);
                                    break;
                                case 'massclockrun':
                                    $('select[id*="clock_running_"]', $(this)).attr('value',massvalues[q][1]);
                                    break;
                                case 'massscorediff1':
                                    $('input[id*="score_difference_min_"]', $(this)).attr('value',massvalues[q][1]);
                                    break;
                                case 'massscorediff2':
                                    $('input[id*="score_difference_max_"]', $(this)).attr('value',massvalues[q][1]);
                                    break;
                                case 'massspec':
                                    if (iso==1) {
                                        $('select[name*="i_special_"]', $(this)).attr('value',massvalues[q][1]);
                                    }else{
                                        $('select[id*="opponent_formation_"]', $(this)).attr('value',massvalues[q][1]);
                                    }
                                    break;
                                case 'massautoadj':
                                    $('select[id*="auto_adjust_"]', $(this)).attr('value',massvalues[q][1]);
                                    break;
                                case 'massplays':
                                    if (iso==1) {
                                        $('input[id*="specific_play_"]', $(this)).attr('value','');
                                        $('input[id*="custom_play_"]', $(this)).attr('value','');
                                        $('input[id*="package_id_"]', $(this)).attr('value','');
                                        $('select[id*="play_type_"]', $(this)).attr('value',massvalues[q][1]);
                                    }else{
                                        $('input[id*="specific_play_"]', $(this)).attr('value','');
                                        $('input[id*="custom_play_"]', $(this)).attr('value','');
                                        $('select[id*="formation_"]', $(this)).attr('value',massvalues[q][1]);
                                    }
                                    break;
                                case 'masspackages':
                                    if (iso==1) {
                                        $('input[id*="specific_play_"]', $(this)).attr('value','');
                                        $('input[id*="custom_play_"]', $(this)).attr('value','');
                                        $('input[id*="package_id_"]', $(this)).attr('value',massvalues[q][1]);
                                        $('select[id*="play_type_"]', $(this)).attr('value','');
                                    }else{
                                        $('input[id*="specific_play_"]', $(this)).attr('value',massvalues[q][1]);
                                        $('input[id*="custom_play_"]', $(this)).attr('value','1');
                                        $('select[id*="formation_"]', $(this)).attr('value','');
                                    }
                                    break;
                                case 'masspctchance':
                                    $('input[id*="bias_"]', $(this)).attr('value',massvalues[q][1]);
                                    break;
                                }
                                // update appropriate field
                                

                            }
                        }
                    }
                }
            })
            
        }
        // reset all apply fields
        $('select, input','#DDCMassDiv').attr('value','');
        $('#applybut', '#DDCMassDiv').attr('value',' Apply ');
    }



    function sortselectchange(){
        var usedfilts = new Array;
        $('select','#DDCSortDiv').each(function(i){
            if ($(this).attr('value') != ''){
                usedfilts.push($(this).attr('value'));
            };
        })
        $('select','#DDCSortDiv').each(function(i){
            $(this).children().each(function(t){
                if (usedfilts.length>0) {
                    var isfound = 0;
                    for (var q=0;q<usedfilts.length;q++) {
                        if ($(this).attr('value')== usedfilts[q]) {
                            isfound = 1;
                        }
                    }
                    if (isfound == 1) {
                        $(this).hide();
                    }else{
                        $(this).show();
                    }
                }else{
                    $(this).show();
                }
            })
            
        })
    };



    function buildsortdiv(){
        $("#DDCSortDiv").html('<b>Sort Options</b><hr />');
        $('#DDCSortDiv').attr('style','display: none');
        var sorttable = document.createElement('table');
        var row1 = document.createElement('tr');
        var cell11 = document.createElement('td');
        var cell12 = document.createElement('td');
        cell12.setAttribute('width','50%');
        var row2 = document.createElement('tr');
        var cell21 = document.createElement('td');
        cell21.setAttribute('width','50%');
        var cell22 = document.createElement('td');
        cell11.setAttribute('width','50%');
        cell12.setAttribute('width','50%');
        sorttable.appendChild(row1);
        row1.appendChild(cell11);
        row1.appendChild(cell12);
        cell21.setAttribute('width','50%');
        cell22.setAttribute('width','50%');
        sorttable.appendChild(row2);
        row2.appendChild(cell21);
        row2.appendChild(cell22);
        cell11.style.border="solid 1px";
        cell12.style.border="solid 1px";
        cell21.style.border="solid 1px";
        cell22.style.border="solid 1px";

        
        cell11.innerHTML='<center><b>Inputs</b></center>';
        cell12.innerHTML='<center><b>Outputs</b></center>';
        sorttable.setAttribute('cellpadding','3');
        sorttable.setAttribute('cellspacing','3');
        sorttable.setAttribute('width','100%');
        sorttable.setAttribute('border','0');


        var sortcell21table = document.createElement('table');
        var sort2row1 = document.createElement('tr');
        var sort2cell11 = document.createElement('td');
        var sort2cell12 = document.createElement('td');
        sortcell21table.setAttribute('width','100%');
        sort2cell11.setAttribute('width','50%');
        sort2cell12.setAttribute('width','50%');
        sort2row1.appendChild(sort2cell11);
        sort2row1.appendChild(sort2cell12);
        sortcell21table.appendChild(sort2row1);


        var sort2row2 = document.createElement('tr');
        var sort2cell21 = document.createElement('td');
        var sort2cell22 = document.createElement('td');
        sort2cell21.setAttribute('width','50%');
        sort2cell22.setAttribute('width','50%');
        sort2row2.appendChild(sort2cell21);
        sort2row2.appendChild(sort2cell22);
        sortcell21table.appendChild(sort2row2);


        var sort2row3 = document.createElement('tr');
        var sort2cell31 = document.createElement('td');
        var sort2cell32 = document.createElement('td');
        sort2cell31.setAttribute('width','50%');
        sort2cell32.setAttribute('width','50%');
        sort2row3.appendChild(sort2cell31);
        sort2row3.appendChild(sort2cell32);
        sortcell21table.appendChild(sort2row3);




        sort2cell11.innerHTML = 'Down:';
        var sortdown = document.createElement('select');
        sortdown.setAttribute('id', 'sortdown');
        sortdown.options[0] = new Option('Not Sorted On', '', true, true);
        sortdown.options[1] = new Option('First', '0', false, false);
        sortdown.options[2] = new Option('Second', '1', false, false);
        sortdown.options[3] = new Option('Third', '2', false, false);
        sortdown.options[4] = new Option('Fourth', '3', false, false);
        sortdown.options[5] = new Option('Fifth', '4', false, false);
        sortdown.addEventListener('change',sortselectchange, false);
        sort2cell12.appendChild(sortdown);


        sort2cell21.innerHTML = 'Yards to Go:';
        var sortytg = document.createElement('select');
        sortytg.setAttribute('id', 'sortytg');
        sortytg.options[0] = new Option('Not Sorted On', '', true, true);
        sortytg.options[1] = new Option('First', '0', false, false);
        sortytg.options[2] = new Option('Second', '1', false, false);
        sortytg.options[3] = new Option('Third', '2', false, false);
        sortytg.options[4] = new Option('Fourth', '3', false, false);
        sortytg.options[5] = new Option('Fifth', '4', false, false);
        sortytg.addEventListener('change',sortselectchange, false);
        sort2cell22.appendChild(sortytg);


        sort2cell31.innerHTML = 'Input Name:';
        var sortname = document.createElement('select');
        sortname.setAttribute('id', 'sortname');
        sortname.options[0] = new Option('Not Sorted On', '', true, true);
        sortname.options[1] = new Option('First', '0', false, false);
        sortname.options[2] = new Option('Second', '1', false, false);
        sortname.options[3] = new Option('Third', '2', false, false);
        sortname.options[4] = new Option('Fourth', '3', false, false);
        sortname.options[5] = new Option('Fifth', '4', false, false);
        sortname.addEventListener('change',sortselectchange, false);
        sort2cell32.appendChild(sortname);





        cell21.appendChild(sortcell21table);

        var sortcell22table = document.createElement('table');
        var sort3row1 = document.createElement('tr');
        var sort3cell11 = document.createElement('td');
        var sort3cell12 = document.createElement('td');
        sortcell22table.setAttribute('width','100%');
        sort3cell11.setAttribute('width','50%');
        sort3cell12.setAttribute('width','50%');
        sort3row1.appendChild(sort3cell11);
        sort3row1.appendChild(sort3cell12);
        sortcell22table.appendChild(sort3row1);


        var sort3row2 = document.createElement('tr');
        var sort3cell21 = document.createElement('td');
        var sort3cell22 = document.createElement('td');
        sort3cell21.setAttribute('width','50%');
        sort3cell22.setAttribute('width','50%');
        sort3row2.appendChild(sort3cell21);
        sort3row2.appendChild(sort3cell22);
        sortcell22table.appendChild(sort3row2);


        var sort3row3 = document.createElement('tr');
        var sort3cell31 = document.createElement('td');
        var sort3cell32 = document.createElement('td');
        sort3cell31.setAttribute('width','50%');
        sort3cell32.setAttribute('width','50%');
        sort3row3.appendChild(sort3cell31);
        sort3row3.appendChild(sort3cell32);
        sortcell22table.appendChild(sort3row3);


        var sort3row4 = document.createElement('tr');
        var sort3cell41 = document.createElement('td');
        var sort3cell42 = document.createElement('td');
        sort3cell41.setAttribute('width','50%');
        sort3cell42.setAttribute('width','50%');
        sort3row4.appendChild(sort3cell41);
        sort3row4.appendChild(sort3cell42);
        sortcell22table.appendChild(sort3row4);


        var sort3row5 = document.createElement('tr');
        var sort3cell51 = document.createElement('td');
        var sort3cell52 = document.createElement('td');
        sort3cell51.setAttribute('width','50%');
        sort3cell52.setAttribute('width','50%');
        sort3row5.appendChild(sort3cell51);
        sort3row5.appendChild(sort3cell52);
        sortcell22table.appendChild(sort3row5);




        sort3cell11.innerHTML = 'Pct Chance:';
        var sortoutpctchance = document.createElement('select');
        sortoutpctchance.setAttribute('id', 'sortoutpctchance');
        sortoutpctchance.options[0] = new Option('Not Sorted On', '', true, true);
        sortoutpctchance.options[1] = new Option('First', '0', false, false);
        sortoutpctchance.options[2] = new Option('Second', '1', false, false);
        sortoutpctchance.options[3] = new Option('Third', '2', false, false);
        sortoutpctchance.options[4] = new Option('Fourth', '3', false, false);
        sortoutpctchance.options[5] = new Option('Fifth', '4', false, false);
        sortoutpctchance.addEventListener('change',sortselectchange, false);
        sort3cell12.appendChild(sortoutpctchance);

        sort3cell21.innerHTML = 'Play Type:';
        var sortoutplaytype = document.createElement('select');
        sortoutplaytype.setAttribute('id', 'sortoutplaytype');
        sortoutplaytype.options[0] = new Option('Not Sorted On', '', true, true);
        sortoutplaytype.options[1] = new Option('First', '0', false, false);
        sortoutplaytype.options[2] = new Option('Second', '1', false, false);
        sortoutplaytype.options[3] = new Option('Third', '2', false, false);
        sortoutplaytype.options[4] = new Option('Fourth', '3', false, false);
        sortoutplaytype.options[5] = new Option('Fifth', '4', false, false);
        sortoutplaytype.addEventListener('change',sortselectchange, false);
        sort3cell22.appendChild(sortoutplaytype);

        sort3cell31.innerHTML = 'Output Name:';
        var sortoutname = document.createElement('select');
        sortoutname.setAttribute('id', 'sortoutname');
        sortoutname.options[0] = new Option('Not Sorted On', '', true, true);
        sortoutname.options[1] = new Option('First', '0', false, false);
        sortoutname.options[2] = new Option('Second', '1', false, false);
        sortoutname.options[3] = new Option('Third', '2', false, false);
        sortoutname.options[4] = new Option('Fourth', '3', false, false);
        sortoutname.options[5] = new Option('Fifth', '4', false, false);
        sortoutname.addEventListener('change',sortselectchange, false);
        sort3cell32.appendChild(sortoutname);


        sort3cell41.innerHTML = 'Formation:';
        var sortoutformation = document.createElement('select');
        sortoutformation.setAttribute('id', 'sortoutformation');
        sortoutformation.options[0] = new Option('Not Sorted On', '', true, true);
        sortoutformation.options[1] = new Option('First', '0', false, false);
        sortoutformation.options[2] = new Option('Second', '1', false, false);
        sortoutformation.options[3] = new Option('Third', '2', false, false);
        sortoutformation.options[4] = new Option('Fourth', '3', false, false);
        sortoutformation.options[5] = new Option('Fifth', '4', false, false);
        sortoutformation.addEventListener('change',sortselectchange, false);
        sort3cell42.appendChild(sortoutformation);


        sort3cell51.innerHTML = 'Package:';
        var sortoutpackage = document.createElement('select');
        sortoutpackage.setAttribute('id', 'sortoutpackage');
        sortoutpackage.options[0] = new Option('Not Sorted On', '', true, true);
        sortoutpackage.options[1] = new Option('First', '0', false, false);
        sortoutpackage.options[2] = new Option('Second', '1', false, false);
        sortoutpackage.options[3] = new Option('Third', '2', false, false);
        sortoutpackage.options[4] = new Option('Fourth', '3', false, false);
        sortoutpackage.options[5] = new Option('Fifth', '4', false, false);
        sortoutpackage.addEventListener('change',sortselectchange, false);
        sort3cell52.appendChild(sortoutpackage);




        cell22.appendChild(sortcell22table);

        $('#DDCSortDiv').append(sorttable);
        $('#DDCSortDiv').attr('style','display: none');
        $('select','#DDCSortDiv').bind('change',function(e){
            doSort(0);
        });

        //build arroutputs and inputs for Offense 
        /*
        arrinputs[row][0] = inputid;
        arrinputs[row][1] = down;
        arrinputs[row][2] = sortytg;
        arrinputs[row][3] = sortname;
        arrinputs[row][4] = div html;
        arrinputs[row][5] = quarter;
        arrinputs[row][6] = base position;
        arrinputs[row][7] = new position;

        arroutputs[row][0] = inputid;
        arroutputs[row][1] = outputid;
        arroutputs[row][2] = pct chance;
        arroutputs[row][3] = outpackage;
        arroutputs[row][4] = formation;
        arroutputs[row][5] = play type;
        arroutputs[row][6] = div html;
        arroutputs[row][7] = outputname;
        */

        //build arroutputs and inputs for Defense 
        /*
        arrinputs[row][0] = inputid;
        arrinputs[row][1] = down;
        arrinputs[row][2] = sortytg;
        arrinputs[row][3] = sortname;
        arrinputs[row][4] = div html;
        arrinputs[row][5] = quarter;
        arrinputs[row][6] = base position;
        arrinputs[row][7] = new position;

        arroutputs[row][0] = inputid;
        arroutputs[row][1] = outputid;
        arroutputs[row][2] = pct chance;
        arroutputs[row][3] = custom_play_;
        arroutputs[row][4] = formation;
        arroutputs[row][5] = specific;
        arroutputs[row][6] = div html;
        arroutputs[row][7] = outputname;
        arroutputs[row][8] = playfocus;
        */



        var arrcount = 0;
        var outarrcount =0;

        $('div[id*="input_"]').each(function(o){
            
            var divid = $(this).attr('id');
            divid = divid.substring(divid.indexOf('input_')+6, divid.length);
            if (isNaN(divid)==false) {
                arrinputs[arrcount] = new Array;
                arrinputs[arrcount][0] = divid;
                arrinputs[arrcount][1] = $('input[name*="i_min_down_"]',$(this)).eq(0).attr('value');
                arrinputs[arrcount][1] += $('input[name*="i_max_down_"]',$(this)).eq(0).attr('value');
                arrinputs[arrcount][2] = $('input[name*="i_min_yards_to_go_"]',$(this)).eq(0).attr('value');
                arrinputs[arrcount][2] += $('input[name*="i_max_yards_to_go_"]',$(this)).eq(0).attr('value');
                if (arrinputs[arrcount][2] == '') {
                    arrinputs[arrcount][2] = '9999';
                }
                arrinputs[arrcount][2] = parseInt(arrinputs[arrcount][2]);
                arrinputs[arrcount][3] = $('input[name*="i_input_name_"]',$(this)).eq(0).attr('value').toUpperCase();
                arrinputs[arrcount][4] = $('.ai_input', $(this)).eq(0).html();
                arrinputs[arrcount][5] = $('input[id="priority_'+divid+'"]').eq(0).attr('name');
                arrinputs[arrcount][5] = arrinputs[arrcount][5].substring(arrinputs[arrcount][5].indexOf('i_priority_')+11,arrinputs[arrcount][5].indexOf('_',arrinputs[arrcount][5].indexOf('i_priority_')+11));
                arrinputs[arrcount][6] = parseInt($('input[id="priority_'+divid+'"]').eq(0).attr('value'));
                arrinputs[arrcount][7] = arrinputs[arrcount][6]
                arrcount++;
                $('div[id*="output_"]', $(this)).each(function(z){
                    var outdivid = $(this).attr('id');
                    outdivid = outdivid.substring(outdivid.indexOf('output_')+7, outdivid.length);
                    if(isNaN(outdivid)==false) {
                        arroutputs[outarrcount] = new Array;
                        arroutputs[outarrcount][0] = divid;
                        arroutputs[outarrcount][1] = outdivid;
                        arroutputs[outarrcount][2] = $('#bias_'+divid+'_'+outdivid).attr('value');
                        if (iso==1) {
                            arroutputs[outarrcount][3] = $('#package_id_'+divid+'_'+outdivid).attr('value');
                        }else{
                            arroutputs[outarrcount][3] = $('#custom_play_'+divid+'_'+outdivid).attr('value');
                        }
                        arroutputs[outarrcount][4] = $('#formation_'+divid+'_'+outdivid).attr('value');
                        if (iso==1) {
                            arroutputs[outarrcount][5] = $('#play_type_'+divid+'_'+outdivid).attr('value').toUpperCase();
                        }else{
                            arroutputs[outarrcount][5] = $('#specific_play_'+divid+'_'+outdivid).attr('value').toUpperCase();
                        }
                        arroutputs[outarrcount][6] = $(this).html();
                        arroutputs[outarrcount][7] = $('#output_name_'+outdivid).attr('value').toUpperCase();
                        if (iso==0) {
                            arroutputs[outarrcount][8] = $('#focus_'+divid+'_'+outdivid).attr('value').toUpperCase();
                        }
                        outarrcount++;
                    }
                });
                
            };
        });
    }

    function buildshowdiv(){
        $("#DDCShowDiv").html('<b>No Options Available.</b><hr /><br>');
        var showtable = document.createElement('table');
        var row1 = document.createElement('tr');
        var cell11 = document.createElement('td');
        var cell12 = document.createElement('td');
        cell12.setAttribute('width','50%');
        cell11.setAttribute('width','50%');
        showtable.appendChild(row1);
        row1.appendChild(cell11);
        row1.appendChild(cell12);
        //cell11.style.border="solid 1px";
        //cell12.style.border="solid 1px";

        var linkitem = document.createElement('a');
        linkitem.addEventListener('click', function(){$('.outputs[id*="outputs_"]').show();}, false);
        linkitemtextnode = document.createTextNode('Show All Outputs');
        linkitem.appendChild(linkitemtextnode);
        cell11.appendChild(linkitem);

        var linkitem2 = document.createElement('a');
        linkitem2.addEventListener('click', function(){$('.outputs[id*="outputs_"]').hide();}, false);
        linkitemtextnode2 = document.createTextNode('Hide All Outputs');
        linkitem2.appendChild(linkitemtextnode2);
        cell12.appendChild(linkitem2);

        showtable.setAttribute('cellpadding','3');
        showtable.setAttribute('cellspacing','3');
        showtable.setAttribute('width','100%');
        showtable.setAttribute('border','0');

        $('#DDCShowDiv').append(showtable);


    }

    function buildelements(){

        var tablist = document.createElement('div');
        tablist.setAttribute('class', 'tabs');
        var tabshowall = document.createElement('div');
        tabshowall.setAttribute('class', 'subtab_on');
        tabshowall.setAttribute('id', 'showall');
        var tabshowalllink = document.createElement('a');
        tabshowalllink.addEventListener('click', showall, false);
        tabshowalltextnode = document.createTextNode('Show All');
        tabshowalllink.appendChild(tabshowalltextnode);
        tabshowall.appendChild(tabshowalllink);


        var tabfilter = document.createElement('div');
        tabfilter.setAttribute('class', 'subtab_off');
        tabfilter.setAttribute('id', 'filter');
        var tabfilterlink = document.createElement('a');
        tabfilterlink.addEventListener('click', showfilter, false);
        tabfiltertextnode = document.createTextNode('Filter');
        tabfilterlink.appendChild(tabfiltertextnode);
        tabfilter.appendChild(tabfilterlink);
        var tabsort = document.createElement('div');
        tabsort.setAttribute('class', 'subtab_off');
        tabsort.setAttribute('id', 'sort');
        var tabsortlink = document.createElement('a');
        tabsortlink.addEventListener('click', showsort, false);
        tabsorttextnode = document.createTextNode('Sort');
        tabsortlink.appendChild(tabsorttextnode);
        tabsort.appendChild(tabsortlink);
        var tabdrag = document.createElement('div');
        tabdrag.setAttribute('class', 'subtab_off');
        tabdrag.setAttribute('id', 'drag');
        var tabdraglink = document.createElement('a');
        tabdraglink.addEventListener('click', showdrag, false);
        tabdragtextnode = document.createTextNode('Drag and Drop');
        tabdraglink.appendChild(tabdragtextnode);
        tabdrag.appendChild(tabdraglink);
        var tabmass = document.createElement('div');
        tabmass.setAttribute('class', 'subtab_off');
        tabmass.setAttribute('id', 'mass');
        var tabmasslink = document.createElement('a');
        tabmasslink.addEventListener('click', showmass, false);
        tabmasstextnode = document.createTextNode('Mass Update');
        tabmasslink.appendChild(tabmasstextnode);
        tabmass.appendChild(tabmasslink);
        tablist.appendChild(tabshowall);
        tablist.appendChild(tabfilter);
        tablist.appendChild(tabsort);
        tablist.appendChild(tabmass);
        //tablist.appendChild(tabdrag);
        $("div[class=medium_head]:eq(1)").append(tablist);
        var filterdiv = document.createElement('div');
        filterdiv.setAttribute('class', 'content_container');
        filterdiv.setAttribute('id', 'DDCFiltDiv');
        $("div[class=medium_head]:eq(1)").append(filterdiv);
        var sortdiv = document.createElement('div');
        sortdiv.setAttribute('class', 'content_container');
        sortdiv.setAttribute('id', 'DDCSortDiv');
        $("div[class=medium_head]:eq(1)").append(sortdiv);
        var showdiv = document.createElement('div');
        showdiv.setAttribute('class', 'content_container');
        showdiv.setAttribute('id', 'DDCShowDiv');
        $("div[class=medium_head]:eq(1)").append(showdiv);
        var massdiv = document.createElement('div');
        massdiv.setAttribute('class', 'content_container');
        massdiv.setAttribute('id', 'DDCMassDiv');
        $("div[class=medium_head]:eq(1)").append(massdiv);
        //var dragdiv = document.createElement('div');
        //dragdiv.setAttribute('class', 'content_container');
        //dragdiv.setAttribute('id', 'DDCDragDiv');
        //$("div[class=medium_head]:eq(1)").append(dragdiv);

        var rbtn = document.createElement('input');
        rbtn.id = "testid";
        rbtn.type = "button";
        rbtn.value = 'Rename Outputs to match play and package names';
        rbtn.addEventListener("click", renameOutputsForSpecificPlays, true);
        var elmts = document.getElementsByClassName('medium_head');
        elmts[1].appendChild(rbtn);


        buildshowdiv();
        buildsortdiv();
        buildfiltdiv();
        buildmassdiv();
        //builddragdiv();
    }


    function renameOutputsForSpecificPlays() {
        //gets all the anchor elements for specific play names
        var iterator = document.evaluate("//span[contains(@id,'specific_play_name')]/a", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
        try {
          var thisNode = iterator.iterateNext();
          var count=0;
          while (thisNode) {
              count++;
              var tmp = 'output_name_';
              tmp += thisNode.parentNode.id.split('_')[4];
              var outputNameElement = document.getElementById(tmp);
              outputNameElement.value = thisNode.innerHTML;

              thisNode = iterator.iterateNext();
          }	
          alert('Renamed '+count+' outputs to match specific plays.'+((count>0)?'\n\nBe sure to save the AI to keep these names.':''));
          renameOutputsForSpecificPackages();
        }
        catch (e) {
          dump( 'Error: Document tree modified during iteration ' + e );
        }
    }
    function renameOutputsForSpecificPackages() {
        //gets all the anchor elements for specific packages
        var iterator = document.evaluate("//span[contains(@id,'package_name')]", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
        try {
          var thisNode = iterator.iterateNext();
          var count=0;
          while (thisNode) {
              if (thisNode.innerHTML!='none') {
                  count++;
                  var tmp = 'output_name_';

                  tmp += thisNode.id.split('_')[3];
                  var outputNameElement = document.getElementById(tmp);
                  outputNameElement.value = thisNode.innerHTML;

              }
              thisNode = iterator.iterateNext();
          }	
          alert('Renamed '+count+' outputs to match packages.'+((count>0)?'\n\nBe sure to save the AI to keep these names.':''));
        }
        catch (e) {
          dump( 'Error: Document tree modified during iteration ' + e );
        }
    }


    //function for filtering
    function doFilt(){
        var filtsettings = new Array;
        var arrlength =0;
        // set all divs to show
        $('div[id*="input_"]').each(function(o){
            var divid = $(this).attr('id');
            divid = divid.substring(divid.indexOf('input_')+6, divid.length);
            if (isNaN(divid)==false) {
                $(this).show();
            };
        }
        ); 
        //  get what filter requests are set
        $('input, select','#DDCFiltDiv').each(function(i){
            var valueitem = $(this).attr('value');
            if (valueitem.length >0) {
                filtsettings[arrlength] = new Array;
                filtsettings[arrlength][0] = $(this).attr('id');
                filtsettings[arrlength][1] = $(this).attr('value');
                arrlength++;
            }
        });
        
        //  do filter
        for (var z=0;z<filtsettings.length;z++) {
            switch(filtsettings[z][0]) {
                case 'filttimetxt':
                    $('input[id*=time_remaining_]').each(function(t){
                        var inputval = $(this).attr('value');
                        if (inputval.length > 0 && inputval > filtsettings[z][1]) {
                            $(this).parent().parent().parent().parent().hide();
                        }
                    });
                    break;
                case 'filtballspot':

                    $('select[name*="i_spot_min_"]').each(function(t){
                        var inputminval = $(this).attr('value');
                        var inputmaxval = $('select[name*="i_spot_max_"]').eq(t).attr('value');
                        if (inputminval.length > 0 && inputmaxval.length > 0 && ((parseInt(filtsettings[z][1]) < parseInt(inputminval)) || (parseInt(filtsettings[z][1]) > parseInt(inputmaxval)))) {
                            $(this).parent().parent().parent().parent().hide();
                        };
                    });
                    break;
                case 'filtdown':
                    $('input[name*="i_min_down_"]').each(function(t){
                        var inputminval = $(this).attr('value');
                        var inputmaxval = $('input[name*="i_max_down_"]').eq(t).attr('value');
                        if (inputminval.length > 0 && inputmaxval.length > 0 && ((parseInt(filtsettings[z][1]) < parseInt(inputminval)) || (parseInt(filtsettings[z][1]) > parseInt(inputmaxval)))) {
                            $(this).parent().parent().parent().parent().hide();
                        };
                    });
                    break;
                case 'filtydstofirst':
                    $('input[name*="i_min_yards_to_go_"]').each(function(t){
                        var inputminval = $(this).attr('value');
                        var inputmaxval = $('input[name*="i_max_yards_to_go_"]').eq(t).attr('value');
                        if (inputminval.length > 0 && inputmaxval.length > 0 && ((parseInt(filtsettings[z][1]) < parseInt(inputminval)) || (parseInt(filtsettings[z][1]) > parseInt(inputmaxval)))) {
                            $(this).parent().parent().parent().parent().hide();
                        };
                    });
                    break;
                case 'filtmytoleft':
                    $('select[name*="i_my_timeouts_"]').each(function(t){
                        var inputval = $(this).attr('value');
                        if (inputval.length > 0 && filtsettings[z][1] != inputval){
                            $(this).parent().parent().parent().parent().hide();
                        };
                    });
                    break;
                case 'filtopptoleft':
                    $('select[name*="i_opponent_timeouts_"]').each(function(t){
                        var inputval = $(this).attr('value');
                        if (inputval.length > 0 && filtsettings[z][1] != inputval){
                            $(this).parent().parent().parent().parent().hide();
                        };
                    });
                    break;
                case 'filtclockrun':
                    $('select[name*="i_opponent_timeouts_"]').each(function(t){
                        var inputval = $(this).attr('value');
                        if (inputval.length > 0 && filtsettings[z][1] != inputval){
                            $(this).parent().parent().parent().parent().hide();
                        };
                    });
                    break;
                case 'filtscorediff':
                    $('input[name*="i_score_difference_min_"]').each(function(t){
                        var inputminval = $(this).attr('value');
                        var inputmaxval = $('input[name*="i_score_difference_max_"]').eq(t).attr('value');
                        if (inputminval.length > 0 && inputmaxval.length > 0 && ((parseInt(filtsettings[z][1]) < parseInt(inputminval)) || (parseInt(filtsettings[z][1]) > parseInt(inputmaxval)))) {
                            $(this).parent().parent().parent().parent().hide();
                        };
                    });
                    break;
                case 'filtspec':
                    if (iso==1) {
                        $('select[name*="i_special_"]').each(function(t){
                            var inputval = $(this).attr('value');
                            if (filtsettings[z][1] != inputval){
                                $(this).parent().parent().parent().parent().hide();
                            };
                        });
                    }else{
                        $('select[id*="opponent_formation_"]').each(function(t){
                            var inputval = $(this).attr('value');
                            if (filtsettings[z][1] != inputval){
                                $(this).parent().parent().parent().parent().hide();
                            };
                        });
                    }
                    break;
                case 'filtautoadj':
                    $('select[name*="i_auto_adjust_"]').each(function(t){
                        var inputval = $(this).attr('value');
                        if (filtsettings[z][1] != inputval){
                            $(this).parent().parent().parent().parent().hide();
                        };
                    });
                    break;
                case 'filtplays':
                    if (iso==1) {
                        $('div.outputs[id*="outputs_"]').each(function(q){
                            var outputspack = new Array;
                            var outputsplay = new Array;
                            var outputstype = new Array;
                            $('input[name*="o_package_id_"]', $(this)).each(function(s){
                                outputspack.push($(this).attr('value'));
                            });
                            $('input[name*="o_specific_play_"]', $(this)).each(function(s){
                                outputsplay.push($(this).attr('value'));
                            });
                            $('select[name*="o_play_type_"]', $(this)).each(function(z){
                                outputstype.push($(this).attr('value'));
                            });
                            var foundmatch=0;
                            for (var i=0;i<outputspack.length;i++) {
                                if (((outputspack[i].length == 0) || (outputspack[i] == 0)) && ((outputsplay[i].length==0) || (outputsplay[i] == 0)) && outputstype[i].toUpperCase() == filtsettings[z][1].toUpperCase()) {
                                    foundmatch = 1;
                                }
                            }
                            if (foundmatch==0) {
                                $(this).parent().hide();
                            }
                        })
                    }else{
                        $('div.outputs[id*="outputs_"]').each(function(q){
                            var outputsspecific = new Array;
                            var outputscustom = new Array;
                            var outputsformation = new Array;
                            $('input[id*="specific_play_"]', $(this)).each(function(s){
                                outputsspecific.push($(this).attr('value'));
                            });
                            $('input[id*="custom_play_"]', $(this)).each(function(s){
                                outputscustom.push($(this).attr('value'));
                            });
                            $('select[name*="formation_"]', $(this)).each(function(z){
                                outputsformation.push($(this).attr('value'));
                            });
                            var foundmatch=0;
                            for (var i=0;i<outputsspecific.length;i++) {
                                if (((outputsspecific[i].length == 0) || (outputsspecific[i] == 0)) && ((outputscustom[i].length==0) || (outputscustom[i] == 0)) && outputsformation[i].toUpperCase() == filtsettings[z][1].toUpperCase()) {
                                    foundmatch = 1;
                                }
                            }
                            if (foundmatch==0) {
                                $(this).parent().hide();
                            }
                        })
                    }
                    break;
                case 'filtpackages':
                    if (iso==1) {
                        $('div.outputs[id*="outputs_"]').each(function(q){
                            var outputspack = new Array;
                            $('input[name*="o_package_id_"]', $(this)).each(function(s){
                                outputspack.push($(this).attr('value'));
                            });
                            var foundmatch=0;
                            for (var i=0;i<outputspack.length;i++) {
                                if (outputspack[i].length > 0 && outputspack[i] == filtsettings[z][1]) {
                                    foundmatch = 1;
                                }
                            }
                            if (foundmatch==0) {
                                $(this).parent().hide();
                            }
                        })
                    }else{
                        $('div.outputs[id*="outputs_"]').each(function(q){
                            var outputscustom = new Array;
                            var custset = 0;
                            $('input[id*="custom_play_"]', $(this)).each(function(s){
                                custset = $(this).attr('value');
                            });
                            $('input[id*="specific_play_"]', $(this)).each(function(s){
                                outputscustom.push($(this).attr('value'));
                            });
                            var foundmatch=0;
                            for (var i=0;i<outputscustom.length;i++) {
                                if (outputscustom[i].length > 0 && outputscustom[i].toUpperCase() == filtsettings[z][1].toUpperCase() && custset ==1) {
                                    foundmatch = 1;
                                }
                            }
                            if (foundmatch==0) {
                                $(this).parent().hide();
                            }
                        })
                    }
                    break;
                default:
                    break;
            }
        }
    }


    
    function value(a,b) {
        var sortsplit = sortitems.split(',');
        var ahold ='';
        var bhold ='';
        for (var loop =0;loop<sortsplit.length;loop++) {
            ahold += a[sortsplit[loop]];
            bhold += b[sortsplit[loop]];
        }
        a=ahold;
        b=bhold;
        return a == b ? 0 : (a < b ? -1 : 1)
    }


    //function for sorting
    function doSort(showalltab){
        if (showalltab==0) {
            var sortsettings = new Array;
            var arrlength =0;
            // set all divs to show
            $('div[id*="input_"]').each(function(o){
                var divid = $(this).attr('id');
                divid = divid.substring(divid.indexOf('input_')+6, divid.length);
                if (isNaN(divid)==false) {
                    $(this).show();
                };
            }
            ); 
            //  get what filter requests are set
            $('select','#DDCSortDiv').each(function(i){
                var valueitem = $(this).attr('value');
                if (valueitem.length >0) {
                    sortsettings[arrlength] = new Array;
                    sortsettings[arrlength][0] = $(this).attr('id');
                    sortsettings[arrlength][1] = $(this).attr('value');
                    arrlength++;
                }
            });
            if (sortsettings.length ==0) {
                // bubblesort
                var x, y
                    // The Bubble Sort method.
                var holder = new Array;
                for(x = 0; x < arrinputs.length; x++) {
                    for(y = 0; y < (arrinputs.length-1); y++) {
                        if(parseInt(arrinputs[y][6]) > parseInt(arrinputs[y+1][6])) {
                            holder = arrinputs[y+1];
                            arrinputs[y+1] = arrinputs[y];
                            arrinputs[y] = holder;
                        }
                    }
                }
                for(x = 0; x < arroutputs.length; x++) {
                    for(y = 0; y < (arroutputs.length-1); y++) {
                        if(parseInt(arroutputs[y][1]) > parseInt(arroutputs[y+1][1])) {
                            holder = arroutputs[y+1];
                            arroutputs[y+1] = arroutputs[y];
                            arroutputs[y] = holder;
                        }
                    }
                }
            }else{
                
                // order sort array
                sortitems ='1,0';
                sortsettings.sort(value)
                var sortinputs = new Array;
                var sortoutputs = new Array;
                
        
                sortitems ='';
                sortinputs.push('5');
                sortoutputs.push('0');
        
                for (var i=0;i<sortsettings.length;i++) {
        
                    switch(sortsettings[i][0]) {
                    case 'sortdown':
                        sortinputs.push('1');
                        break;
                    case 'sortytg':
                        sortinputs.push('2');
                        break;
                    case 'sortname':
                        sortinputs.push('3');
                        break;
                    case 'sortoutpctchance':
                        sortoutputs.push('2');
                        break;
                    case 'sortoutplaytype':
                        sortoutputs.push('5');
                        break;
                    case 'sortoutformation':
                        sortoutputs.push('4');
                        break;
                    case 'sortoutpackage':
                        sortoutputs.push('3');
                        break;
                    case 'sortoutname':
                        sortoutputs.push('7');
                        break;
                    case 'Base':
                        sortinputs.push('6');
                        break;
                    default:
                        break;
                    }
                }
        
                sortinputs.push('6');
                sortoutputs.push('1');
        
                sortitems = sortinputs.join(',');
                arrinputs.sort(value);
        
                sortitems = sortoutputs.join(',');
                arroutputs.sort(value);
            }
        }else{
            // bubblesort
            var x, y
                // The Bubble Sort method.
            var holder = new Array;
            for(x = 0; x < arrinputs.length; x++) {
                for(y = 0; y < (arrinputs.length-1); y++) {
                    if(parseInt(arrinputs[y][6]) > parseInt(arrinputs[y+1][6])) {
                        holder = arrinputs[y+1];
                        arrinputs[y+1] = arrinputs[y];
                        arrinputs[y] = holder;
                    }
                }
            }
            for(x = 0; x < arroutputs.length; x++) {
                for(y = 0; y < (arroutputs.length-1); y++) {
                    if(parseInt(arroutputs[y][1]) > parseInt(arroutputs[y+1][1])) {
                        holder = arroutputs[y+1];
                        arroutputs[y+1] = arroutputs[y];
                        arroutputs[y] = holder;
                    }
                }
            }

        }


        $('div[id*="quarter_"]').each(function(y){
            var curquarter = $(this).attr('id');
            curquarter = curquarter.substring(curquarter.length -1,curquarter.length);
            $(this).html('');
            var newhtml ='';
            var prioritycount = 0;
            for (var z=0;z<arrinputs.length;z++) {
                if (arrinputs[z][5] == curquarter) {
                    var showhead =1;
                    newhtml += '<div id="input_' + arrinputs[z][0] + '"><div class="content_container ai_input">';
                    newhtml += arrinputs[z][4] + '</div>';
                    for (var x=0;x<arroutputs.length;x++) {
                        if (arroutputs[x][0]==arrinputs[z][0]){
                            if (showhead==1) {
                                newhtml += '<div class="outputs"><b>+</b> <a href="javascript:;" onclick="addOutput(' + String.fromCharCode(39) + arroutputs[x][0] + String.fromCharCode(39) + ')">Add New Output</a></div><div class="outputs" id="outputs_'+arroutputs[x][0]+'">';
                                showhead=0;
                            }
                            newhtml+= '<div id="output_' + arroutputs[x][0] + '">';
                            newhtml+= arroutputs[x][6];
                            newhtml+= '</div>';
                        }
                    }
                    if(showhead==0) {
                        newhtml += '</div></div>';
                    }
                    arrinputs[z][7] = prioritycount;
                    prioritycount++;
                }

            }
            newhtml+='</div>';
            $(this).html(newhtml);
        });
    }

    var url = window.location.href;
    var teamid = url.substring(url.indexOf('team_id=')+8, url.length);
    if (teamid.indexOf('&')>-1) {
        teamid = teamid.substring(0,teamid.indexOf('&'));
    }

    var sortitems ='0';

    var showclipboard =0;

    var hideoutputs = 1;

    if (hideoutputs==1) {

        $('.outputs[id*="outputs_"]').hide();
    }

    $('a[onclick*="addOutput("]').each(function(zw){
        $(this).click(function(){
            var divid = $(this).parent().parent().attr('id');
            divid = divid.substring(divid.indexOf('input_')+6);
            $('#outputs_'+divid).show();
        });

    })

    $('.input_delete').each(function(i){
    
        var linkitem = document.createElement('a');
        linkitem.addEventListener('click', function(){$('.outputs',$(this).parent().parent().parent()).toggle('slow');}, false);
        linkitemtextnode = document.createTextNode('Show/Hide Outputs');
        linkitem.appendChild(linkitemtextnode);
        var spacernode = document.createTextNode(' | ');
        var spacernode2 = document.createTextNode(' | ');

        var htmlstring = $(this).html();
        $(this).append(spacernode);
        $(this).append(linkitem);
        var insertbefore = document.createElement('a');
        var inserttextnode = document.createTextNode('Input Before');
        insertbefore.appendChild(inserttextnode);
        insertbefore.addEventListener('click', function(){
            var quarter=$(this).parent().parent().parent().parent().attr('id');
            var thisinput=$(this).parent().parent().parent().attr('id');
            var idnum = thisinput.substring(thisinput.indexOf('_')+1);
            var thispriority = $('#priority_'+idnum).attr('value');
            var alertstr ='';
            $('div[id*="input_"]',$(this).parent().parent().parent().parent()).each(function(i){
                var divid = $(this).attr('id');
                divid = divid.substring(divid.indexOf('input_')+6, divid.length);
                if (isNaN(divid)==false) {
                    $('input[id="priority_'+divid+'"]', $(this)).each(function(uy){
                        var tempval = $(this).val();
                        if ((parseInt(thispriority)-1)<parseInt(tempval)) {
                            $(this).attr('value', parseInt(tempval)+1);
                        }
                    })


                };
            })
            quarter = parseInt(quarter.substring(quarter.indexOf('quarter_')+8));
            unsafeWindow.addInput(quarter);
            var newid = $('div[id*="input_"]:first',$('div[id="quarter_'+quarter+'"]')).attr('id');
            var newidnum = newid.substring(newid.indexOf('_')+1);
            var newhtml = $('#'+newid).html();
            var builddiv = document.createElement('div');
            builddiv.setAttribute('id',newid);
            $('#'+newid).remove();
            $('#'+thisinput).before(builddiv);
            $('#'+newid).html(newhtml);
            $('input[id="priority_'+newidnum+'"]').attr('value',thispriority);
            }, false);
        $(this).append(spacernode2);
        $(this).append(insertbefore);


    })

    

    if (showclipboard==1) {
        var el = {
            clipboardmarkup: "<fieldset id='clipboard' class='content_container' style='top: 0px; left: 0px; padding-left: 10px; text-align: left; position: absolute; z-index: 9999;'><legend id='clipboard_title' class='nonalternating_color' style='padding: 2px 10px; cursor: pointer;'><u>Clipboard</u></legend>Actions:<ul id='action_list' style='list-style-type: disc; cursor: pointer; margin-left: 15px;'><li style='list-style-type: disc;'><a id='copy_selected'>Copy</a></li><li style='list-style-type: disc;'><a id='paste_selected'>Paste</a></li></ul><style>a { cursor: pointer; } li { margin: 2px; } .list_selected { background-color: Orange; }</style><div id='clippy' style='padding-right: 5px; overflow: -moz-scrollbars-vertical;'>Input(s):<ul id='input_list' style='cursor: pointer; margin-left: 15px; list-style: none;'></ul>Output(s): <ul id='output_list' style=' cursor: pointer; margin-left: 15px; list-style: none;'></ul></div></fieldset>",
            totalcalc: "<span id='total' style='border: 1px solid black; margin-left: 10px; padding-left: 10px; background-color: #C0C0C0; font-weight: bold;'></span>",
            runcalc: "<span id='runtotal' style='border: 1px solid black; margin-left: 10px; padding-left: 10px; background-color: #9933CC; font-weight: bold;'></span>",
            passcalc: "<span id='passtotal' style='border: 1px solid black; margin-left: 10px; padding-left: 10px; background-color: #99FF99; font-weight: bold;'></span>",
            item: function() {
                return "<li><span id='delete_copy' style='margin-right: 3px;'>[x]</span>" + property.selected.name + "<span id='value' style='display: none;'>" + fn.stringify(property.selected) + "</span></li>";
            }
        };
        
        var property = {
            ai_type: "",
            selected: {
                object: {},
                type: "",
                name: "",
                custom: "",
                values: []
            },
            stored: {
                type: "",
                name: "",
                custom: "",
                values: []
            }
        };
        
        var fn = {
            stringify: function(s) {
                return s.type + "," + s.name + "," + s.custom + "," + s.values.join(",");
            },
            parse: function(str) {
                var input = str.split(",");
                property.stored.type = input[0];
                property.stored.name = input[1];
                property.stored.custom = input[2];
                for (i = 3; i <= input.length; i++) {
                    property.stored.values.push(input[i]);
                }
            },
            select: function() {
                fn.reset_selected();
                $(this).css('border', '1px dashed darkblue');
                
                // gather data
                property.selected.object = this;
                property.selected.type = $(this).is('.content_container.ai_input') ? 'input' : 'output';
                $(':input', property.selected.object).each( function() {
                    property.selected.values.push($(this).val());
                });
                property.selected.name = $('.input_name :input, .output_name :input', property.selected.object).val();
                property.selected.custom = $('span:eq(0)', property.selected.object).text();
    
                return fn;
            },
            pick: function() {
                fn.reset_stored();
                fn.parse($('#value', this).text());
                $(this).addClass('list_selected');
                return fn;
            },
            reset_stored: function() {
                $('#clippy li').removeClass('list_selected');
                property.stored.type = "";
                property.stored.name = "";
                property.stored.custom = "";
                property.stored.values = [];
                return fn;
            },
            reset_selected: function() {
                $(property.selected.object).css('border', '1px solid #A0A0A0');
                property.selected.object = null;
                property.selected.type = "";
                property.selected.name = "";
                property.selected.values = [];
                property.selected.custom = "";
                return fn;
            },
            copy: function() {
                fn.reset_stored();
                var container = $('#' + property.selected.type + '_list');
                container.append(el.item());
                
                var newitem = $('li:last', container);
                fn.parse($('#value', newitem).text());
                newitem.addClass('list_selected');
                
                return fn.save();
            },
            paste: function() {
                if ($(this).is('.content_container.ai_input') && property.stored.type == 'output') return fn;
                $('.input_name :input, .output_name :input', property.selected.object).val(property.stored.name);
                $('span:eq(0)', property.selected.object).text(property.stored.custom);
                $(':input', property.selected.object).each( function(i) {
                    $(this).val(property.stored.values[i]);
                });
                return fn;
            },
            copyallinput: function() { return fn; },
            copyalloutput: function() { return fn; },
            save: function() {
                GM_setValue(property.ai_type, $('#clippy').html());
                return fn;
            },
            remove: function() {
                $(this).parent().remove();
                fn.reset_stored().save();
            },
            insert: function() {
                // override internal script that inserts new input/output
                return fn;
            },
            scroll: function() {
                $('#clipboard').css('top', $(this).scrollTop());
            },
            change: function() {
                fn.calculate($(this).parents('.outputs'));
            },
            calculate: function(ctr) {
                var total = 0; var run = 0; var pass = 0;
                
                $('.content_container', ctr).each( function() {
                    var t = parseInt($('.output_bias :input', this).val());
                    total += isNaN(t) ? 0 : t;
                    $('.output_option:contains("Play Type")', this).each( function() {
                        var sel = $(':input', this).val();
                        if (sel.match('Run'))
                            run += isNaN(t) ? 0 : t;
                        else if (sel.match('Pass'))
                            pass += isNaN(t) ? 0 : t;
                    });
                });
                
                $('#total', ctr.prev()).html(total + "%");
                $('#passtotal', ctr.prev()).html(pass + "%");
                $('#runtotal', ctr.prev()).html(run + "%");
            },
            setup: function() {
                if (window.location.href.indexOf('offense') > -1)
                    property.ai_type = 'offense';
                else
                    property.ai_type = 'defense';
                
                // element appending
                $('body').append(el.clipboardmarkup);
                $('#clippy').css('max-height', $(window).height() - 20 + 'px');
                var saved = GM_getValue(property.ai_type);
                if (saved) {
                    $('#clippy').html(saved)
                    $('li').removeClass('list_selected');
                }
                
                if (property.ai_type == "offense")
                    $('.outputs:contains("+")').append(el.passcalc).append(el.runcalc);
                $('.outputs:contains("+")').append(el.totalcalc);
                
                
                // event binding
                $(window).bind('scroll', fn.scroll);
                $('#clipboard').draggable({ handle: 'legend' });
                
                $('.content_container.ai_input, .content_container.ai_output').live('click', fn.select);
                $('#copy_all_input').bind('click', fn.copyallinput);
                $('#copy_all_output').bind('click', fn.copyalloutput);
                $('#copy_selected').bind('click', fn.copy);
                $('#paste_selected').bind('click', fn.paste);
                $('#clippy li').live('click', fn.pick);
                $('#delete_copy').live('click', fn.remove);
                
                $('.output_bias :input').bind('change', fn.change);
                
                $('.outputs:odd').each( function() {
                    fn.calculate($(this));
                });
            }
        };
        
        fn.setup();
    }

    var iso = 0;
    if (window.location.href.indexOf('team_offense_ai') > -1) {
        iso = 1;
    }

    $('div[class="description_text"]:first').hide();


    //build array for all items in outputs and inputs

    var playlistid = new Array;
    var playlistname = new Array;
    var arrinputs = new Array;
    var arroutputs = new Array;


    if (iso==1) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://goallineblitz.com/game/team_package.pl?team_id=' + teamid,
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'Accept': 'application/atom+xml,application/xml,text/xml',
            },
            onload: function(packtext) {
                 var htmlstring = packtext.responseText;
                 var playsplits = htmlstring.split('<tr class="alternating_color');
                 for (var z=1;z<playsplits.length;z++) {
                     if (playsplits[z].indexOf('edit=')>-1) {
                         playlistid.push(playsplits[z].substring(playsplits[z].indexOf('edit=')+5,playsplits[z].indexOf('"',playsplits[z].indexOf('edit=')+5)));
                         var playnamestart = playsplits[z].indexOf('">',playsplits[z].indexOf('<a')) + 2;
                         playlistname.push(playsplits[z].substring(playnamestart, playsplits[z].indexOf('</a>',playnamestart)));
                     }
                 }
        
                 buildelements();
    
        
            }
         });
    }else{
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://goallineblitz.com/game/team_create_defense.pl?team_id=' + teamid,
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'Accept': 'application/atom+xml,application/xml,text/xml',
            },
            onload: function(packtext) {
                 var htmlstring = packtext.responseText;
                 var playsplits = htmlstring.split('<tr class="alternating_color');
                 for (var z=1;z<playsplits.length;z++) {
                     if (playsplits[z].indexOf('play_id=')>-1) {
                         playlistid.push(playsplits[z].substring(playsplits[z].indexOf('play_id=')+8,playsplits[z].indexOf('"',playsplits[z].indexOf('play_id=')+8)));
                         var playnamestart = playsplits[z].indexOf('">',playsplits[z].indexOf('<a')) + 2;
                         playlistname.push(playsplits[z].substring(playnamestart, playsplits[z].indexOf('</a>',playnamestart)));
                     }
                 }
        
                 buildelements();
    
        
            }
         });
    }
});



