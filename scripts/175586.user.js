// ==UserScript==
// @name        flux_ignore
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @namespace   flux_ignore
// @description ignore users of flux bb
// @include     http://forums.silverstackers.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1
// ==/UserScript==

/*
  This script enables ignore user feature on a standard FluxBB forum install. Simply replace the @include file with the forum's URL (include the url wildcard '*'' at the end) 
*/


String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};



function ignore(){
  var users = GM_getValue( 'ignoring_users' );
  if (typeof users === 'string') {
    var user_ids = users.split(",");
    for(var i=0;i<user_ids.length;i++){
      var uid = user_ids[i].trim();  
      if (uid.length > 0){
        // Hide all threads started by user
        $("td.tcl:contains('by " + uid + "')").parent().children().hide();
        // Hide all posts
        $("div.postleft:contains('" + uid + "')").closest('.blockpost').hide();
        // Hide all quotes
        $("cite:contains('" + uid + " wrote:')").parent().html('<b>Ignored</b>').css({'background-color':'red'});
      }
    } 
  }  
}



$(function() {

   var content1 = '<div class="comp-guesses" style="width:100%;padding:5px; background-color:#fff;"><a id="collect-guesses" href="javascript:void(0)">Collect Guesses</a></div>'; 
    $('body').prepend(content1);
  
    $('#collect-guesses').click(function() {
      var guesses = '<br>';
      // Loop all postmsg
      $('.postright > .postmsg').each( function(i, obj) {
        var user_id = $(obj).parent().parent().find('.postleft > dl > dt > strong').text();
        var x = $(obj).clone();
        $(x).find('.quotebox').remove(); // remove any quoted messages
        var post_txt = $(x).text();
        var patt1= /\d+\.\d+/g;
        var myArray = patt1.exec(post_txt);
        if (myArray){
          guesses = guesses + user_id + ',' + myArray[0] + '<br>';
        }   
      });   
      $('.comp-guesses').append(guesses);  
    });



    // We're on the profile page
    if ($('#profile1').length > 0){
      var content = '<div class="inform">';
      var content = content + '<fieldset>';
      var content = content + '<legend>Ignore List</legend>';
      var content = content + '<div class="infldset">';
      var content = content + '<span id="ignoring_msg">You are ignoring:</span><br> <div id="ignore-list"></div><br>';
      var content = content + '</div>';
      var content = content + '</fieldset>';
      var content = content + '</div>';  
      
      $('#profile1').prepend(content);
      
      var users = GM_getValue( 'ignoring_users' );
      if (typeof users === 'string') {
        var user_ids = users.split(",");
        var added = false;
        for(var i=0;i<user_ids.length;i++){
          if (user_ids[i].trim().length > 0){ 
            added = true;
            $('#ignore-list').append('<div id="ignore_' + i + '">' + user_ids[i] + ' - <a id="stopi_' + i + '" href="javascript:void(0)">Stop Ignoring</a></div>');
          }
        }
        if (!added){
          $('#ignoring_msg').text('Your ignore list is empty');
        } else {
          $('#ignore-list > div > a').click(function() {
            var id = $(this).attr('id').split('_')[1];
            var users = GM_getValue( 'ignoring_users' );
            if (typeof users === 'string') {
              var user_ids = users.split(",");
              var new_list = [];
              for(var i=0;i<user_ids.length;i++){
                if (id != i){
                  new_list.push(user_ids[i]);
                }
              }
              GM_setValue( 'ignoring_users', new_list.join(',') );
              $('#ignore_' + id).hide();
            }
          }); 
        }
      }
      
      $('#ignoring').val(GM_getValue( 'ignoring_users' ));
      
      $('#updateignore').click(function() {
          users = $('#ignoring').val();
          GM_setValue( 'ignoring_users', users );
          ignore();
      });
      $("#ignoring_users").blur(function () {
          users = $('#ignoring').val();
          GM_setValue( 'ignoring_users', users );
          ignore();
      });      
      
      
    }
    

    $(".postfootright > ul").prepend('<li class="ignore postreport"><span><a href="javascript:void(0)">Ignore</a></span></li>');
    $(".postedit").parent().find('.ignore').hide();
    $(".postedit").parent().find('.postthanks').hide();
    
   
  
    $('.ignore > span > a').click(function() {
      var users = GM_getValue( 'ignoring_users' ) == undefined ? '' : GM_getValue( 'ignoring_users' );
      var un = $(this).parent().parent().parent().parent().parent().parent().parent().parent().find('strong').first().text();
      users = users.length > 0 ? users + ', ' + un : un;  
      GM_setValue( 'ignoring_users', users );
      ignore();    
    }); 
    
    ignore(); 
    
});