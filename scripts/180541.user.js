// ==UserScript==
// @name       Vote Page User Script
// @namespace 
// @version    0.1
// @description  Opens the links in all tabs
// @match     http://creative-scape.net/vote/*
// @copyright  2013+, Matthew
// @require //ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    
  $('body').append('<div id="VoteBtn">'+'<p class="inerbutton">'+'Open Links'+'</p>'+'</div>')
  $('.inerbutton').css({
      'margin': '0 auto',
      'padding': '5px',
     'margin-top': '12px',
      'cursor': 'pointer',
   
  });
   $("#VoteBtn").hover(function(){
       $("#VoteBtn").css({
           'color':'red',
           'cursor':'pointer',
       });
       
  },function(){
  $("#VoteBtn").css("color","yellow");
});
  $("#VoteBtn").css({
  'text-align': 'center',
  'border-style':'none',
  'background-color':'rgba(0,0,0,.5)',
  'color':'yellow',
  'position': 'fixed',
  'top':'0',
  'left':'0',
  'height': '50px',
  'widht': '75px',
  });
   
    
    var hrefs = new Array();
    var elements = $('.votelinks ul li a');
    elements.each(function() { 
    hrefs.push($(this).attr('href'))
      });     
    
  $('#VoteBtn').click(function(){

 
    $.each(hrefs, function(index, value) { 
     setTimeout(function(){
       window.open(value, "_blank");
      },1000);
    });

         
    // });   
    
    
    
    
  });



    
    

    
    
    
    
    
    
    
});