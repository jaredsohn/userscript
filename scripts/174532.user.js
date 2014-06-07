// ==UserScript==
// @name         Jack's buttons
// @version      1.0.5
// @description  Adds some fancy buttons to the profile page.  
// @include      http://tf2r.com/user/*
// Special thanks to _Hands for helping me out!
// People that tested this: j0x, my jhon is <insert statement here>
// ==/UserScript==

//Design/appends----------------------------------------------------------------------------------------------------------------------------------------    


$(document).ready(function() {
 	var buttonAdd = "<div></div>  <div></div> <div></div> <div></div>";
    $("body").prepend(buttonAdd);
    $("body > div:eq(0)").addClass("addfriend");
    $("body > div:eq(2)").addClass("tf2b");
    $("body > div:eq(3)").addClass("rep");
    $("body > div:eq(1)").addClass("backpack");
    
    $(".addfriend").append('<a>Add Friend</a>');
    $(".addfriend > a").css({'display': 'inline-block', 'width': '120px', 'height': '40px', 'background-color': '#2dcb38', 'line-height': '39px', 'vertical-align': 'text-middle', 'text-align': 'center', 'color': '#ffffff', 'font-family': 'Arial', 'font-size': '20px', 'font-weight': 'bold', 'font-style': 'normal', 'border-radius': '2px', 'opacity': '0.9', 'left': '160px', 'top': '253px', 'position': 'relative', 'float': 'left'});
	
    $(".backpack").append('<a>backpack.tf</a>');
    $(".backpack > a").css({'display': 'inline-block', 'width': '120px', 'height': '40px', 'background-color': '#2e6cd1', 'line-height': '39px', 'vertical-align': 'text-middle', 'text-align': 'center', 'color': '#ffffff', 'font-family': 'Arial', 'font-size': '20px', 'font-weight': 'bold', 'font-style': 'normal', 'border-radius': '2px', 'opacity': '0.9', 'left': '40px', 'top': '305px', 'position': 'relative', 'float': 'left'});

    $(".tf2b").append('<a>tf2b.com</a>');
    $(".tf2b > a").css({'display': 'inline-block', 'width': '120px', 'height': '40px', 'background-color': '#2e6cd1', 'line-height': '39px', 'vertical-align': 'text-middle', 'text-align': 'center', 'color': '#ffffff', 'font-family': 'Arial', 'font-size': '20px', 'font-weight': 'bold', 'font-style': 'normal', 'border-radius': '2px', 'opacity': '0.9', 'left': '-80px', 'top': '357px', 'position': 'relative', 'float': 'left'});

    $(".rep").append('<a>steamrep</a>');
    $(".rep > a").css({'display': 'inline-block', 'width': '120px', 'height': '40px', 'background-color': '#2e6cd1', 'line-height': '39px', 'vertical-align': 'text-middle', 'text-align': 'center', 'color': '#ffffff', 'font-family': 'Arial', 'font-size': '20px', 'font-weight': 'bold', 'font-style': 'normal', 'border-radius': '2px', 'opacity': '0.9', 'left': '-200px', 'top': '410px', 'position': 'relative', 'float': 'left'});

// Animations----------------------------------------------------------------------------------------------------------------------------------------       
    
	$("body > div:eq(3)").mouseenter(function(){
       	 		$(this).fadeTo("fast", 1);
        $(this).mouseleave(function(){
            $(this).fadeTo("fast", 0.9);
        });
    });


    $("body > div:eq(2)").mouseenter(function(){
       	 		$(this).fadeTo("fast", 1);
        $(this).mouseleave(function(){
            $(this).fadeTo("fast", 0.9);
        });
    });
    
    
    $("body > div:eq(0)").mouseenter(function(){
            	$(this).fadeTo("fast", 1);
            $(this).mouseleave(function() {
                $(this).fadeTo("fast", 0.9);
        });
    });
    
    
    $("body > div:eq(1)").mouseenter(function(){
        	$(this).fadeTo("fast", 1);
        $(this).mouseleave(function(){
            $(this).fadeTo("fast", 0.9);
        });
    });
    
    
//--------------------------------------------------------------------------------------------  
// Splits the userid from the link (thank you again Hands)
 
url = window.location.href;
urlArr = url.split('user/');
url = urlArr[1];
urlArr = url.split('.html');
url = urlArr[0];
    
    link2 = "http://tf2b.com/tf2/" + url; 
   link1 = "http://backpack.tf/id/" + url;
    link3 = "http://steamrep.com/index.php?id=" + url;
    $('.addfriend > a').attr('href', "steam://friends/add/" + url);
    $('.backpack > a').attr('href', link1);
	$('.tf2b > a').attr('href', link2);
  	$('.rep > a').attr('href', link3);
//-------------------------------------------------------------------------------------------    
    
// Don't edit this one! v    
    if (url == 76561198001620685) {
         $('.upvb').text('6942015');
    	$('.downvb').text('none! go home!');
$('body').css({"background-image": "url('http://puu.sh/3QcwA/064d16ade7.jpg')", 'background-attachment': 'fixed'});
        $('body > #header').css({'opacity': '0.1'});
 $('#wrapper').append('<embed src="http://puu.sh/43yZP/9d5b5f6afb.mp3" controller="true" autoplay="true" autostart="True" type="audio/mp3" />');
    }
    
// Don't edit it! Never! ^    
    
    
// Low resolutions fix ----------------------------------------------------------------------------
    var screenObj = screen.width;
  	if (screenObj < 1360) {
      $(".addfriend > a").css({'left': '117px'});
      $(".backpack > a").css({'left': '-3px'});
      $(".tf2b > a").css({'left': '-123px'});
      $(".rep > a").css({'left': '-243px'});
  	}
    if (screenObj < 1280) {
        $(".addfriend > a").css({'left': '0px'});
		$(".backpack > a").css({'left': '-120px'});
      	$(".tf2b > a").css({'left': '-240px'});
      	$(".rep > a").css({'left': '-360px'});
    }
//High resolution fix-------------------------------------------------------------------------------    
    
    if (screenObj > 1366) {
      $(".addfriend > a").css({'left': '197px'});
      $(".backpack > a").css({'left': '76px'});
      $(".tf2b > a").css({'left': '-43px'});
      $(".rep > a").css({'left': '-163px'});
    }
    
    $(".mNeut").remove();    
});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    