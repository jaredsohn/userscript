// ==UserScript==
// @name           Kongregate Portal Report
// @namespace      tag://kongregate.com
// @description    Find out who has the portals you need
// @include        http://www.kongregate.com/games/*
// ==/UserScript==


try{
	if(unsafeWindow && unsafeWindow.holodeck){
		dom = unsafeWindow;
	} else {
		dom = this;
	}
}catch(e){
	dom = this;
}

if (window.undefined === unsafeWindow.console)
{
    console = new function() 
    {
        this.log = function(message){};
        this.info = function(message){};
        this.warn = function(message){};
        this.error = function(message){};
    };
}
else
{
    console = unsafeWindow.console;
}


var KPRVersion = 0.01;

function init_portalReport(){
    
    // If no version of the script is running, write down this one
    if (!window.KPRMaxVersion)
    {
        window.KPRMaxVersion = KPRVersion;
        setTimeout(init_portalReport, 1000);
    }
    // If the max version is less than this version, kill it
    else if (window.KPRMaxVersion < KPRVersion)
    {
        window.KPRMaxVersion = KPRVersion;
        setTimeout(init_portalReport, 1000);
    }
    // If this version is less than the max, kill this one
    else if (window.KPRMaxVersion > KPRVersion)
    {
        console.warn("KPR: Version " + KPRVersion + " is still installed, but is older than another version installed");
        return;
    }
    
    // If no version of the script is running, this one is
    if (!window.KPRScriptRunning)
    {
        window.KPRScriptRunning = true;
    }
    // If a version of the script is already running, kill this one.
    else
    {
        if (KPRVersion == window.KPRMaxVersion)
        {
            // TODO: Is a dupe of the script running on the frame of the game, also?
            console.warn("KPR: Another instance of Version " + KPRVersion + " attempted to run, but was cancelled.");
        }
        else
        {
            console.warn("KPR: Version " + KPRVersion + " failed to run because Version " + window.KPRMaxVersion + " was already running.");
        }
        return;
    }
    
        console.info("KPR: Kongregate Portal Report loaded! v" + KPRVersion);

        GM_registerMenuCommand("Run Portal Report", portalReport);
        
        dom.holodeck.addChatCommand("portals", portalReport);
}

window.setTimeout(init_portalReport,0);

