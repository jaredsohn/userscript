// ==UserScript==
// @name           Facebook Page Cleaner
// @version        1.4
// @author         Habna
// @description    Hide annoying Facebook ads, sidebar, dock, chat & page footer. It also expands the content area
// @description    and re-arrange some stuff for a cleaner view. Can also hide Facebook bluebar. Uncomment line 19
// @grant          none
// @include        http://www.facebook.*
// @include        https://www.facebook.*
// @require        http://code.jquery.com/jquery-1.8.0.min.js
// @downloadURL    https://userscripts.org/scripts/source/139768.user.js
// @updateURL      https://userscripts.org/scripts/source/139768.meta.js
// @run-at         document-end
// ==/UserScript==

var gc = document.getElementById("globalContainer");

//Hide blue bar
//$("#blueBarHolder").remove();

//Re-arrange stuff in the left section
var t = $("#leftCol"); if (t) { t.css("padding-top","10px"); } //Remove a bit of space at top of left col
var t = $("#pagelet_welcome_box"); if (t) { t.css("padding-left","5px"); } //Move a bit right Pic & Name
var t = $(".navHeader"); if (t) { t.css("padding-left","4px"); } //Move a bit text header to right
var t = $("a.moreSectionsLink"); if (t) { t.css("padding-left","4px"); } //Move a bit "Plus" link to right

//Hide dock
$("#pagelet_dock").remove();

//Hide chat
$("#pagelet_chat").remove();

