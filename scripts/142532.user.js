// ==UserScript==
// @name          Deeproute.com Depth Chart Helper
// @description   Re-Orders your depth chart based on current overall.
// @namespace     http://deeproute.com
// @include       http://deeproute.com/deeproute/*js=myteam*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant         none
// @version       2012.9.14
// @updateURL     https://userscripts.org/scripts/source/142532.meta.js
// @downloadURL   https://userscripts.org/scripts/source/142532.user.js
// ==/UserScript==

/*
==Changelog==
2012.9.14
-fixed a bug where 

2012.9.10
- modified the way strings are trimmed to provide better compatibility for IE 
- changed titles on buttons to hopefully help clear up what they do

2012.8.30.3
- modified the way health is handled

2012.8.30.2
-fixed a bug where LOLB and ROLB positions weren't set
-added undo button 

2012.8.30.1
-fixed bug causing players to be saved incorrectly 
-seperated the process of updating the roster and saving the roster

2012.8.30
-initial version
*/

var previous_lineup = [];

var getPositionList = function(position){
          position_list = [];
          if($.inArray(position,['QB']) > -1){
            position_list = ['QB'];
          }else if($.inArray(position,['HB']) > -1){
            position_list = ['RB'];
          }else if($.inArray(position,['FB']) > -1){
            position_list = ['FB','TE'];
          }else if($.inArray(position,['TE1','TE2']) > -1){
            position_list = ['TE','FB'];
          }else if($.inArray(position,['WR1','WR2','WR3','WR4','WR5']) > -1){
            position_list = ['WR'];
          }else if($.inArray(position,['LT','RT']) > -1){
            position_list = ['T','G','C'];
          }else if($.inArray(position,['LG','RG']) > -1){
            position_list = ['G','T','C'];
          }else if($.inArray(position,['C','LS']) > -1){
            position_list = ['C','G','T'];
          }else if($.inArray(position,['LDE','RDE']) > -1){
            position_list = ['DE','DT','LB'];
          }else if($.inArray(position,['LDT','RDT','NT','LIDT','RIDT']) > -1){
            position_list = ['DT','DE','LB'];
          }else if($.inArray(position,['WLB','MLB','SLB','WILB','SILB','WOLB','SOLB','XLB','ROLB','LOLB']) > -1){
            position_list = ['LB','DE','S'];
          }else if($.inArray(position,['C1','C2','N1','N2','N3','N4']) > -1){
            position_list = ['CB','S'];
          }else if($.inArray(position,['FS','SS']) > -1){
            position_list = ['S','CB','LB'];
          }else if($.inArray(position,['K']) > -1){
            position_list = ['K','P'];
          }else if($.inArray(position,['P']) > -1){
            position_list = ['P','K'];
          }else if($.inArray(position,['PR','KR1','KR2']) > -1){
            position_list = ['WR','RB','CB'];
          }else if($.inArray(position,['HND1','HND2','HND3','HND4','HND5','HND6','HND7','HND8','HND9','HNDA']) > -1){
            position_list = ['WR','TE','RB','CB','S','LB'];
          }else if($.inArray(position,['LOUP','LIUP','RIUP','ROUP']) > -1){
            position_list = ['FB','TE','RB','LB'];
          }else if($.inArray(position,['LOJM','LIJM','RIJM','ROJM']) > -1){
            position_list = ['CB','S','WR','RB','LB','TE'];
          }else if($.inArray(position,['LGNR','RGNR','GNR1','GNR2','GNR3','GNR4','GNR5','GNR6','GNR7','GNR8','GNR9','GNRA']) > -1){
            position_list = ['S','LB','CB','FB','WR','RB','TE'];
          }else if($.inArray(position,['HLD']) > -1){
            position_list = ['QB','P'];
          }else if($.inArray(position,['LWB','RWB']) > -1){
            position_list = ['FB','RB','TE','LB'];
          }else if($.inArray(position,['LTE','RTE']) > -1){
            position_list = ['TE','FB','DE','LB'];
          }
                    
          return position_list;
}

var getCandidates = function(players,position,starters){
  var candidates = [];
  for(var i=0; i<players.length; i++){
    if(players[i].position == position && $.inArray(players[i].id,starters) == -1){
      candidates.push([players[i].overall,players[i].id]);
    }
  }
  return candidates;
}

function message(msg) {
  $("#message").hide().text(msg).slideDown('fast').delay(4000).slideUp();
}

