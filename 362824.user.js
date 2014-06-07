// ==UserScript==
// @name          Deeproute.com Game Log to CSV
// @description   Converts the game log to a csv file so you can analyze your playcalling with a spreadsheet.
// @namespace     http://deeproute.com
// @include       http://deeproute.com/deeproute/*js=loggerinc*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version       2014.02.08.1
// ==/UserScript==

$(document).ready(function(){
  //create a link
  $link = $('<input id="csv_download" type="button" style="font-size: 10pt; font-weight: bold; height: 30px;" value="Download CSV of Game Log"</input><br />');  
  $link.insertBefore('a:contains("Click here to show the score to this game")');

  //attach event handlers
  $('#csv_download').click(downloadCSV);
});

function downloadCSV(){
  alert('Creating CSV....this may take a minute.\nBe sure to change the file name to something like log.csv');

  csv = 'quarter,time,down,distance,yard line,off team,off package,off formation,off play,def team,def package,def cover type,def cover depth,def roamer job,def blitzer,play type,total yards,runner,hole,pass result,first read,first target,final target,pass type,target distance,yards after catch';

  $start = $('td[colspan="100%"]:eq(0)').parent();
  $stop_list = $('td[bgcolor="#000000"]').parent();

  //get list of teams playing
  teams = [];
  start = 0;
  game_text = $start.parent().text();
  while(teams.length < 2){  
    start += game_text.substr(start).search(/[A-Z]+\s\-\s/);
    len = game_text.substr(start).indexOf(' -');
    curr_team = game_text.substr(start,len);
    if(teams.length == 0){
      teams[0] = curr_team;
    }else if(teams[0] != curr_team){
        teams[1] = curr_team;
    }
    start += len;
  }

  //loop through each section
  for(i=0;i<$stop_list.length;i++){
    
    //get list of elements to read
    $rows = $start.nextUntil($stop_list.eq(i));
    
    //check for valid play
    if($rows.find('td:contains("The ball is snapped to")').length == 1){
      
      //get scenario
      snap = $rows.find('td:contains("The ball is snapped to")').text().split(' - ');
      off_team = snap[0].trim();
      if(off_team == teams[0]){
        def_team = teams[1];
      }else{
        def_team = teams[0];
      }
      qtr = snap[1].split(' ')[0].split('Q')[1].trim();
      time = snap[1].split(' ')[1].trim();
      down = snap[1].split('(')[1].split('and')[0].trim();
      dist = snap[1].split('(')[1].split(';')[0].split('and')[1].trim();    
      yard_line = snap[1].split(';')[1].split(')')[0].trim();
      // score = ??????       
      
      //get playcalls
      plays = $rows.find('td:contains("Offensive Package Was :")').text().split('Offensive Package Was :')[1];
      
      //offensive playcall
      off = plays.split('Defensive Package Was :')[0].split(':');
      off_pkg = off[0].split(',')[0].trim();
      off_formation = off[1].split(',')[0].trim();
      off_play = off[2].trim();
      
      //defensive playcall
      def = plays.split('Defensive Package Was :')[1];
      def_pkg = def.split('Coverage :')[0].trim();
      def_coverage = def.split('Coverage :')[1].split('Blitzing :')[0].trim().split(';');
      cvr_type = def_coverage[0].trim();
      if(def_coverage.length == 2){
        roamer_job = 'none';
        cvr_depth = def_coverage[1].trim();
      }else{
        roamer_job = (def_coverage[1].indexOf('Roamer Job') > -1 ? def_coverage[1].split('-')[1].trim() : def_coverage[1].trim());
        cvr_depth = def_coverage[2].trim();
      }
      // break down coverage ??
      def_blitz = (def.split('Blitzing :')[1] ? def.split('Blitzing :')[1].trim() : 'none');
      
      //check for run vs pass
      if($rows.find('td:contains("Handoff")').length > 0 || $rows.find('td:contains("keeps it")').length > 0){
        play_type = 'run';
        
        //runner
        if($rows.find('td:contains("keeps it")').length > 0){
          runner = 'QB';
        }else{
          runner = $rows.find('td:contains("Handoff")').text().split('Handoff to ')[1].split(' ')[0].trim();
        }
        
        //hole
        if(off_play.indexOf('R1') > -1){
          hole = 'R1';
        }else if(off_play.indexOf('R2') > -1){
          hole = 'R2';
        }else if(off_play.indexOf('R3') > -1){
          hole = 'R3';
        }else if(off_play.indexOf('L1') > -1){
          hole = 'L1';
        }else if(off_play.indexOf('L2') > -1){
          hole = 'L2';
        }else if(off_play.indexOf('L3') > -1){
          hole = 'L3';
        }else if(off_play.toLowerCase().indexOf('sweep') > -1){
          hole = 'sweep';
        }else if(off_play.toLowerCase().indexOf('sneak') > -1){
          hole = 'sneak';
        }else{
          hole = 'inside';
        }      
        
        //yards total
        total_yards = getYards($rows.find('td:contains("ard(s)"):eq(0)').text().match(/(-?\d+\s\d+ Yard)/i)[0].split(' Yard')[0]);
        
        //filler variables
        pass_result = '';
        first_read = '';
        first_target = '';
        final_target = '';
        pass_type = '';
        pass_yards = '';
        yac = '';
        
      }else{
        play_type = 'pass';
        
        //pass result
        if($rows.find('td:contains("scrambles")').length > 0){
          pass_result = 'scramble';
        }else if($rows.find('td:contains("SACKED")').length > 0){
          pass_result = 'sack';
        }else if($rows.find('td:contains("DROPPED")').length > 0){
          pass_result = 'drop';
        }else if($rows.find('td:contains("pass defended")').length > 0){
          pass_result = 'pass defended';
        }else if($rows.find('td:contains("batted down")').length > 0){
          pass_result = 'batted pass';
        }else if($rows.find('td:contains("INTERCEPTED")').length > 0){
          pass_result = 'intercepted';
        }else if($rows.find('td:contains("INCOMPLETE")').length > 0){
          pass_result = 'miss';
        }else if($rows.find('td:contains("Touchdown")').length > 0){
          pass_result = 'touchdown';
        }else if($rows.find('td:contains("threw the ball away")').length > 0){
          pass_result = 'throw away';
        }else if($rows.find('td:contains("dump it off")').length > 0){
          pass_result = 'dump off';
        }else if($rows.find('td:contains("COMPLETE")').length > 0){
          pass_result = 'catch';
        }else{
          pass_result = 'undefined';
        }
          
        //1st read status
        if($rows.find('td:contains("decided against throwing")').length > 0){
          first_read = 'covered';
        }else{
          first_read = 'open';
        }
        
        //targets
        if($rows.find('td:contains("primary option was")').length > 0){
          first_target = $rows.find('td:contains("primary option was")').text().split('primary option was ')[1].split(' ')[0].trim();
          td = $rows.find('td:contains("Pass by")');
          if(td.length > 0){          
            if(td.text().indexOf('DROPPED') > -1){
              final_target = td.text().split('DROPPED by ')[1].split(' ')[0].trim();
            }else{
              final_target = td.text().split('to ')[1].split(' ')[0].trim();
            }         
          }else{
            final_target = 'none';
          }        
        }else{
          td = $rows.find('td:contains("Pass by")');
          if(td.length > 0){          
            if(pass_result == 'drop'){
              first_target = td.text().split('DROPPED by ')[1].split(' ')[0].trim();
            }else{
              first_target = td.text().split('to ')[1].split(' ')[0].trim();
            }          
            final_target = first_target;
          }else{
            first_read = 'none'; //modifies previous variable for special case
            first_target = 'none';
            final_target = 'none';
          }
        }
        
        //yardage
        pass_type = 'none';           
        td = $rows.find('td:contains("ard(s)")');
        if(td.length == 0){
          td = $rows.find('td:contains("SACKED")'); //special case for a sack
        }
        if(td.length > 0){                
          //was there a pass
          if(final_target != 'none'){  
            pass_yards = getYards(td.text().match(/(-?\d+\s\d+ Yard)/i)[0].split(' yard')[0]);          
            
            //denote pass type for easier filtering
            if(pass_yards <= 5){
              pass_type = 'short - 5 yards or less';
            }else if(pass_yards <= 10){
              pass_type = 'medium - 5 to 10 yards';  
            }else if(pass_yards <= 15){
              pass_type = 'long - 10 to 15 yards';
            }else{
              pass_type = 'deep - more than 15 yards';
            }
            
            //was it complete
            if(pass_result == 'catch' || pass_result == 'touchdown' || pass_result == 'dump off'){
              total_yards = getYards(td.text().split('COMPLETE')[1].match(/(-?\d+\s\d+ Yard)/i)[0].split(' Yard')[0]);
              yac = (total_yards-pass_yards).toFixed(2);
            }else{
              total_yards = 0;
              yac = 0;
            }        
          }else{
            pass_yards = 0;
            yac = 0;
            total_yards = getYards(td.text().match(/(-?\d+\s\d+ yard)/i)[0].split('ard')[0]);                          
          }
        }else{
          pass_yards = 0;
          total_yards = 0;
          yac = 0;
        }
        
        //filler variables
        runner = '';
        hole = '';

      }
      
      csv += '\n' + [qtr,time,down,dist,yard_line,off_team,off_pkg,off_formation,off_play,def_team,def_pkg,cvr_type,cvr_depth,roamer_job,def_blitz,play_type,total_yards,runner,hole,pass_result,first_read,first_target,final_target,pass_type,pass_yards,yac].join(',');
          
    }  
    
    //update start point
    $start = $stop_list.eq(i);
  }

  var uriContent = "data:application/octet-stream," + encodeURIComponent(csv);
  var myWindow = window.open(uriContent, "game_log.csv");
  myWindow.focus();
}

function getYards(yd_str){
  if(yd_str.indexOf('-') > -1){
    c = -1;
  }else{
    c = 1;
  }
  a = parseFloat(yd_str.match(/\d+/));
  b = parseFloat(yd_str.match(/\s\d+/));
  return (c*(a+b/100)).toFixed(2);
}
