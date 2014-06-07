// ==UserScript==
// @name       	SteamRep Profile Checker
// @namespace  	http://f-o-g.eu
// @version     1.6
// @description Adds the SteamRep Status to the profile of each user
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @match      	http://steamcommunity.com/id/*
// @match	http://steamcommunity.com/profiles/*
// @updateURL 	
// @copyright   2013+, n0:name
// ==/UserScript==

var steamrep;

// Extend jQuery.fn with our new method
jQuery.extend( jQuery.fn, {
    // Name of our method & one argument (the parent selector)
    hasParent: function( p ) {
        // Returns a subset of items using jQuery.filter
        return this.filter(function () {
            // Return truthy/falsey based on presence in parent
            return $(p).find(this).length;
        });
    }
});

function getSteamID() 
{
	document.getElementsByClassName("profile_header_summary")[0].dataset.steamid = g_rgProfileData['steamid'];
}

if(document.getElementsByClassName("profile_header_summary").length > 0) 
{
	var script = document.createElement("script");
	script.appendChild(document.createTextNode("(" + getSteamID + ")();"));
	(document.body || document.head || document.documentElement).appendChild(script);
}

$(function()
{
    
    /*--- Create a proper unsafeWindow object on browsers where it doesn't exist
    (Chrome, mainly).
    Chrome now defines unsafeWindow, but does not give it the same access to
    a page's javascript that a properly unsafe, unsafeWindow has.
    This code remedies that.
    */
    
    var bGreasemonkeyServiceDefined     = false;
    try 
	{
        if (typeof Components.interfaces.gmIGreasemonkeyService === "object") 
		{
            bGreasemonkeyServiceDefined = true;
        }
    }
    catch (err) 
	{
    }
    
    if ( typeof unsafeWindow === "undefined"  ||  ! bGreasemonkeyServiceDefined) 
	{
        unsafeWindow    = ( function () {
            var dummyElem   = document.createElement('p');
            dummyElem.setAttribute ('onclick', 'return window;');
            return dummyElem.onclick ();
        } ) ();
    }
	
	var SteamID64 = document.getElementsByClassName("profile_header_summary")[0].dataset.steamid;
    var SteamID32 = profileToSteamID(SteamID64);
	
	$('.profile_summary_footer').css("margin-top", "-5px");
    $('.persona_name').css("margin-top", "-15px");
	
	$('<div class="reputation-content"><span style="color: #ffffff">STEAMREP UNKNOWN</span></div>').insertAfter(".namehistory_link");
	$(".reputation-content").css("font-size", "15px");
	
	GM_addStyle(".playerAvatar.scammer img {border-color: #bf1313;}");
	GM_addStyle(".playerAvatar.scammer{background-color: #bf1313;background: -moz-linear-gradient(top, #bf1313 5%, #ff0000 95%);background: -webkit-gradient(linear, left top, left bottom, color-stop(5%,#bf1313), color-stop(95%,#ff0000));background: -webkit-linear-gradient(top, #bf1313 5%,#ff0000 95%);background: -o-linear-gradient(top, #bf1313 5%,#ff0000 95%);background: linear-gradient(to bottom, #bf1313 5%,#ff0000 95%);");
	
	GM_addStyle(".playerAvatar.caution img {border-color: #dbd11b;}");
	GM_addStyle(".playerAvatar.caution{background-color: #dbd11b;background: -moz-linear-gradient(top, #dbd11b 5%, #FC970A 95%);background: -webkit-gradient(linear, left top, left bottom, color-stop(5%,#dbd11b), color-stop(95%,#FC970A));background: -webkit-linear-gradient(top, #dbd11b 5%,#FC970A 95%);background: -o-linear-gradient(top, #dbd11b 5%,#FC970A 95%);background: linear-gradient(to bottom, #dbd11b 5%,#FC970A 95%);");
	
    $.ajax("https://steamrep.com/api/beta2/reputation/" + SteamID64 + "?json=1&extended=1",{
        dataType:"json"
        
    }).done(function(msg) {
        steamrep = msg.steamrep;
		var fullrep = "<a style=\"color: inherit\" href=\"http://steamrep.com/profiles/"+SteamID64+"\">STEAMREP: ";
		
        unsafeWindow.steamrep = steamrep;
		
		var raw = steamrep.reputation.full;
		var sr_fullrep = raw.split(",");

		if(raw.length == 0)
		{
			fullrep += "<span style=\"color: white\">Normal</span>";
		}
		else
		{
			for(var i = 0; i < sr_fullrep.length; i++)
			{
				var rep = sr_fullrep[i];
				
				if(rep.indexOf("SCAMMER") != -1)
				{
					fullrep += "<span style=\"color: rgba(255, 0, 0, 0.75); font-weight: bold;\">"+rep+"</span>";
					
					changeAvatarStile('.playerAvatar', 'scammer');
				}
				else if(rep.indexOf("CAUTION") != -1)
				{
					fullrep += "<span style=\"color: rgba(201, 129, 0, 0.75); font-weight: bold;\">"+rep+"</span>";
					
					changeAvatarStile('.playerAvatar', 'caution');
				}
				else if(rep.indexOf("DONATOR") != -1)
				{
					fullrep += "<span style=\"color: rgba(0, 105, 201, 0.75); font-style: italic;\">"+rep+"</span>";
				}
				else
				{
					fullrep += "<span style=\"color: rgba(0, 201, 40, 0.75); font-weight: bold;\">"+rep+"</span>";
				}
				
				if(i != (sr_fullrep.length-1)) fullrep += ", ";
			}
		}
		
		fullrep += "</a>";
		
		$(".reputation-content").html("")
		.append(fullrep);
    });
	
	GM_addStyle(".profile_summary{margin-top:20px;}.profile_summary_footer{margin-top: -20px;}");
	GM_addStyle(".profile_header_bg_texture, .profile_header_bg, .profile_header, .links-header, .header_real_name{height:auto !important;}");
	GM_addStyle(".profile_header_bg{min-height:240px;}.profile_header{min-height:202px;}");
});

function changeAvatarStile(className, style)
{
	$(className).hasParent('.profile_header_content').addClass(style);
	$(className).hasParent('.profile_header_content').removeClass('online');
	$(className).hasParent('.profile_header_content').removeClass('offline');
	$(className).hasParent('.profile_header_content').removeClass('in-game');
}

function profileToSteamID(profile)
{
    var base = "7960265728";
    var profile = profile.substr(7);
    
    var subtract = 0;
    var lastIndex = base.length - 1;
    
    for(var i=0;i<base.length;i++)
    {
        var value = profile.charAt(lastIndex - i) - base.charAt(lastIndex - i);
        
        if(value < 0)
        {
            var index = lastIndex - i - 1;
            
            base = base.substr(0,index) + (Number(base.charAt(index)) + 1) + base.substr(index+1);
            
            if(index)
            {
                value += 10;
            }
            else
            {
                break;
            }
        }
        
        subtract +=  value * Math.pow(10,i);
    }
    
    return "STEAM_0:" + (subtract%2) + ":" + Math.floor(subtract/2);
}