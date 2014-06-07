// ==UserScript==
// @name          Deeproute.com Free Agent Filter
// @description   Allows you to filter free agents base on multiple attributes.
// @namespace     http://deeproute.com
// @include       http://deeproute.com/deeproute/*js=freeagents*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version       2012.7.18
// @updateURL     https://userscripts.org/scripts/source/138306.meta.js
// @downloadURL   https://userscripts.org/scripts/source/138306.user.js
// ==/UserScript==

/*
==Changelog==
2012.7.18
-added "salary cap hit" and "bonus" filters for 1 year contracts

2012.7.17
-created one filter on startup (previously none were created)  

2012.7.14
-fixed bug that cause problems in greasemonkey version
-added experience, height, and weight filters

2012.7.13
-initial version
*/

var fullroster;

var addFilter = function(){    
  //get attribute list
  attribute_list = document.forms['packages'].elements['attributes'].value.split('^');
  attribute_list[2] = '!100!1yr Cap Hit ($K)'; //replace birthday with salary
  attribute_list.splice(2,0,'!101!1yr Bonus ($K)'); //insert an additional filter for bonuses

  //create an option list
  $select = $('<select></select>');
  for(i=0;i<attribute_list.length;i++){
    v = attribute_list[i];
    $select.append(
      $('<option></option>').val(parseInt(v.split('!')[1])).html(v.split('!')[2])
    );
  }

  $tr = $('<tr class="filter_row"></tr>');
  $tr.append(
    $('<td></td>').append($select)
  );

  $tr.append(
    $('<td><input type="text" maxlength="2" style="width:auto; height:98%" value="0"/></td>')
  );

  $tr.append(
    $('<td><input type="text" maxlength="2" style="width:auto; height:98%" value="99"/></td>')
  );

  $tr.append(
    $('<td><input type="text" maxlength="2" style="width:auto; height:98%" value="0"/></td>')
  );

  $tr.append(
    $('<td><input type="text" maxlength="2" style="width:auto; height:98%" value="99"/></td>')
  );

  $tr.append(
    $('<td><button type="button" class="removeFilter">Remove Filter</button></td>')
  );

  $tr.insertBefore('#filter_buttons');
  
  //fix even handlers
  $('.removeFilter').on('click',function(){
    removeFilter(this);
  });
  $('.filter_row select').on('change',function(){
    $('td:gt(2) input',this.parentNode.parentNode).show();
    $('td:lt(3) input',this.parentNode.parentNode).attr('maxlength','2');
    $('td:eq(2) input',this.parentNode.parentNode).val(99);    
    v = $(this).val();
    
    if(v == 97 || v == 98 || v == 99){
      $('td:gt(2) input',this.parentNode.parentNode).hide();
      $('td:lt(3) input',this.parentNode.parentNode).attr('maxlength','3');
      $('td:eq(2) input',this.parentNode.parentNode).val(999);
    }else if(v == 100 || v == 101){
      $('td:gt(2) input',this.parentNode.parentNode).hide();
      $('td:lt(3) input',this.parentNode.parentNode).attr('maxlength','5');
      $('td:eq(2) input',this.parentNode.parentNode).val(99999);
    }
  });
}

var applyFilter = function(button){
  //deactivate button
  $(button).attr('disabled','true');
  
  //populate the fullroster the first time //moved here to fix greasemonkey issues
  if(!fullroster){
    fullroster = $('#activeroster').clone();
  }
        
  //make a clone of the active roster
  new_roster = $(fullroster).clone();
  
  //go through each player in the new roster
  $('option',new_roster).each(function(){
    //assume visible to start
    visible = true;
    
    //grab player id, raw attributes, and 1 year salary
    id = $(this).val().trim();
    att = $('input[name="pattnoinj' + id +'"]').val();
    cont = $('#cont' + id + 'x1').val(); 
           
    //go through each filter
    $('.filter_row').each(function(){
      //gather input values for this filter
      input = new Array();
      $(':input',this).each(function(){
        input.push(parseFloat($(this).val()));
      });
      
      //get the value for current row
      v = $('select',this).val();
      
      if(v == 97){
        //grab relevant attribute values
        index = (parseFloat(input[0])-1)*4;
        cur =parseFloat(att.substring(index,index+2));
        
        //compare values and indicate any player that fails
        if(input[1] > cur || input[2] < cur){
          visible = false;
        }        
      }else if(v == 98 || v == 99){
        //grab relevant attribute values
        index = (parseFloat(input[0])-1)*4;
        cur =parseFloat(att.substring(index,index+4));
        
        //compare values and indicate any player that fails
        if(input[1] > cur || input[2] < cur){
          visible = false;
        }        
      }else if(v == 100){
        //grab relevant attribute values
        cur = parseFloat(cont.substr(0,5)) + parseFloat(cont.substr(5,5));
        
        //compare salary to values
        if(input[1] > cur || input[2] < cur){
          visible = false;
        }
      }else if(v == 101){
        //grab relevant attribute values
        cur = parseFloat(cont.substr(0,5));
        
        //compare salary to values
        if(input[1] > cur || input[2] < cur){
          visible = false;
        }
      }else{
        //grab relevant attribute values
        index = (parseFloat(input[0])-1)*4;
        cur =parseFloat(att.substring(index,index+2));
        pot =parseFloat(att.substring(index+2,index+4));
           
        //compare values and indicate any player that fails
        if(input[1] > cur || input[2] < cur || input[3] > pot || input[4] < pot){
          visible = false;
        }
      }
      
      if(!visible){
        return;
      }
    });
    
    if(!visible){
      $(this).remove();
    }        
  });  
  
  //display results
  $('#activeroster').html($(new_roster).html());
  
  //re-activate button
  $(button).removeAttr('disabled');  
}

var removeFilter = function(button){
  $(button).parent().parent().remove();
}

$(document).ready(function(){
  //create an interface
  $table = $('<table id="free_agent_filter" width="100%" style="background-color:#EEEEE0;"></table>').html(
    '<tr><th></th><th colspan="2">Current</th><th colspan="2">Potential</th><th></th></tr>' +
    '<tr><th>Attribute</th><th>Min</th><th>Max</th><th>Min</th><th>Max</th><th></th>' +
    '<tr id="filter_buttons"><td><button type="button" class="addFilter">Add Filter</button></td>'+
    '<td colspan="4">' +
    '</td><td><button type="button" class="applyFilter">Apply Filter</button></td>' +
    '<tr><td style="font-size: 75%;" colspan="6"><i>Note: Height is input as a three digit number.' +
    ' For example 6\'2" would be input as 602.</i></td></tr>'
  );
  $table.insertBefore('#bigtable');
  
  addFilter();

  //attach event handlers
  $('.addFilter').click(addFilter);
  $('.applyFilter').click(function(){
    applyFilter(this)
  });  
});