var reOrderRoster = function(){  
  if(confirm('Allow the CPU to automatically re-order your roster?')){
    //save the data and enable to undo button
    saveData();
    $('input[name="undo_button"]').prop('disabled', false);
    
    //disable button and show message
    $('[name="reorder_button"]').prop('disabled', true);
   
    //get a list of players
    var id = $('[name="pid"]').val().split('!');
    var pos = $('[name="ppos"]').val().split('!');
    var health = $('[name="phealth"]').val().split('!');
    var players = [];
    for(var i=0;i<id.length;i++){
      var p = new Object();
      if(id[i] != ''){
        p.id = parseInt(id[i]);
        p.position = pos[i];
        p.overall = parseInt($('[name="patt' + p.id + '"]').val().substr((94-1)*4,2))*parseInt(health[i]);
        players.push(p);
      }
    }
    
    //get list of package numbers
    var package = $('[name="allpackk"]').val().split('!'); 
    
    //go through each package
    for(var i=0;i<package.length;i++){      
      if(package[i] != ''){        
        var starters = [];
        var backups = [];
        
        //go through each position and find the starter         
        var positions = $('[name="PLAYERS' + package[i] + '"]').val().split('^');
        for(var j=0;j<positions.length;j++){
          if(positions[j] == ''){
            continue;
          }         
          
          var position_list = getPositionList($.trim(positions[j]));
          var id = 0;
          for(var k=0;k<position_list.length;k++){
            var candidates = getCandidates(players,position_list[k],starters);
            if(candidates.length > 0){
              candidates.sort();
              tmp = candidates.pop();
              id = tmp[1];
              break;
            }
          }
          starters.push(id);                    
        }
        
        //go through each position and find the backup
        for(var j=0;j<positions.length;j++){          
          if(positions[j] == ''){
            continue;
          }
          
          //find the backup
          var position_list = getPositionList($.trim(positions[j]));
          var id = 0;
          for(var k=0;k<position_list.length;k++){
            var candidates = getCandidates(players,position_list[k],starters);
            if(candidates.length > 0){
              candidates.sort();
              tmp = candidates.pop();
              id = tmp[1];
              break;
            }
          }
          backups.push(id); 
        }
        
        //write package to page
        var PLAYERPACK = '';
        for(var j=0; j<starters.length; j++){
          var txt = '!' + starters[j] + '         ';
          PLAYERPACK += txt.substring(0,9);
        }
        for(var j=0; j<backups.length; j++){
          var txt = '!' + backups[j] + '         ';
          
          PLAYERPACK += txt.substring(0,9);
        }
        $('[name="PLAYERPACK' + package[i] + '"]').val(PLAYERPACK);
      }
    }
    
    //Let user know to save page    
    message('Lineups are updated. To keep them, please click the "Save" button');
    $('[name="reorder_button"]').prop('disabled', false);
    $('[name="packagesel"]').change();
  }
}

var saveData = function(){
  //clear previous data
  previous_data = [];
  
  //get list of package numbers
  var package = $('[name="allpackk"]').val().split('!');
  
  //go through each package and save the data
  for(var i=0;i<package.length;i++){      
    if(package[i] == ''){  
      continue;
    }
    var name = 'PLAYERPACK' + package[i];
    var val = $('[name="' + name + '"]').val();
    previous_lineup.push([name,val]);
  }
}

var loadData = function(){
  for(var i=0;i<previous_lineup.length;i++){
    $('[name="' + previous_lineup[i][0] + '"]').val(previous_lineup[i][1]);
  }  
  $('[name="packagesel"]').change();
}

var submitData = function(){
  $('[name="save_button"]').prop('disabled', false);
  message('Your lineups are saving...this could take a minute.  Please wait!');
  document.forms["packages"].submit();
}

$(document).ready(function(){
  //create message bar
  var $message_bar = $('<div id="message" style="display:none;text-align:center;background-color:#99ee99;position:fixed;right:0;left:0;z-index:1030;font-size:1.2em;padding-top:1.2em;padding-botton:1.2em;"></div>');
  $message_bar.insertBefore('#home');
  
  //create an interface
  var $button = $('<input type="button" name="reorder_button" value="Auto Re-Order">');
  $button.insertBefore('input[name="spb"]');  
  var $undo = $('<input type="button" name="undo_button" value="Undo Re-Order">');
  $undo.insertBefore('input[name="spb"]');
  var $save = $('<input type="button" name="save_button" value="Save">');
  $save.insertBefore('input[name="spb"]');  
  $('input[name="spb"]').remove();

  //attach event handlers
  $('input[name="reorder_button"]').click(reOrderRoster);
  $('input[name="save_button"]').click(submitData);
  $('input[name="undo_button"]').click(loadData).prop('disabled', true);;
});