function portalReport()
{

    if (!dom.holodeck)
    {
//        console.log("no holodeck");
        window.setTimeout(portalReport, 1000);
        return;
    }
    if (! dom.holodeck._chat_window)
    {
//        console.log("no chat window");
        window.setTimeout(portalReport, 1000);
        return;
    }
    if (! dom.holodeck._chat_window._active_room)
    {
//        console.log("no active room");
        window.setTimeout(portalReport, 1000);
        return;
    }
    if (! dom.holodeck._chat_window._active_room._users)
    {
//        console.log("no users");
        window.setTimeout(portalReport, 1000);
        return;
    }
    var users = dom.holodeck._chat_window._active_room._users;
        
    var groupMap = {"atlas":[],"p-body":[]};
    
    for (var username in users)
    {
        var user = users[username];
        if (user)
        {
            var group = user.variables.dueling_group;
            if (group)
            {
                var need = user.variables.portals_needed;
                var has = user.variables.portals_to_give;
                groupMap[group][username] = {"name":username,"need":need, "has":has};
            }
        }
    }

    var reportString = "";
    
    var currentUser = dom.holodeck._active_user._attributes._object;
    var userGroup = currentUser.dueling_group;
    var iNeed = currentUser.portals_needed;
    var iHave = currentUser.portals_to_give;
    if (userGroup)
    {
        reportString += "<h3>You need " + iNeed + " " + getOtherPortalColor(userGroup) + " portal" + s(iNeed) + ", and you have " +
        iHave + " " + getPortalColor(userGroup) + " portal" + s(iHave) + " left to give.</h3>";
    }
    else
    {
        reportString += "<h3>You are not currently playing the portal game.</h3>"
    }
        
    if (userGroup && iNeed > 0)
    {
        var otherGroup = (userGroup == "atlas")?"p-body":"atlas";
        
        var usersString = "";
        var sameTeamString = "";
        var foundAny = false;
        var foundSameTeam = false;
        for (var username in groupMap[otherGroup])
        {
            var user = groupMap[otherGroup][username];
            if (user && user.has > 0)
            {
                usersString += "\t";
                usersString += "<a href=\"#\" onClick=\"var texts = document.getElementsByClassName('chat_input'); for (var i in texts){var inp = texts[i]; inp.value='/w " + username + " Could I trouble you for " + 
                ((user.has>1)?"one of your":"your last") + " " + getPortalColor(otherGroup) + " portal" + s(user.has) + "?'}; return false;\" title=\"Click to whisper\">" + username + "</a>";
                usersString += " has " + user.has + " " + getPortalColor(otherGroup) + " and needs " + user.need + " " + getOtherPortalColor(otherGroup) + "<br />";
                
                foundAny = true;
                groupMap[otherGroup][username] = null;
            }
        }
        
        for (var username in groupMap[userGroup])
        {
            var user = groupMap[userGroup][username];
            if (user && user.need > 0)
            {
                sameTeamString += "\t" + username + " has " + user.has + " " + getPortalColor(userGroup) + " and needs " + user.need + " " + getOtherPortalColor(userGroup) + "<br />";
                foundSameTeam = true;
            }
        }
        
        if (foundAny)
        {
            reportString += "<br /><br /><h3>Peaple with " + getOtherPortalColor(userGroup) + " portals:</h3>";
            reportString += usersString;
        }
        else
        {
            reportString += "<br /><br /><h3>Nobody in this room has the " +  getOtherPortalColor(userGroup) + " portal" + s(iNeed) + " you need. :-(</h3>";
        }
        
        if (foundSameTeam)
        {
            reportString += "<br /><br /><h3>People competing for " + getOtherPortalColor(userGroup) + " portals:</h3>";
            reportString += sameTeamString;
        }
        else
        {
            reportString += "<br /><br /><h3>You have no competition for " +  getOtherPortalColor(userGroup) + " portals.</h3>";
        }
        
    }
    else
    {
        var groups = ["atlas","p-body"];
        for (var i in groups)
        {
            var group = groups[i];
            
            var anyInGroup = false;
            var groupString = "";
            
            for (var username in groupMap[group])
            {
                var user = groupMap[group][username];
                if (user && (user.has > 0 || user.need > 0))
                {
                    groupString += "\t" + username + " has " + user.has + " " + getPortalColor(group) + " and needs " + user.need + " " + getOtherPortalColor(group) + "<br />";
                    
                    groupMap[group][username] = null;
                    anyInGroup = true;
                }
            }
            
            if (anyInGroup)
            {
                reportString += "<h3>People on team <span style='background-color: " + getPortalColor(group) + ";'>" + group + "</span> who still have/need portals:</h3>";
                reportString += groupString;
            }
            else
            {
                reportString += "<h3>No one on team <span style='background-color: " + getPortalColor(group) + ";'>" + group + "</span> still has or needs portals.</h3>";
            }
        }        
    }

    dom.holodeck.activeDialogue().displayUnsanitizedMessage(
        "PortalBot: ",
        reportString,
        {"class":"whisper received_whisper"},
        {non_user:true}
    );
                
    return false;
}

function s(count)
{
    if (count != 1)
    {
        return "s";
    }
    else
    {
        return "";
    }
}

function getPortalColor(groupName)
{
    if (groupName == "atlas")
    {
        return "blue";
    }
    else if (groupName == "p-body")
    {
        return "orange";
    }
    else
    {
        return "no portal color"
    }
}

function getOtherPortalColor(groupName)
{
    if (groupName == "atlas")
    {
        return "orange";
    }
    else if (groupName == "p-body")
    {
        return "blue";
    }
    else
    {
        return "no portal color"
    }
}
