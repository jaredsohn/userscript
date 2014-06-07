// ==UserScript==
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @name XBOX Post Automatic Bury
// @description This script hides posts by the spastic idiots (xbox users) people on the cybergamer forum
// @run-at document-start
// @version 0.32
// @run-at document-start
// ==/UserScript==


function xbox_post_hide(post_id) {
    var a_id = 'a_' + post_id; 
    var b_id = 'b_' + post_id; 
    var c_id = 'c_' + post_id; 
    var d_id = 'd_' + post_id; 
    var e_id = 'e_' + post_id; 
    var f_id = 'f_' + post_id; 
    var g_id = 'g_' + post_id; 
    var h_id = 'h_' + post_id; 
    var i_id = 'i_' + post_id;
    xbox_forumhide(a_id); 
    xbox_forumhide(b_id); 
    xbox_forumhide(c_id); 
    xbox_forumhide(d_id); 
    xbox_forumhide(e_id); 
    xbox_forumhide(f_id); 
    xbox_forumhide(g_id); 
    xbox_forumhide(h_id); 
    xbox_forumhide(i_id); 
}
function xbox_forumhide(id){
  $("#" + id).hide();
  alert(id);
}

function block_posts(){
  
  // blocked game defaults
  var blocked_users = new Array("xbox", "XBOX");
  
  $(".forumpost_bar").each(function() {  
    alert("post detected " + $(this).attr("id"));
      if($(".forumpost_bar_stat:contains('XBOX')")){   
        alert("xbox detected.. trying to hide post");
        xbox_post_hide($(this).attr("id"));
    }    
  });  
}

$(document).ready(function(){
  block_posts();							 
});  