// ==UserScript==
// @name       Ingress Intel Direct Links
// @namespace  http://none/
// @version    0.3
// @description  Ingress Intel Direct URL Links
// @match      http://www.ingress.com/intel*
// @copyright  2012+, Adam Thompson
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
// Create map and geocoder objects


// This will hide the "Map" box in the upper left corner.
// Just hiding it to make some more room on smaller displays.
// Comment the following line if you with to see this useless element.
// 1 = hide element
// 0 = show element
var IIDL_Hide_Map_Element = 1;

// This will hide the "Investigation" link in the upper left.
// If you wish to hide this and make more room uncomment the following line.
// 1 = hide element
// 0 = show element
var IIDL_Hide_Investigation_Element = 0;

// ADD SOME CUSTOM CSS CLASS BLOCKS.
GM_addStyle("#xm {float:left;width:334px;margin-left:0px;border:1px solid #ebbc4a;border-top:0px solid transparent;}\
#xm .iidl_user_stats {padding:1px 3px;font-family:verdana;background: -moz-linear-gradient(top,  rgba(0,0,0,1) 1%, rgba(0,0,0,0.5) 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(1%,rgba(0,0,0,1)), color-stop(100%,rgba(0,0,0,0.5)));background: -webkit-linear-gradient(top,  rgba(0,0,0,1) 1%,rgba(0,0,0,0.5) 100%);background: -o-linear-gradient(top,  rgba(0,0,0,1) 1%,rgba(0,0,0,0.5) 100%);background: -ms-linear-gradient(top,  rgba(0,0,0,1) 1%,rgba(0,0,0,0.5) 100%);background: linear-gradient(to bottom,  rgba(0,0,0,1) 1%,rgba(0,0,0,0.5) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#80000000',GradientType=0 );}\
.iim-all-chat-input {background-color: rgb(33, 0, 0) !important; border: 1px solid rgb(255, 0, 0); box-shadow: inset 0 -5px 10px rgba(255, 0, 0, 0.4); -webkit-box-shadow: inset 0 -5px 10px rgba(255, 0, 0, 0.4); color: rgb(255, 0, 0);}\
.iim-global_score {margin:2px; margin-left:0px;}\
");

function updateiim_url()
{
    var lat = Math.round(getiimCookie('ingress.intelmap.lat') * 1e6);
    var lng = Math.round(getiimCookie('ingress.intelmap.lng') * 1e6);
    var zoom = getiimCookie('ingress.intelmap.zoom');
    
    if (!$("#iim-url").is(":focus")){
        $("#iim-url").val('http://www.ingress.com/intel?latE6='+lat+'&lngE6='+lng+'&z='+zoom);
    }
    
    setTimeout(function(){ updateiim_url(); }, 3000 );
}

function getiimCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
    }
}

function updateiim_user_stats(){
    var playerLevel = parseInt($('#player_level').html());
    var ap = parseInt($('#ap span.number').html());
    var currAp = ap;
    if (playerLevel<8){
	    var apNeeded = parseInt($('#ap .number:last').html())/2;
        var ap = ap - apNeeded;
	    var levelPercent = ' (<span class="color_orange">'+ (100-((ap/apNeeded)*100)).toFixed(1) +'% to go!</span>)';
    } else {
        var apNeeded = 0; var levelPercent = ""
    }
    var XmHtml = $('#xm').html();
    var newXmHtml = '<div class="iidl_user_stats"><span>AP: '+addCommas(currAp)+levelPercent+'</span><div style="float:right;">'+XmHtml+'</div></div>';
    $('#xm').html(newXmHtml);
}

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function iim_init(){
    
    // INIT THE CHANGES TO THE CHAT INPUT BOX.
    // THIS WILL COLOR IT DEPENDING ON IF YOU ARE ON 'ALL' OR 'FACTION' CHAT.
    var MY_FACTION = $('#player_stats > :last').attr('class');
    $('#send_plext_form #message').addClass('global_score iim-all-chat-input iim-global_score');
    $('#pl_tab_fac').click(function(){ $('#send_plext_form #message').removeClass('iim-all-chat-input').addClass(MY_FACTION); });
    $('#pl_tab_all').click(function(){ $('#send_plext_form #message').removeClass(MY_FACTION).addClass('iim-all-chat-input'); });
    
    // APPLY THE USER STATS BELOW THE 'XM' BAR.
    updateiim_user_stats();
}

$(document).ready(function(){
    
    if(IIDL_Hide_Map_Element==1){$("div.nav_link:contains('Map')").hide();}
    if(IIDL_Hide_Investigation_Element==1){$("div.nav_link:has(a:contains('Investigation'))").hide();}
    
    $("div#nav > div.nav_link:not(.selected)").after('<input id="iim-url" READONLY type="text" value="Loading....." />');
    $("#iim-url").attr('style','font-size:95%;height:27px;font-family:verdana;');
    $("#iim-url").width(475);
    $("#iim-url").click(function(){ $(this).select(); });
    //$('#send_plext_form input#message').addClass('iim-input-message-all')
    
    setTimeout(function(){ iim_init(); }, 4000 );
    setTimeout(function(){ updateiim_url(); }, 6000 );
    
});
