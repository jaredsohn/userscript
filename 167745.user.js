// ==UserScript==
// @name       	Steam Community Beta+
// @namespace  	http://jessecar96.net/
// @version     1.1
// @description Fixes horrid new steam profiles
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @match      	http://steamcommunity.com/id/*
// @match	http://steamcommunity.com/profiles/*
// @updateURL 	http://userscripts.org/scripts/source/167745.user.js
// @copyright   2013+, Jessecar96
// ==/UserScript==

var steamrep;

$(function(){
    
    /*--- Create a proper unsafeWindow object on browsers where it doesn't exist
    (Chrome, mainly).
    Chrome now defines unsafeWindow, but does not give it the same access to
    a page's javascript that a properly unsafe, unsafeWindow has.
    This code remedies that.
    */
    
    var bGreasemonkeyServiceDefined     = false;
    try {
        if (typeof Components.interfaces.gmIGreasemonkeyService === "object") {
            bGreasemonkeyServiceDefined = true;
        }
    }
    catch (err) {
        //Ignore.
    }
    
    if ( typeof unsafeWindow === "undefined"  ||  ! bGreasemonkeyServiceDefined) {
        unsafeWindow    = ( function () {
            var dummyElem   = document.createElement('p');
            dummyElem.setAttribute ('onclick', 'return window;');
            return dummyElem.onclick ();
        } ) ();
    }
    
    console.log(unsafeWindow.g_rgProfileData);
    var SteamID64 = unsafeWindow.g_rgProfileData['steamid'];
    var SteamID32 = profileToSteamID(SteamID64);
    
    // Add community sites to whitelisted domains
    unsafeWindow.g_whiteListedDomains.push("scrap.tf");
    unsafeWindow.g_whiteListedDomains.push("tf2b.com");
    unsafeWindow.g_whiteListedDomains.push("bazaar.tf");
    unsafeWindow.g_whiteListedDomains.push("google.com");
    unsafeWindow.g_whiteListedDomains.push("steamrep.com");
    unsafeWindow.g_whiteListedDomains.push("backpack.tf");
    unsafeWindow.g_whiteListedDomains.push("tf2r.com");
    unsafeWindow.g_whiteListedDomains.push("tf2ls.com");
    unsafeWindow.g_whiteListedDomains.push("tf2items.com");
    unsafeWindow.g_whiteListedDomains.push("tf2outpost.com");
    unsafeWindow.g_whiteListedDomains.push("tf2op.com");
    unsafeWindow.g_whiteListedDomains.push("jessecar96.net");
    unsafeWindow.g_whiteListedDomains.push("tf2wh.com");
    unsafeWindow.g_whiteListedDomains.push("marketplace.tf");
    unsafeWindow.g_whiteListedDomains.push("tf2scrap.com");
    unsafeWindow.g_whiteListedDomains.push("tf2stats.net");
    unsafeWindow.g_whiteListedDomains.push("sourceop.com");
    
    
    
    $(".profile_summary").html(unsafeWindow.g_rgProfileData['summary']);
    
    $(".header_real_name").prepend("<b>SteamID64:</b> "+SteamID64+"<br/><b>SteamID32:</b> "+SteamID32+"<br/><br/>");
    
    $(".profile_leftcol").prepend($(".profile_comment_area"))
   		 				 .prepend('<div class="profile-links"><div class="profile_recentgame_header profile_leftcol_header links-header"><h2>Community Links</h2><div class="links-container"></div></div>')
    					 .prepend('<div class="profile-links"><div class="profile_recentgame_header profile_leftcol_header links-header rep-header"><h2>Steam Reputation</h2><div class="reputation-content"></div></div>');
    
    $(".links-container").html("")
    .append("Backpack: <a target='_blank' href='http://tf2b.com/tf2/"+SteamID64+"'>TF2B</a> | <a target='_blank' href='http://backpack.tf/id/"+SteamID64+"'>backpack.tf</a> | <a target='_blank' href='http://tf2items.com/profiles/"+SteamID64+"'>TF2Items</a> | <a target='_blank' href='http://optf2.com/tf2/user/"+SteamID64+"'>OPTF2</a><br/>")
    .append("Trading: <a target='_blank' href='http://bazaar.tf/profiles/"+SteamID64+"'>bazaar.tf</a> | <a target='_blank' href='http://www.tf2outpost.com/user/"+SteamID64+"'>TF2 Outpost</a> | <a target='_blank' href='http://scrap.tf/profile?s="+SteamID64+"'>Scrap.TF</a><br/>")
    .append("Misc: <a target='_blank' href='http://steamrep.com/profiles/"+SteamID64+"'>SteamRep</a> | <a target='_blank' href='http://tf2ls.com/id/"+SteamID64+"/'>TF2LS</a> | <a target='_blank' href='http://tf2r.com/user/"+SteamID64+".html'>TF2R</a> | <a target='_blank' href='http://tf2stats.net/player/"+SteamID64+"'>TF2 Stats</a><br/>");
    
    $.ajax("https://steamrep.com/api/beta2/reputation/" + SteamID64 + "?json=1&extended=1",{
        dataType:"json"
        
    }).done(function( msg ) {
        steamrep = msg.steamrep;
        var fullrep = (steamrep.reputation.full=="") ? "No special reputation." : steamrep.reputation.full;
        unsafeWindow.steamrep = steamrep;
        $(".reputation-content").html("")
        						.append(fullrep);
        if(steamrep.reputation.full.indexOf("SCAMMER") != -1){
            $(".rep-header").css("background-color","rgba(255, 0, 0, 0.25)");
            $(".profile_header_bg_texture,.profile_content,.rep-header ").css("border","2px solid red");
            $(".profile_content").css("border-top","none");
        }else if(steamrep.reputation.full.indexOf("CAUTION") != -1){
            $(".rep-header").css("background-color","rgba(201, 129, 0, 0.25)");
        }else if(steamrep.reputation.full.indexOf("ADMIN") != -1){
			$(".rep-header").css("background-color","rgba(0, 201, 40, 0.25)");
        }else if(steamrep.reputation.full.indexOf("TRUSTED") != -1){
            $(".rep-header").css("background-color","rgba(0, 201, 177, 0.25)");
        }else if(steamrep.reputation.full.indexOf("MIDDLEMAN") != -1){
            $(".rep-header").css("background-color","rgba(0, 201, 177, 0.25)");
        }else if(steamrep.reputation.full.indexOf("DONATOR") != -1){
            $(".rep-header").css("background-color","rgba(0, 105, 201, 0.25)");
        }
    });
    
    $(".profile_summary_footer").remove();
    
    GM_addStyle(".profile_content.has_profile_background {margin-top: 0px;}.profile-links{margin-top:20px;margin-bottom:10px;}.links-container{line-height: 20px;}.profile_header_bg_texture{background-image:-webkit-radial-gradient( 50% 0%, 80% 50%, #32405A, #252934);background-image:-moz-radial-gradient( 50% 0%, 80% 50%, #32405A, #252934);box-shadow:0px 0px 10px 3px rgba(0,0,0,.8);}div.profile_page {padding-top: 10px;}.profile_comment_area{margin-bottom:40px;}");
    GM_addStyle(".profile_header_bg{background:none;background-image:none;}.profile_comment_area {margin-top: 10px;}.profile_header_bg_texture, .profile_summary, .profile_header_bg, .profile_header, .links-header, .header_real_name{height:auto !important;}.profile_header_summary{padding-bottom:10px;}");
    GM_addStyle(".profile_header_bg{min-height:240px;}.profile_header{min-height:216px;}.profile_ban,.persona{margin-top:12px;}.profile_ban{font-size:18px;color:red;text-align:center;}");
});

function profileToSteamID(profile)
{
    var base = "7960265728"
    var profile = profile.substr(7)
    
    var subtract = 0
    var lastIndex = base.length - 1
    
    for(var i=0;i<base.length;i++)
    {
        var value = profile.charAt(lastIndex - i) - base.charAt(lastIndex - i)
        
        if(value < 0)
        {
            var index = lastIndex - i - 1
            
            base = base.substr(0,index) + (Number(base.charAt(index)) + 1) + base.substr(index+1)
            
            if(index)
            {
                value += 10
            }
            else
            {
                break
            }
        }
        
        subtract +=  value * Math.pow(10,i)
    }
    
    return "STEAM_0:" + (subtract%2) + ":" + Math.floor(subtract/2)
}