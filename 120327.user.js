// ==UserScript==
// @name       Youtube modifications
// @namespace  http://www.jojosapps.com
// @version    1.5.1b
// @description  A script that adds various functionality to youtube. Check description for more info
// @include    http://www.youtube.com/
// @include    http://www.youtube.com/inbox?to_users=*&action_compose=1#CuPm
// @include    http://www.youtube.com/subscription_manager
// @require    http://code.jquery.com/jquery-1.7.1.min.js
// @copyright  2011, Jenna
// ==/UserScript==

/*The script is currently removing the copyright footer due to some loading bug that happens if the overlay loaded directly on the body.
  This will be changed later though.*/

/*
***CREDITS***
Zenkerdus (Twitter) for helping with testing
AllGenGamers for idea for extended pin list


***BETA***

1.5.1b

--Front page
*Added animation for switching between grid and row mode


1.5b

--Front page
*Added a button to remove the sidebar (Located on the upper right). Broke the PM formating for some reason
*Made row and grid icons work. Not 100% though.
*Merry xmas!!


1.4b

--Front page
*Added extended pin menu
*Added another page the script includes: http://www.youtube.com/subscription_manager
*Started with the cleanup of the code to make everything easier to read


1.3b

--Front page
*Added a grid icon. CUrrently doesn't work, but will make it so that the videos appear in a grid instead.
*Fixed a Quick PM glitch


1.2.2b

--Front page
*Fixed firefox problem. It should work on firefox now


1.2.1b

--Inbox page
*Fixed so that loading CuPm in inbox removes the "Friends promo" element that popped up as youtube made more changes to the site.
*Fixed the top margin to be -25 instead of -35. To make the CuPm page look slightly more clean.


1.2b

--Front page stuff
*Added a PM icon as a data URL in the code
*Added quick PM functionality to the upload timeline on the front page. For subscriptions only at the moment. To be improved upon next version
*Added -moz css to add a box shadow and border radius to firefox browsers

--Inbox page
*Included a special compose url in order to make quick PM work.
*Styled the inbox page for when #CuPm is found in the url.


1.1b

--Front page stuff
*Improved quick view layout. It's currently minimized view only, but will add option later to have it go full screen.
*Changed position of quick view. It's now on the thumbnail of subscription video
*Added animation to quick view popup.
*Added settings item in the master head menu. Doesn't do anything yet.
*Fixed a bug where comments page and quick view wasn't the correct one for each video.


1.0b
*Initial coding

--Front page stuff
*Added quick view to the side of the title.
*Added the ability to click to view all comments of a video directly from the subscription feed

*/

var CuMailImage = "data:image/png;base64,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";
var CuGridImage = "data:image/gif;base64,R0lGODlhIgAiANUAAAAAAP///4GBgYCAgH9/f319fXx8fHt7e3p6enl5eXh4eGdnZ2ZmZmFhYWBgYF9fX1hYWFdXV1ZWVlVVVVNTU1JSUlFRUU9PT01NTUxMTEpKSklJSUhISEZGRkRERENDQ0FBQT8/Pz4+Pj09PTs7Ozo6Ojk5OTc3NzY2NjU1NTMzMzIyMjExMTAwMC8vLy4uLiwsLCsrKyoqKigoKP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADQALAAAAAAiACIAAAb/QIhwSCwaj8aIcslsOp9OiXRKrVqv1ol2y+16v16KeEwum8/minrNbrvfbot8Tq/b7/aLfs/v+/9+GIKDhIWGh4YZiouMjY6PjhqSk5MbBQKYBRuSlpgCmpShHKOkpB4Hngceo6epq6WlHbKzsyAJngkgsra4urS0HsHCwiEJBMcJIcHFxwTJw9Af0tPTIQsNDg0LIdLW2Nrc1NQg5OXlIicq6ici5OjqKuzm8yL19vYjJCX7JCP1+ftK9LtHcITBgwgTKlyokITDhxAjSpwoMaDFfSYMDNhowARGjRw9XgxooqRJkygQeEKAomTKlS1PnjxBs2ZNFQo8KYiXLiemj502g6IYSpToCgXNFKwYejTp0qJFU0idOpUFAwcPHDBgIdUqVq1cqVKFR1Zdixgz0sZoYRatWrZl4a2YS5cuCxcuXuBlMfdu3r11A7MYTLiw4cOID7dYzLix48eQH+OdTLmy5cuXX2jezLmz58+eYYgeTbq06dOoU6teLTqG69ewY8ueLVuG7du4c+verTsIADs=";
var CuPinImage = "data:image/png;base64,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";

