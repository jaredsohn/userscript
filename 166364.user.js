// ==UserScript==
// @name       HackSociety Skin
// @namespace  http://hacksociety.net/
// @version    0.1
// @description  HackSociety Skin
// @match      http://hacksociety.net/*
// @copyright  swag
//@require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$(document).ready(function(){
    //Remove annoyances
	$('body').find("#thread_advertising").remove();
   	$('body').find(".l0ad_lulz").remove();
        $('body').find(".navigation").remove();
   	$('body').find("#sidebar").remove();
	$('body').find("#sidebar").remove();
	$('body').find(".option-hidden").remove();
	$('body').find("#topbox").remove();
	$('body').find(".dnimg").remove();
	$('body').find("#pagetitle").remove();
    
    //Remove space under header
    $('#content').find("br").slice(0, 1).remove();

	//Remove donate forum gold
    $('#nav').find("li").slice(9, 10).remove();

    //Post username color:
    $("td.post_author .largetext span:contains('7th')").css("color", "red");
	
    //Remove hover on nav bar
    $('#nav li').removeAttr('onmouseover');
	$('#nav li').removeAttr('onmouseout');    
	
    //Background thread color
    $('#content').css('background-color', '#232323');  
    
    //Header with blue outline
    $('.header').css("background-image", "url(http://i.imgur.com/EDV4ZYL.png)");  
	
    //Remove gradient at top
	$("div[id^='nav']").css("background-image", "url(http://i.imgur.com/0qV8rOC.png)");
    
    //Move the slide down thing
	$("body").find("[class='right panel']").css("background-color", "transparent");     
	$("body").find("[class='right panel']").css("top", "-41px");     
	
    //Move the Message button and Thread reply buttons to nav bar
    $('.left').find("div").slice(1 , 2).css("right", "115px");
    $('.left').find("div").slice(1 , 2).css("top", "-34px");
    $('.left').find("div").slice(3 , 4).css("right", "115px");
    $('.left').find("div").slice(3 , 4).css("top", "-34px"); 
    $('.left').find("div").slice(3 , 4).css("background-color", "transparent");
    $('.left').find("div").slice(1 , 2).css("background-color", "transparent"); 

    
    //idk
    $("[class='right textright']").css("top" , "-34px");
    //$("[class='right textright'] ").css("width" , "50px");
	
    //Make your avater 50x50
        $("[class='right textright']").find("img").css("width" , "50px");
	$("[class='right textright']").find("img").css("height" , "50px");
	$("[class='right textright']").find("img").css("top" , "1px");
    
    //Change button design
	$('#container #content .float_r').find(".psbitbtton_big").css("border","1px solid #117b8d");
	$('#container #content .float_r').find(".psbitbtton_big").css("border-radius","0px");
	$('#container #content .float_r').find(".psbitbtton_big").css("font-size","12px");
	$('#container #content .float_r').find(".psbitbtton_big").css("padding-left","10px");
	$('#container #content .float_r').find(".psbitbtton_big").css("padding-right","10px");
        $('#container #content .float_r').find(".psbitbtton_big").css("color","#FFFFFF");
        $('#container #content .float_r').find(".psbitbtton_big").css("border-top-left-radius","5px");
        $('#container #content .float_r').find(".psbitbtton_big").css("border-top-right-radius","5px");

    
	//Remove gradient at the footer of HS
        $('#container #content').find(".footlist").css("background-image","url(http://i.imgur.com/0qV8rOC.png)");
    
    //Remove Email button
	$('.psbitbtton_small:contains("email")').remove();
    //Remove Find button
	$('.psbitbtton_small:contains("find")').remove();
    
    
 	//Reply button at the bottom of thread
	$('#container #content .float_left').find(".psbitbtton_big").css("border","1px solid #117b8d");
	$('#container #content .float_left').find(".psbitbtton_big").css("border-radius","0px");
	$('#container #content .float_left').find(".psbitbtton_big").css("font-size","12px");
	$('#container #content .float_left').find(".psbitbtton_big").css("padding-left","10px");
	$('#container #content .float_left').find(".psbitbtton_big").css("padding-right","10px");
        $('#container #content .float_left').find(".psbitbtton_big").css("color","#FFFFFF");
        $('#container #content .float_left').find(".psbitbtton_big").css("border-top-left-radius","5px");
        $('#container #content .float_left').find(".psbitbtton_big").css("border-top-right-radius","5px");
   
    //Pm button
	$('.psbitbtton_small:contains("pm")').css("border","1px solid #117b8d");
	$('.psbitbtton_small:contains("pm")').css("border-radius","0px");
	$('.psbitbtton_small:contains("pm")').css("font-size","12px");
	$('.psbitbtton_small:contains("pm")').css("padding-left","10px");
	$('.psbitbtton_small:contains("pm")').css("padding-right","10px");
	$('.psbitbtton_small:contains("pm")').css("color","#FFFFFF");
	$('.psbitbtton_small:contains("pm")').css("border-top-left-radius","5px");
	$('.psbitbtton_small:contains("pm")').css("border-top-right-radius","5px");

	//Reply button in threads
	$('.psbitbtton_small:contains("reply")').css("border","1px solid #117b8d");
	$('.psbitbtton_small:contains("reply")').css("border-radius","0px");
	$('.psbitbtton_small:contains("reply")').css("font-size","12px");
	$('.psbitbtton_small:contains("reply")').css("padding-left","10px");
	$('.psbitbtton_small:contains("reply")').css("padding-right","10px");
	$('.psbitbtton_small:contains("reply")').css("color","#FFFFFF");
	$('.psbitbtton_small:contains("reply")').css("border-top-left-radius","5px");
	$('.psbitbtton_small:contains("reply")').css("border-top-right-radius","5px");
	
    //multiquote
	$('.psbitbtton_small:contains("multiquote")').css("border","1px solid #117b8d");
	$('.psbitbtton_small:contains("multiquote")').css("border-radius","0px");
	$('.psbitbtton_small:contains("multiquote")').css("font-size","12px");
	$('.psbitbtton_small:contains("multiquote")').css("padding-left","10px");
	$('.psbitbtton_small:contains("multiquote")').css("padding-right","10px");
	$('.psbitbtton_small:contains("multiquote")').css("color","#FFFFFF");
	$('.psbitbtton_small:contains("multiquote")').css("border-top-left-radius","5px");
	$('.psbitbtton_small:contains("multiquote")').css("border-top-right-radius","5px");
    
    //Report button. Fuck that blue hover. Really.
    $('.psbitbtton_small:contains("report")').css("border","1px solid #BF0D0D");
	$('.psbitbtton_small:contains("report")').css("border-radius","0px");
	$('.psbitbtton_small:contains("report")').css("font-size","12px");
	$('.psbitbtton_small:contains("report")').css("padding-left","10px");
	$('.psbitbtton_small:contains("report")').css("padding-right","10px");
	$('.psbitbtton_small:contains("report")').css("color","#FFFFFF");
	$('.psbitbtton_small:contains("report")').css("border-top-left-radius","5px");
	$('.psbitbtton_small:contains("report")').css("border-top-right-radius","5px");    
 
    
    //Edit
   	$('.psbitbtton_small:contains("edit")').css("border","1px solid #117b8d");
	$('.psbitbtton_small:contains("edit")').css("border-radius","0px");
	$('.psbitbtton_small:contains("edit")').css("font-size","12px");
	$('.psbitbtton_small:contains("edit")').css("padding-left","10px");
	$('.psbitbtton_small:contains("edit")').css("padding-right","10px");
	$('.psbitbtton_small:contains("edit")').css("color","#FFFFFF");
	$('.psbitbtton_small:contains("edit")').css("border-top-left-radius","5px");
	$('.psbitbtton_small:contains("edit")').css("border-top-right-radius","5px");
    
    
    
    //Delete
   	$('.psbitbtton_small:contains("delete")').css("border","1px solid #117b8d");
	$('.psbitbtton_small:contains("delete")').css("border-radius","0px");
	$('.psbitbtton_small:contains("delete")').css("font-size","12px");
	$('.psbitbtton_small:contains("delete")').css("padding-left","10px");
	$('.psbitbtton_small:contains("delete")').css("padding-right","10px");
	$('.psbitbtton_small:contains("delete")').css("color","#FFFFFF");
	$('.psbitbtton_small:contains("delete")').css("border-top-left-radius","5px");
	$('.psbitbtton_small:contains("delete")').css("border-top-right-radius","5px");
    
    //Website button
   	$('.psbitbtton_small:contains("www")').css("border","1px solid #117b8d");
	$('.psbitbtton_small:contains("www")').css("border-radius","0px");
	$('.psbitbtton_small:contains("www")').css("font-size","12px");
	$('.psbitbtton_small:contains("www")').css("padding-left","10px");
	$('.psbitbtton_small:contains("www")').css("padding-right","10px");
	$('.psbitbtton_small:contains("www")').css("color","#FFFFFF");
	$('.psbitbtton_small:contains("www")').css("border-top-left-radius","5px");
	$('.psbitbtton_small:contains("www")').css("border-top-right-radius","5px");
    

});