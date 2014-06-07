// ==UserScript==
// @name        VBulletin New User Moderation+
// @namespace   http://userscripts.org/users/492187
// @description Adds columns fetched from user profile, highlights dupe IPs, sets "Man" bio's to delete, etc.
// @include     http://*/forum/admincp/user.php?do=moderate
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @updateURL http://userscripts.org/scripts/source/151904.meta.js
// @version     1.2
// ==/UserScript==

$('input:radio[name=send_deleted]').filter('[value="0"]').attr('checked', true); //default send email to deleted users to no (minimize bounces)

//set main css classes to not wrap
$(".alt1").attr({nowrap   :'nowrap',
                 overflow :'hidden'
 });
$(".alt2").attr({nowrap   :'nowrap',
                 overflow :'hidden'
 });
$(".thead").attr({nowrap  :'nowrap',
                 overflow :'hidden'
 }); 

//add all new column headers
$("#cpform_table tr:eq(0) td:eq(0)").attr("colspan","9");
$("#cpform_table tr:eq(1)").append("<td class='thead' align='left'>Bio</td>");
$("#cpform_table tr:eq(1)").append("<td class='thead' align='left'>First Name</td>");
$("#cpform_table tr:eq(1)").append("<td class='thead' align='left'>Last Name</td>");
$("#cpform_table tr:eq(1)").append("<td class='thead' align='left'>ICQ?</td>");
$("#cpform_table tr:eq(1)").append("<td class='thead' align='left'>Home Page</td>"); 

$("#cpform_table tr:gt(1)").each(function() { //iterate through table rows (skip header rows)
  var row = $(this);
  var td0 = $("td:eq(0)", row); //"ID (Email)" cell for current row
  var td2 = $("td:eq(2)", row); //"IP Address" cell for current row
  var uid = $("a",td0).attr('href').substring(19); //get user id from ID cell
  
  //add columns for current row
  row.append("<td class='"+$(td0).attr("class")+"' id='ubiog"+uid+"' align='left'>Not Loaded</td>");
  row.append("<td class='"+$(td0).attr("class")+"' id='fname"+uid+"' align='left'>Not Loaded</td>");
  row.append("<td class='"+$(td0).attr("class")+"' id='lname"+uid+"' align='left'>Not Loaded</td>");
  row.append("<td class='"+$(td0).attr("class")+"' id='icqyn"+uid+"' align='left'>Not Loaded</td>");
  row.append("<td class='"+$(td0).attr("class")+"' id='homep"+uid+"' align='left'>Not Loaded</td>");
  
  $.get('/forum/modcp/user.php?do=edit&u='+uid,function(resp) { //get user profile page
    var ubiog = $("#ta_profile\\[field1\\]_19", resp).val().substring(0,20);
    var fname = $("#it_profile\\[field5\\]_23", resp).val().substring(0,20);
    var lname = $("#it_profile\\[field6\\]_24", resp).val().substring(0,20);
    var icqyn = $("#it_user\\[icq\\]_9",   resp).val();
    var homep = $("#it_user\\[homepage\\]_6",   resp).val();
    if(icqyn != ''){icqyn = 'Y'}; //replace icq#'s with Y because we only want to know if they exist
    
    //populate columns for current row
    $("#ubiog"+uid).text(ubiog);
    $("#fname"+uid).text(fname);
    $("#lname"+uid).text(lname);
    $("#icqyn"+uid).text(icqyn);
    $("#homep"+uid).html("<a href='"+homep+"'>"+homep+"</a>");
    
    //set users with a biography of "Man" to delete
    if (ubiog == 'Man'){
      $('input:radio[name="validate['+uid+']"]').filter('[value="-1"]').attr('checked', true);
    };
  },"html");  
  
  //look for duplicate ip addresses
  var ipcount = 0;
  $("#cpform_table tr:gt(1)").each(function() {
    var curip = $("td:eq(2)", this).text();
    if (curip == $(td2).text()){
      ipcount++;
      if(ipcount>1){
        $(td2).css('backgroundColor', '#ffff66'); //set dupe background color to yellow
      }
    }
  });
});