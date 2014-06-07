// ==UserScript==
// @name       deviantART modernized
// @namespace  http://fezvrasta.deviantart.com/
// @version    0.1
// @description  Beta 1
// @match      http://*deviantart.com/*
// @copyright  2012+, FezVrasta
// @require       http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==


$(window).error(function(e){
    e.preventDefault();
});

$(document).ready( function() {
   
    
    
    deviantid = $("#oh-menu-deviant > a > b").text();
    deviantsymbol = $("#oh-menu-deviant a .oh-symbol").text();
    deviantclass = $("#oh-menu-deviant a .oh-darker").not(".oh-symbol").text();
    deviantprofile = $("#oh-menu-deviant .mi.iconset-gruser").parent().html();
    deviantmessages = $(".oh-menu.iconset-messages").html();
    deviantsubmit = $("#oh-menu-submit .oh-menu").html();
    deviantshop = $("#oh-menu-shop .oh-menu").html();
    
   
    
    if($(".browse-left-bar").length > 0) { browseleftbar = $(".browse-left-bar").html();
    
        fezmenu = "<div class=\"parent togglenext\"><b>Browse:</b></div>";
        fezmenu += "<div class=\"child\">" + browseleftbar + "</div>";
                                         
    } else { fezmenu = ""; }
     
        
        
        
    
    
    fezmenu += "<div class=\"parent\"><span class=\"oh-darker\">" + deviantclass + "</span> <span class=\"oh-darker oh-symbol\">" + deviantsymbol + "</span><b>" + deviantid + ":</b></div>";
    fezmenu += "<div class=\"child\">" + deviantprofile + "</div>";
    
    fezmenu += "<div class=\"parent\"><b>Messages:</b></div>";
    fezmenu += "<div class=\"child\">" + deviantmessages + "</div>";
    
    fezmenu += "<div class=\"parent\"><b>Submit:</b></div>";
    fezmenu += "<div class=\"child\">" + deviantsubmit + "</div>";
    
    fezmenu += "<div class=\"parent\"><b>Shop:</b></div>";
    fezmenu += "<div class=\"child\">" + deviantshop + "</div>";
    
    fezmenu += "<div class=\"parent\"><b>Other:</b></div>";
    fezmenu += "<div class=\"child\"><a href=\"http://browse.deviantart.com/?thumb_mode=0&view_mode=0#top\" class=\"mi\">Friends</a><a href=\"http://browse.deviantart.com/?thumb_mode=0&view_mode=0#top\" class=\"mi\">Favourites</a></div>";
    
 $("body").prepend("<div class=\"fez-menu\">" + fezmenu + "</div>");
         
       
    height = $("#output").height();
    
    $(".fez-menu").css("minHeight", height);
    
    
        $("#da-h1").click( function() {
            
             $(".fez-menu, #output, .ghost-edit, .bubbleview, #depths").toggleClass("active"); 
            
            if($("body").width() < 960 ) {
                
                
                event.preventDefault();
              
                
                
                if($("#gmi-ResourcePageMetaPane").length > 0 && $(".aboutinsidebar").length <= 0) { 
                    
                    deviationinfo = $(".details-section:eq(2)").html();
                    deviationinfo2 = $(".details-section:eq(3)").html();
                    deviationinfo3 = $(".details-section:eq(4)").html();
                    devlinkzone = $(".devlinkzone:eq(1)").html();
                    
                    addtomenu = "<div class=\"parent aboutinsidebar\"><b>About this deviation:</b></div>";
                    addtomenu += "<div class=\"child aboutinsidebar\"><b>Download:</b><br /><br >" + devlinkzone + "</div>";
                    addtomenu += "<div class=\"child aboutinsidebar\"><b>Featured in Groups:</b><br /><br >" + deviationinfo + "</div>";
                    addtomenu += "<div class=\"child aboutinsidebar info\"><b>Details:</b><br /><br />" + deviationinfo2 + "</div>";
                    addtomenu += "<div class=\"child  aboutinsidebar info\"><b>Details:</b><br /><br />" + deviationinfo3 + "</div>";
                    
                    $(".fez-menu").prepend(addtomenu);
                    
                } 
                
                if($(".messages-menu").length > 0 && $(".aboutinsidebar").length <= 0) {
                 
                    $(".messages-menu").clone().prependTo(".fez-menu");
                    $(".page2 .header").removeClass("header").addClass("headder aboutinsidebar");
                    
                    
                }
                   
               
                 
                
                
    		}
        });
    
    $("#output, .bubbleview, .browse-container, a").not(".fez-menu, #da-h1").click( function(evt) { 
        
         $(".fez-menu, #output, .ghost-edit, .bubbleview, #depths").removeClass("active"); 
       
     });
    
    
    // Detect if user scroll horizontally, if so, hide the fez menu
    var lastScrollLeft = 0;
    $(window).scroll(function() {
        var documentScrollLeft = $(document).scrollLeft();
        if (lastScrollLeft != documentScrollLeft) {
            if(documentScrollLeft > 30) {
                $(".fez-menu, #output, .ghost-edit, .bubbleview").removeClass("active");
                    
                lastScrollLeft = 0;
            }
        }
    });
    
});