$(document).ready(function(){
	
    /*$("a").live("mouseenter", function(){
			
        $(this).stop(true);
        
        $(this).animate({
            opacity: 0.8
        }, 300 );
        
    });
    $("a").live("mouseleave", function(){
        
        $(this).stop(true);
        
        $(this).animate({
            opacity: 1
        }, 300 );
        
    });*/
    
    
    if(navigator.userAgent.search("Chrome") != -1)//Chrome only
    {
       //$('#masthead-search-term').blur();
    }
    if(navigator.userAgent.search("Firefox") != -1)//Firefox only
    {
       
    }
        
        
     
    
    document.getElementById('masthead-nav').innerHTML += "<span class=\"masthead-link-separator\">|</span> <a href=\"\">Settings</a>";
    
    
    
    
    
    var arr = document.getElementsByClassName("feed-item-visual-thumb");
    var vidId = $(".feed-container .title");
    var AllComments = $(".feed-container .metadata .yt-user-name");
    var UserNamesPmIcons = $(".feed-item-owner .yt-user-name");
    var GridIcon = $(".feed-header-thumb");
    
    var CuSizeOfWinX = 765;
    var CuSizeOfWinY = 530;
    var CuGeneralPadding = 10;
    var CuTopPadding = 25;
    
    var CuSizeOfPmWinX = 300;
    var CuSizeOfPmWinY = 400;
    
    
    /*Extended pin menu stuff*/
    var CuPin = $(".subscription-options");
    
    if(document.URL.search("subscription_manager") != -1)
    {
        
        for(var dd = 0; dd < CuPin.length; ++dd)
        {
           CuPin[dd]./*$(".subscription-pin").*/innerHTML += "<a class=\"subscription-pin\" title=\"Pin on the homepage plus\" data-tooltip-text=\"Pin on the homepage\"><img src=\"" + CuPinImage + "\"/></a>";
        }
    }
    
    
    /*Set save variables if not yet set*/
    if(localStorage.getItem("Row") == null)//Check if sidebar is hidden or not.. If it's null, set it to 1
    {
       localStorage.setItem("Row", "1");
    }
    
    
    
    /*Hide/Show sidebar*/
    if(localStorage.getItem("ShowingSidebar") == null)//Check if sidebar is hidden or not.. If it's null, set it to 1
    {
       localStorage.setItem("ShowingSidebar", "1");
    }
    
    if(localStorage.getItem("ShowingSidebar") == 1)
    {
       $("#feed-main-all, #feed-background").css("width", "465px");
       $("#video-sidebar").css("width", "300px");
       $("#video-sidebar").css("opacity", "1");
    }
    if(localStorage.getItem("ShowingSidebar") == 0)
    {
       $("#feed-main-all, #feed-background").css("width", "765px");
       $("#video-sidebar").css("width", "0px");
       $("#video-sidebar").css("opacity", "0");
    }
    
    //$(".feed-header-subscribe .thumb")[0].innerHTML += "hej";
    var Element = document.createElement('span');
    Element.innerHTML = "<span id=\"CuHideShowSidebar\" style=\"float: right; cursor: pointer; padding: 4px; margin: -4px; margin-left: -8px; background: rgba(255,255,255, 0.16); -webkit-border-radius: 4px; -moz-border-radius: 4px; border: 1px solid rgba(0,0,0, 0.07); display: block;\"><</span>";
    document.getElementById("masthead_child_div").appendChild(Element);
    //$("#masthead_child_div").css("padding-bottom", "6px");
    
    
    $("#CuHideShowSidebar").click(function(event) {
    
        //event.preventDefault();
        
        $("#video-sidebar *").css("white-space", "nowrap");
        
        if(localStorage.getItem("ShowingSidebar") == 1)
        {
            $("#video-sidebar").stop(true);
            $("#feed-main-all, #feed-background").stop(true);
            
            $("#video-sidebar").animate({
                opacity: 0,
                width: "0px"
            }, 350, function() {
                
                $("#feed-main-all, #feed-background").animate({
                    width: "765px"
                }, 350);
                
                localStorage.setItem("ShowingSidebar", "0");
                if(localStorage.getItem("Row") == 0)
                {
                    $("#feed-main-all .feed-item-container").css("width", "230px");
                }
                
            });
        }
        else if(localStorage.getItem("ShowingSidebar") == 0)
        {
           
            $("#video-sidebar").stop(true);
            $("#feed-main-all").stop(true);
            
            $("#feed-main-all, #feed-background").animate({
                width: "465px"
            }, 350, function() {
                
                $("#video-sidebar").animate({
                opacity: 1,
                width: "300px"
                }, 350);
                
                localStorage.setItem("ShowingSidebar", "1");
                if(localStorage.getItem("Row") == 0)
                {
                    $("#feed-main-all .feed-item-container").css("width", "200px");
                }
                
            });
        }
         
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /*Format of the PM page*/
    
    if(document.URL.search("inbox") != -1 && document.URL.search("#CuPm") != -1 && document.URL.search("to_users") != -1)
    {
       //alert("hejsan");
        
        document.body.style.overflow = "hidden";
        
        document.getElementById("masthead-container").style.display = "none";
        document.getElementById("footer-container").style.display = "none";
        
        document.getElementById("yt-admin-sidebar").style.display = "none";
        document.getElementById("folder_title").style.display = "none";
        document.getElementById("folder_title").style.display = "none";
        
        document.getElementById("compose_from").style.display = "none";
        
        
        document.getElementById("composeform").style.width = "500px";
        document.getElementById("yt-admin-content").style.left = "0";
        document.getElementById("yt-admin-content").style.top = "0";
        
        document.getElementById("field_reference_video").style.display = "none";
        
        document.getElementById("compose_message").style.height = "200px";
        document.getElementById("yt-admin").style.width = "754px";
        document.getElementById("yt-admin").style.marginTop = "-25px";
                
        document.getElementById("baseDiv").style.width = "100%";
        document.getElementById("inbox_send_message").style.marginLeft = "-430px";
        
        $(".yt-alert-promo").css("display", "none");
        $(".compose_header").css("display", "none");
        $(".compose_input").css("width", "255px");
        
        
    }
    
    
    
    /*var cuf = $('#CuFrame').attr('src');*/
    
    /**Grid icon and row icon stuff***/
    GridIcon[0].innerHTML += "<img class=\"feed-header-icon all\" src=\"" + CuGridImage + "\" style=\"padding-right: 6px;\"/>";
    $(".feed-header-thumb img").live("click", function(){
     
        if($(this).attr('src') != CuGridImage)
        {
            /*Save setting to be row, and set css accordingly*/
            
            $("#feed-main-all .feed-container").animate({
                opacity: 0
            }, 350, function(){
            
                $("#feed-main-all .feed-item-container").css("display", "inline");
                $("#feed-main-all .feed-item-container").css("width", "100%");
                $("#feed-main-all .feed-item-container").css("height", "114px");
                $("#feed-main-all .feed-item-visual").css("height", "114px");
                $("#feed-main-all .feed-item-visual-thumb").css("display", "inline");
                
                
                $("#feed-main-all .feed-item-visual-content").css("margin-top", "0px");
                $("#feed-main-all .feed-item-visual-content").css("position", "static");
                $("#feed-main-all .feed-item-visual-content").css("margin-left", "-10px");
                $("#feed-main-all .description").css("display", "inline");
                
                $("#feed-main-all .feed-container").animate({
                opacity: 1
                }, 350);
                
            });
            
        }
        else
        {
            //alert("This is the grid icon");
            
            $("#feed-main-all .feed-container").animate({
                opacity: 0
            }, 350, function(){
            
                $("#feed-main-all .feed-item-container").css("display", "inline-table");
                $("#feed-main-all .feed-item-container").css("width", "230px");
                $("#feed-main-all .feed-item-container").css("height", "230px");
                $("#feed-main-all .feed-item-visual").css("height", "200px");
                $("#feed-main-all .feed-item-visual-thumb").css("display", "block");
                
                
                $("#feed-main-all .feed-item-visual-content").css("margin-top", "100px");
                $("#feed-main-all .feed-item-visual-content").css("position", "absolute");
                $("#feed-main-all .feed-item-visual-content").css("margin-left", "-10px");
                $("#feed-main-all .description").css("display", "none");
            
            $("#feed-main-all .feed-container").animate({
                opacity: 1
                }, 350);
                
            });
        }
    });
    
    
    
    
    
    
    
    
    for(var dd = 0; dd < arr.length; ++dd)
    {
        //arr[dd].innerHTML += "<span style=\"float: left !important; cursor: pointer; position: absolute; margin-top: -30px;\" onmousedown=\"document.body.style.overflow = 'hidden'; document.getElementById('CuOverlay').style.display = 'inline'; document.getElementById('CuFrame').src = '" + "http://www.youtube.com/embed/" + vidId[dd].href.slice(31, 42) + "?rel=0&controls=0&autoplay=1" + "';\">Quick view</span>";
        AllComments[dd].innerHTML +=  "<a href=\"http://www.youtube.com/all_comments?v=" + vidId[dd].href.slice(31, 42) + "\">Comments</a>";
        
    }
    
    
    /*A window used for a quick PM sending thing.*/
    document.getElementById("masthead-container").innerHTML += "<div style=\" display: none; position: absolute; z-index: 20; left: 0px; top: 0px; width: " + CuSizeOfPmWinX + "px; height: " + CuSizeOfPmWinY + "px; background: #000000; -webkit-box-shadow: 0 3px 13px rgba(0,0,0, 0.5); -moz-box-shadow: 0 3px 13px rgba(0,0,0, 0.5);\" id=\"CuPmWin\"><iframe id=\"CuPmWinFrame\" width=\"100%\" height=\"100%\" src=\"\"></iframe></div>";
    for(var dd = 0; dd < UserNamesPmIcons.length; ++dd)
    {
        $(".feed-item-owner")[dd].innerHTML += "<img class=\"CuPm\" src=\"" + CuMailImage + "\" style=\"float: right; cursor: pointer;\" title=\"Send a PM to this user\"/>";
    }
    
/*

<iframe width="560" height="315" src="http://www.youtube.com/embed/OADkgY4Kx1c?rel=0" frameborder="0" allowfullscreen></iframe>

*/

    
    
    
    /*This one should be a live element later. To be able to apply this to anything else that loads as well.*/
    $(".feed-container .feed-item-visual-thumb .clip img").click(function(event) {
    
        event.preventDefault();
        //alert($(this).attr('src'));
    
        //document.body.style.overflow = 'hidden';//This one should be applied only to the fullscreen quick watch mode.
        
        //document.getElementById('CuOverlay').style.display = 'inline';
        //document.getElementById('CuFrame').src = "http://www.youtube.com/embed/" + $(this).attr('src').slice(18, 30) + "?rel=0&controls=1&autoplay=1"
    
        //alert("http:" + $(this).attr('src'));
        
        var CuThisOne = $(this);
        
            //The temporary picture effect when clicking on a quick view link.
            document.getElementById('footer-links-primary').innerHTML = "<img id=\"CuTempPic\" style=\"opacity: 0.3; position: fixed; top:" + ($(this).offset().top-$(window).scrollTop()) + "px; left:" + $(this).offset().left + "px; z-index: 10;\" width=\"" + $(this).width() + "\" height=\"" + $(this).height() + "\" src=\"http:" + $(this).attr('src') + "\"/>";
        
        
        $("#CuTempPic").stop(true);
        
        $("#CuTempPic").animate({
            opacity: 1,
            width: CuSizeOfWinX,
            height: CuSizeOfWinY,
            left: (($(window).width()/2)-(CuSizeOfWinX/2))+2,
            top: (($(window).height()/2)-(CuSizeOfWinY/2))+9
        }, 300, function()
                                {
                                    
                                    document.getElementById('CuOverlay').style.display = 'inline';
                                    document.getElementById('CuOverlay').style.opacity = '0';
    
                                    $("#CuOverlay").animate({
                                        opacity: 1
                                    }, 300, function() { document.getElementById('CuFrame').src = "http://www.youtube.com/embed/" + CuThisOne.attr('src').slice(18, 30) + "?rel=0&controls=1&autoplay=1"; });
                                }
                               );
            
    });
    
    /*Full screened one*/
    
    //document.getElementById('footer-logo').innerHTML = "<span id=\"CuOverlay\" style=\"display: none; width: " + $(window).width() + "px; height: " + $(window).height() + "px; position: fixed; left: 0px; top: 0px; z-index: 10; background: #000000; \"><iframe id=\"CuFrame\" width=\"" + $(window).width() + "\" height=\"" + ($(window).height()-20) + "\" style=\"margin-top: 20px;\" src=\"\" frameborder=\"0\" allowfullscreen></iframe><div id\"cuxbutton\" style=\"position: absolute; right: 10px; top: 1px; z-index: 1; color: #ffffff; cursor: pointer;\" onmousedown=\"document.getElementById('CuOverlay').style.display = 'none'; document.getElementById('CuFrame').src = ''; \">X</div></span>";
    
    
    /*Windowed one*/
    
    document.getElementById('footer-logo').innerHTML = "<span id=\"CuOverlay\" style=\"display: none; width: " + CuSizeOfWinX + "px; height: " + CuSizeOfWinY + "px; position: fixed; left: " + (($(window).width()/2)-(CuSizeOfWinX/2)-CuGeneralPadding) + "px; top: " + (($(window).height()/2)-(CuSizeOfWinY/2)-CuGeneralPadding-((CuTopPadding-CuGeneralPadding)/2)) + "px; z-index: 10; background: #f9f9f9; padding:" + CuGeneralPadding + "px; padding-top:" + CuTopPadding + "px; -webkit-box-shadow: 0 2px 15px rgba(0,0,0, 0.4); -moz-box-shadow: 0 2px 15px rgba(0,0,0, 0.4); -webkit-border-radius: 4px; -moz-border-radius: 4px; border: 1px solid #afafaf; border-bottom-color: #999999; \"><iframe id=\"CuFrame\" width=\"" + CuSizeOfWinX + "\" height=\"" + CuSizeOfWinY + "\" style=\"margin-top: 0px;\" src=\"\" frameborder=\"0\" allowfullscreen></iframe><div id=\"cuxbutton\" style=\"position: absolute; right: 10px; top: 1px; z-index: 1; color: #888; font-size: 16px; font-family: arial; padding: 3px 10px 3px 10px; border-left: 1px solid #cccccc; border-right: 1px solid #cccccc; cursor: pointer;\" >X</div></span>";
    
    
    
    $("#cuxbutton").live("click", function(){
        
        document.getElementById('CuFrame').src = '';
        
        /*$("#CuOverlay").animate({
            opacity: 0,
            width: CuSizeOfWinX/2,
            height: CuSizeOfWinY/2,
            left: CuSizeOfWinX/2,
            top: CuSizeOfWinY/2
        }, 1000, function(){
        */
        document.getElementById('CuOverlay').style.display = 'none';
        document.getElementById('CuTempPic').style.display = 'none';
        //});
    });
    
    
    /*Compose PM action*/
    $(".CuPm").live("click", function(){
    
        //alert(UserNamesPmIcons[$(this).index(".CuPm")].href.slice(28, UserNamesPmIcons[$(this).index(".CuPm")].href.length-12));
        
        //alert($(this).offset().top);
        
        document.getElementById("CuPmWinFrame").src = "http://www.youtube.com/inbox?to_users=" + UserNamesPmIcons[$(this).index(".CuPm")].href.slice(28, UserNamesPmIcons[$(this).index(".CuPm")].href.length-12) + "&action_compose=1#CuPm";
        document.getElementById("CuPmWin").style.display = "inline";
        document.getElementById("CuPmWin").style.top = $(this).offset().top + "px";
        document.getElementById("CuPmWin").style.left = ($(this).offset().left+40) + "px";
        
        //CuPmWinFrame
        
        //http://www.youtube.com/inbox?to_users=JoshJepson&action_compose=1
        //document.URL
    
    });
    
    //alert(document.URL.search("inbox"));
    
    
    
    
    
});