//Clean Facebook Page function
var CleanFBP = function(){
    //Re-arrange blueBar items a bit
    var t = $("#pageHead"); if (t) { t.css("margin","0px").css("padding-left","10px").css("width",parseInt($("#globalContainer").css("width"))-10); }
    var t = $("#blueBar"); if (t) { t.css("min-width","0px"); }
    var t = $("#headNav"); if (t) { t.css("width",parseInt($("#globalContainer").css("width"))-10).css("margin-left","0px"); }
    
    //Hide sidebar
    $("#pagelet_sidebar").remove();

    //Hide page footer
    $("#footerContainer").empty();

    //Hide ads
    $("#rightCol").remove();
    
    //Re-arrange top section
    var t = $("#pagelet_composer"); if (t) { t.css("margin-left","-18px"); }
    
    //Expands & Re-arrange stuff to have a small gap in front of the line (like at the end of the line)
    var t = $("#globalContainer"); if (t) { t.css("width","100%").css("padding-right","0px"); }
    var t = $("#contentCol"); if (t) { t.css("padding-top","0px").css("padding-left","18px"); }
    var t = $("#contentArea"); if (t) { t.css("width","98%").css("padding-left","10px").css("padding-right","0px"); }
    var t = $("li.uiUnifiedStory"); if (t) { t.css("padding-left","0px"); }
    
    //Shrink story content a bit so the right box with the down arrow is not overlaping the feed border
    var t = $(".storyContent"); if (t) { t.css("width","98%"); }
    
    //Expand stuff in feed
    //var t = $(".shareRedesign"); if (t) { t.css("width","100%"); }
    //var t = $(".uiList.uiUfi.focus_target.fbUfi.fbUfiNoBorder"); if (t) { t.css("width","100%"); }
    //var t = $(".ogAggregationListContainer"); if (t) { t.css("width","100%"); }

    //Hide element "Vu/see" when someone chat
    var t = $(".shareRedesign");
    if (t) {
        //$(".-cx-PRIVATE-mercuryTypingIndicator__root\\.seen").css("visibility","hidden");
        $(".-cx-PRIVATE-mercuryTypingIndicator__icon").css("visibility","hidden");
        $(".-cx-PRIVATE-mercuryTypingIndicator__text").css("visibility","hidden");
    }
    
    //Re-arrange stuff in the photo.php page
    var t = $(".UIStandardFrame_SidebarAds");
    if (t) {
        $(".UIStandardFrame_SidebarAds").remove();
        $("#pagelet_ego_pane").remove();
        $(".UIStandardFrame_Content").css("width","100%"); //Expand content
        $(".fbPhotoPageInfo").css("width","100%"); //Expand content
        $(".fbPhotoContributor").css("width","100%"); //Expand content
        
        //theater type
        $(".rhcBody").css("height","90%"); //Expand content
        $(".rhcScroller").css("height","100%"); //Expand content
        $(".rhcFooter").remove();
    }
        
    //Re-arrange stuff in bookmarks "Apps list" & "Friend list" pages
    var t = $("#pagelet_bookmark_seeall");
    if (t) {
        t.css("margin-left","-15px").css("margin-bottom","-20px"); //Remove a bit of space in front and at bottom
        $(".uiHeader").css("padding-bottom","10px"); //Remove a bit of space at bottom of header
    }
    
    //Hide & re-arrange stuff when chatting with a friend in "message" page
    var t = $("#MessagingFrame");
    if (t) {
        t.css("width","100%"); //Expand messaging frame
        $("#MessagingNetegoWrapper").css("visibility","hidden").css("width","0px").css("height","0px"); //Hide sponsor
        $("#MessagingFrame").css("margin-top","15px"); //Change top margin of messaging frame to replace Top section
        $("#MessagingMainContent").css("width","100%").css("margin-left","-10px"); //Expand & replace content area
        $(".MessagingReadHeader").css("width",$("#MessagingFrame").css("width")).css("margin-left","-10px"); //Expand & replace top section
        $(".MessagingReadHeader").css("height","38px").css("padding-top","5px"); //Shrink & change top padding of top section
        $(".MessagingReadHeader").css("border-bottom-width","1px").css("border-bottom-style","solid").css("border-bottom-color","lightGrey"); //Add bottom border width, style, color to top section
        $("#MessagingContentWrapper").css("margin-top","25px"); //Hide the top line
        $(".content.noh.direction_ltr").css("width","100%"); //Expand text area
        $("p").css("max-width",parseInt($(".content.noh.direction_ltr").css("width"))); //Expand text area max width
        
        //Expand the writing section
        $("#MessagingShelf").css("width",$("#MessagingFrame").css("width")); //Expand grey section
        $("#MessagingShelfContent").css("padding-bottom","0px"); //Shrink grey section
        $("#MessagingInlineComposer").css("padding-left","0px"); //Replace text box in grey section to left by removing padding
        $(".MessagingComposerForm").css("max-width","none"); //Remove max width to allow to expand
        $("textarea").css("max-width","none"); //Remove max width to allow to expand text box
        $("#MessagingComposerOptions").css("max-width","none"); //Remove max width to allow to move options with text box expand
    }
    
    //Re-arrange top box in "Friends", "Photos", "Map", "About Me" & "Events" pages
    var t = $("#pagelet_main_column_personal");
    if (t) {
        t.css("width",parseInt($("#headNav").css("width"))-46); //Expand page container
        $(".stickyHeaderWrap").css("width",parseInt($("#pagelet_main_column_personal").css("width"))-2); //Expand top box
        $(".back").css("width","100%"); //Expand top box background
        //$("#pageFooter")t.css("width","100%"); //Bottom line
        // or
        //$("#contentCurve").css("visibility","hidden"); //Bottom line
    }
    
    //Re-arrange stuff in "Info" page
    var t = $(".aboutMePagelet");
    if (t) {
        $(".aboutMeMain").css("width","49%"); //Expand left section
        $(".aboutMeRight ").css("width","49%"); //Expand right section
        $(".profileInfoTable").css("width",parseInt($(".fbTimelineAboutMeHeader").css("width"))); //Expand yearly section
        $(".fbProfileBylineLabel").css("width","95%"); //Expand line
        $(".label").css("width","25%"); //Expand label
    }
    
    //Re-arrange stuff in "favorites" page
    var t = $("#pagelet_all_favorites");
    if (t) {
        //$(".uiInfoTable").css("width",parseInt($(".fbTimelineAboutMeHeader").css("width"))-81); //Expand table
        $(".mediaRowRevealer").css("left",parseInt($("#pagelet_main_column_personal").css("width"))-386); //Replace the "More element"
    }
    
    //Re-arrange stuff in "media" page
    var t = $("#album_header_pagelet");
    if (t) {
        t.css("width","98%"); //Expand header
        $(".fbPhotosGrid").css("width","100%"); //Expand album table
        $(".fbxPhotoSetPageMetadata").css("width","100%"); //To be able the expand text area
        $(".UFIContainer").css("width","100%"); //Expand text area
    }
        
    //Re-arrange stuff in the personnal page - Work in progress
    var t = $("#fbProfileCoverLarge");
    if (t) {
        $("#fbTimelineNavTopRow").css("width","70%"); //Resize top section
        $(".seemore").css("left","97%"); //Replace the "More element"
        //$(".topSectionBottomBorder").css("width",$("#fbProfileCover").css("width")); //Resize bottom border of top section - IMPOSSIBLE it an image
        
        //$(".topBorder").css("width","100%"); //Resize top border - IMPOSSIBLE it an image
        //$(".bottomBorder").css("width","100%"); //Resize bottom border - IMPOSSIBLE it an image
        $(".timelineUnitContainer").css("width",Math.floor(parseInt($("#pagelet_main_column_personal").css("width"))/2-46)); //Resize unit class
        $(".timelineUnitContainer").css("margin-left","0px");
        //$(".timelineReportContainer").css("width",parseInt($(".timelineUnitContainer").css("width"))); //Resize report unit class
        $(".photoUnit").css("margin-left","0px"); //Replace photo
        
        //fbTimelineComposerCapsule
        $(".fbTimelineComposerUnit").css("width",parseInt($(".timelineUnitContainer").css("width"))+20); //Resize composer unit class
        
        //recentActivityContainer
        $(".recentActivityUnit").css("width",parseInt($(".timelineUnitContainer").css("width"))-20); //Resize recent activity unit class
        $(".timelineRecentActivityTextBlock").css("width","80%"); //Resize recent activity text block
        
        //Story container
        $(".listItem").css("max-width","none"); //Remove max width
        $(".uiScrollableArea").css("width","100%"); //Resize area
        $(".uiScrollableAreaBody").css("width","100%"); //Resize area body
        $(".uiScrollableAreaTrack").css("right","-12px"); //Replace scroll
        $(".uiCommentContainer").css("margin-left","0px").css("width","100%"); //Resize & replace comment container
        
        //timelineReportContainer
        $(".timelineReportContainer").css("width",parseInt($(".timelineUnitContainer").css("width"))+10); //Resize timelineReportContainer class
        $(".friendsBoxInner").css("width",$(".timelineReportContainer").css("width")); //Expand friends box
        $(".fbTimelineFriendsBoxLarge").css("margin-left","-15px"); //Replace photo
    }
}

//Below function happens whenever the contents of globalContainer change
if (gc){ gc.addEventListener("DOMSubtreeModified", CleanFBP, true); }

//fires off the function to start with
CleanFBP();