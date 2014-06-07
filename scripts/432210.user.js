// ==UserScript==
// @name        SomethingAwful Extended Buttons
// @namespace   ubergnu
// @description Somethingawful forums: Extends the row of buttons below each post with new functions such as: hide buttons, hide/show posts, dim/hide/stop avatars.
// @include     http://forums.somethingawful.com/*
// @version     1.3
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

// This is global because GM_getValue() is borked in events
var avatarState;

// Some UI values
var BUTTON_TEXT_COLOR = "#444444";
var BUTTON_TEXT_COLOR_ACTIVE = "#DDDDDD";
var BUTTON_BACKGROUND = "";
var BUTTON_BACKGROUND_ACTIVE = "#666666";
var ELEM_VISIBLE = 1;
var ELEM_HIDDEN = 0;
var ELEM_DIMMED = 0.3;


// Fetch the jQuery function if it's not there already
//
var $;
if (typeof($) === 'undefined')
    $ = unsafeWindow.jQuery;


// Add Menu buttons
//
$("#content #thread .profilelinks").append("<li></li>");
$("#content #thread .profilelinks").append("<li class='liStop btnStop'>Stop</li>");
$("#content #thread .profilelinks").append("<li class='liStop btnText'>Title</li>");
$("#content #thread .profilelinks").append("<li class='liStop btnFold'>Fold</li>");
$("#content #thread .profilelinks").append("<li class='liStop btnFade'>Avs</li>");
$("#content #thread .profilelinks").append("<li class='liStop btnCtrl'>Buts</li>");


// Hide/show Report/Quote buttons depending on settings
//
if (GM_getValue("SA_reportButtons", false))
    $(".postlinks .postbuttons").children().animate({opacity: ELEM_VISIBLE});
else
    $(".postlinks .postbuttons").children().animate({opacity: ELEM_HIDDEN});


// Hide/show avatars depending on settings
//
avatarState = GM_getValue("SA_avatars");
switch(avatarState)
{
    case "on":
        $(".title img").animate({opacity: ELEM_VISIBLE});
       GM_setValue("SA_avatars", "on");    
       break;
    case "off":
        $(".title img").animate({opacity: ELEM_HIDDEN});
       GM_setValue("SA_avatars", "off");    
       break;
    case "dim":
        $(".title img").animate({opacity: ELEM_DIMMED});
       GM_setValue("SA_avatars", "dim");    
       break;
    default:
        $(".title img").animate({opacity: ELEM_VISIBLE});
       GM_setValue("SA_avatars", "on");    
       break;
}


// Stop avatar animations if set
//
if (!GM_getValue("SA_animations", true))
{
    var avs = $(".title img");
    for(i=0; i<avs.length; i++)
        setFirstFrame(avs[i])
}    


// -------------------------------------------
// Menu button functions

// Hide the whole user Title (avatar+text+tags)
$(".postlinks ul .btnText").click(function(){
    var userTitle = $(this).parent().parent().parent().parent().find(".userinfo .title");
    var opa;

    if (avatarState == "on"){ opa = ELEM_VISIBLE; }
    else if(avatarState == "dim"){ opa = ELEM_DIMMED; }
    else if(avatarState == "off"){ opa = ELEM_HIDDEN; }
    
    if (userTitle.css('opacity') == ELEM_HIDDEN) {
       userTitle.animate({ opacity: opa });
    }else{
       userTitle.animate({ opacity: ELEM_HIDDEN });
    }
    
});


// Stop avatar animations
$(".postlinks ul .btnStop").click(function(){
    var avs = $(".title img");
    for(i=0; i<avs.length; i++)
        setFirstFrame(avs[i])
    gmSetValue("SA_animations", false);
});


// Toggle visibility for report/quote buttons
//
$(".postlinks ul .btnCtrl").toggle(
    function(){
        $(".postlinks .postbuttons").children().animate({opacity: ELEM_VISIBLE});
        gmSetValue("SA_reportButtons", true);
    }, function(){
        $(".postlinks .postbuttons").children().animate({opacity: ELEM_HIDDEN});
        gmSetValue("SA_reportButtons", false);
    }
);


// Toggle dim/hide/show all avatars
//
$(".postlinks ul .btnFade").click(function(){
    if (avatarState == "on"){
       $(".title img").animate({opacity: ELEM_DIMMED});
       $(".title canvas").animate({opacity: ELEM_DIMMED});
       gmSetValue("SA_avatars", "dim");
       avatarState = "dim";
    }
    else if(avatarState == "dim"){
       $(".title img").animate({opacity: ELEM_HIDDEN});
       $(".title canvas").animate({opacity: ELEM_HIDDEN});
       gmSetValue("SA_avatars", "off");
       avatarState = "off";
    }
    else if(avatarState == "off"){
       $(".title img").animate({opacity: ELEM_VISIBLE});
       $(".title canvas").animate({opacity: ELEM_VISIBLE});
       gmSetValue("SA_avatars", "on");
       avatarState = "on";
    }
});


// Hide/show posts
//
$(".postlinks ul .btnFold").click(function () {
    $(this).parent().parent().parent().prev().children().last().slideToggle(100);
    $(this).parent().parent().parent().prev().children().first().children().first().children().slideToggle(500);

});

// Menu buttons layout 
//
var li = $(".postlinks .liStop");

li.css({
    "border-radius": "6px",
    "padding": "3px",
    "cursor": "pointer",
     "color": BUTTON_TEXT_COLOR
});


li.hover( 
    function(){
       $(this).css("background-color", BUTTON_BACKGROUND_ACTIVE);
        $(this).css("color", BUTTON_TEXT_COLOR_ACTIVE);   
    }, function() {
        li.css("background-color", BUTTON_BACKGROUND);
        li.css("color", BUTTON_TEXT_COLOR);   
    }
);


// These might be annoying. Hide avatar on mouseover(), restore them on click()
//

// Hide avatar on mouseover()
//
$(".title img").mouseover(function () {
    $(".title img[src$='" + $(this).attr("src") + "']").animate({opacity: ELEM_HIDDEN});
});

// Show avatar on click()
//
$(".title img").click(function () {
    var url = $(this).attr("src");
    $(".title img[src$='" + url + "']").animate({opacity: ELEM_VISIBLE});
});


// -------------------------------------------
// Misc stuff
// -------------------------------------------

// Stop avatar animations
//
function setFirstFrame (img) {
	replaceImg(img, function() {
        var newCanvas = document.createElement("canvas");
        newCanvas.height = img.height;
        newCanvas.width = img.width;
        
        newCanvas.id = "cnvAv";
        
        newCanvas.getContext("2d").drawImage(img, 0, 0);
	   img.parentNode.replaceChild(newCanvas, img);

        if (avatarState == "on")
           $(newCanvas).animate({opacity: ELEM_VISIBLE});

        else if(avatarState == "dim")
           $(newCanvas).animate({opacity: ELEM_DIMMED});
        
        else if(avatarState == "off")
           $(newCanvas).animate({opacity: ELEM_HIDDEN});
	});
};

function replaceImg (img, ref) {
	img.onload = ref;
	img.src += '#';
};


// Workaround for getting/setting values from inside an event
//
function gmSetValue(key, val)
{
    setTimeout(function() {
       GM_setValue(key, val);    
    }, 0);
}

function gmGetValue(key, defaultval)
{
    setTimeout(function() {
       avatarState = GM_getValue(key, defaultval);    
    }, 0);
    
    return avatarState;
}

