// ==UserScript==
// @name           AE Tools
// @namespace      hls
// @description    Up to date, hopefully better version of AstroEmpiresExtras
// @include        http://*.astroempires.com/*
// @exclude        http://*.astroempires.com/
// @exclude        http://*.astroempires.com/login.*
// @exclude        http://*.astroempires.com/account.*
// @exclude        http://forum.astroempires.com/*
// ==/UserScript==

/* 
 * Right. So... I'm back to my old tricks again. This thing's meant to replace
 * knubile's script. Tried to make it a little cleaner. Faster. New tricks and
 * toys.
 *
 * To programmers... Yes! I know, the code's terrible. I'm ashamed of myself.
 * But I'm doing this on a budget of $0. If you DO know what you're doing and
 * want to help out, send me a message on the forums. Write a patch or 
 * something to fix buggy code, do something better. I'll give you credit
 * up here in the title.
 *
 * This script should probably run last, since its modifying the HTML of the
 * page. If you have an atlas or something, then it'll bugger up the output.
 *
 * Its not done yet. I'll have more to add to it later. Haven't tested it on
 * non-upgraded accounts. If you find a bug let me know.
 *
 *
 * - Felix
 *
 * PS: I swear I'm gonna bring the stats project back.
 *
 */

/* Set it to 1 if you're not not upgraded. */
var notUpgraded = 0;

/*--------- Util functions ------------*/

String.prototype.ucFirstWord = function()
{
    return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
}

Number.prototype.timePad = function()
{
    return (this < 10) ? '0' + this : this;
}
/* ------------------------------------*/

/* Used throughout the app... I shouldn't have them here */
var regex, result;

/* Animate the timer. This doesn't need to be run if you don't want to 
 * actually animate it. */
animateTimer = function() {
    var pageDate = document.getElementById('pageDate');
    var timerDateObject = new Date();
    var time = parseInt(pageDate.title);
    time += 1000;
    
    pageDate.title = time;
    timerDateObject.setTime(time);
    
    pageDate.innerHTML = 'Server Time: ' + timerDateObject.getDate() + '-' + parseInt(timerDateObject.getMonth() + 1) + '-' + timerDateObject.getFullYear() + ' '
                        + timerDateObject.getHours() + ':' + timerDateObject.getMinutes().timePad() + ':' + timerDateObject.getSeconds().timePad();
    setTimeout(animateTimer, 1000)
}

/* This does need to be run if you want the relative times in the 
 * board / messages spot. */
setupTimer = function() {

    var timerHtmlElement = document.evaluate('//small', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var timerText = timerHtmlElement.innerHTML.split(' ');
    var pageDate = AEDateToTime(timerText[2] + ' ' + timerText[3]);
    
    timerHtmlElement.title = pageDate.getTime();
    timerHtmlElement.id = 'pageDate';
    animateTimer();
}

/* Nab a date in DD-MM-YYYY HH:II:SS format and convert it to an object. */
AEDateToTime = function(timerText)
{
    timerText = timerText.split(' ');
    var date = timerText[0].split('-');
    var time = timerText[1].split(':');

    var pageDate = new Date();
    pageDate.setFullYear(date[2]);
    pageDate.setMonth(parseInt(date[1] - 1));
    pageDate.setDate(date[0]);

    pageDate.setHours(time[0]);
    pageDate.setMinutes(time[1]);
    pageDate.setSeconds(time[2]);
    
    return pageDate;
}

/* Puts the server name in the title */
fixTitle = function()
{
    /* Matches the subdomain in the URL */
    regex = new RegExp("//([^.]+)");
    result = regex.exec(window.location.href);
    
    if(result)
    {
        document.title = result[1].ucFirstWord() + ' -' + document.title.split('-')[1];
    }
}

/* Takes anything thats a timer element and gives the finishing date. */
modTimers = function()
{
    var thisTimer, timers = document.evaluate("//td[@title > 0 and starts-with(@id, 'time')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var now = new Date(), future = new Date(), day = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"), finishTime;

    for(var i = 0; i < timers.snapshotLength; i++) 
    {
        /* Get the next timer, calculate the finishing date. */
        thisTimer = timers.snapshotItem(i);
        
        future.setTime(now.getTime() + (thisTimer.title * 1000));
        
        if(thisTimer.title > 432000)
            finishTime = future.getMonth() + '/' + future.getDate() + ' ' + future.getHours() + ':' + future.getMinutes().timePad();
        else if(future.getDay() !== now.getDay())
            finishTime = day[future.getDay()] + ' ' + future.getHours() + ':' + future.getMinutes().timePad();
        else
            finishTime = future.getHours() + ':' + future.getMinutes().timePad() + ':' + future.getSeconds().timePad();
            
        /* Write it out to the screen. Change the element ID so it doesn't get wiped. */
        thisTimer.innerHTML = '<span id="' + thisTimer.id + '" title="' + thisTimer.title + '">-</span><br><span style="color: #9999FF; opacity: 0.7">' + finishTime + '</span>';
        thisTimer.id = 'c' + thisTimer.id;
    }
}

/* Hides the help info on the units. If you're running this script, you know 
 * enough about AE to not need it. */
cleanBuild = function()
{
    var helps = document.evaluate('//td[@class="help"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var i = 0; i < helps.snapshotLength; i++)
    {
        helps.snapshotItem(i).style.display = "none";
    }
}

/* Hides the Guild Description and Internals on the first Guild Page view.
 * Handy for just... getting rid of stuff you've seen every day. */
cleanGuild = function()
{
    var tables = document.getElementsByTagName('table');
    tables[2 + notUpgraded + insertedEmpireBar].style.display = 'none';
    tables[3 + notUpgraded + insertedEmpireBar].style.display = 'none';
    
    var center = document.getElementsByTagName('center');
    center[0].innerHTML = "<a href=\"#\" onclick=\"var tables = document.getElementsByTagName('table'); tables[" + parseInt(2 + notUpgraded + insertedEmpireBar) + "].style.display = ''; tables[" + parseInt(3 + notUpgraded + insertedEmpireBar) + "].style.display = ''; var center = document.getElementsByTagName('center'); center[0].innerHTML = unescape('" + escape(center[0].innerHTML) + "');\">Show Guild Info</a>";
}

/* Sets up fleets on the fleet page to move on click */
modFleetPage = function()
{
    var fleets = document.evaluate("//a[starts-with(@href, 'fleet.aspx?fleet=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var i = 0; i < fleets.snapshotLength; i++)
    {
        fleets.snapshotItem(i).href += '&view=move';
    }
}

/* Puts a copy of the Empire Bar in (So handy.) */
insertEmpireBar = function()
{
    var tables = document.getElementsByTagName('table');
    tables = tables[0 + notUpgraded];
    
    var empireNav = document.createElement('table');
    empireNav.width = tables.width;
    empireNav.align = "center";
    empireNav.innerHTML = '<tbody><tr><th id="bases_events" width="11%"><a href="empire.aspx?view=bases_events">Events</a></th><th id="bases_capacities" width="11%"><a href="empire.aspx?view=bases_capacities">Capacities</a></th><th id="economy" width="11%"><a href="empire.aspx?view=economy">Economy</a></th><th id="trade" width="11%"><a href="empire.aspx?view=trade">Trade</a></th><th id="structures" width="11%"><a href="empire.aspx?view=structures">Structures</a></th><th id="fleets" width="11%"><a href="empire.aspx?view=fleets">Fleets</a></th><th id="units" width="11%"><a href="empire.aspx?view=units">Units</a></th><th id="technologies" width="12%"><a href="empire.aspx?view=technologies">Technologies</a></th><th id="scanners" width="11%"><a href="empire.aspx?ch=1&amp;view=scanners">Scanners</a></th></tr></tbody>';
    tables.parentNode.insertBefore(empireNav, tables.nextSibling);
    tables.parentNode.insertBefore(document.createElement('br'), empireNav);
}

/* Automatically highlights the destination bar. Sloppy, but it works. */
destinationMod = function(focus, lock)
{
    var destination = document.getElementById('destination');
    if(focus)
    {
        destination.focus();
        destination.select();
    }
    if(lock === true)
    {
        destination.setAttribute('readonly', lock);
    }
    destination.setAttribute('onmouseover', 'this.focus(); this.select();');
}

/* I actually plan to write a few more things in here. I think. */
cleanFleetMove = function()
{
    destinationMod(true, false);
}

/* Makes the stupid thing stop moving. */
fixMarquee = function()
{
    var marquee = document.getElementsByTagName('marquee');
    marquee[0].setAttribute('scrollamount', '0');
}

/* Make the coord box */
cleanMap = function()
{
    /* Grab the Gal / Region / Sys / Loc tag, and insert the short link */
    var center = document.getElementsByTagName('center');
    center = center[0];
    
    center.innerHTML = center.innerHTML.replace(/([A-Z](?:\d{2}:){3}\d{2})/, '<input id="destination" type="text" value="$1" style="width: 120px; text-align: center;">');
    destinationMod(false, true);    
}

/* Makes a summary of all the fleet on the page */
fleetSummary = function()
{
    /* Create the Fleet Sum Table */
    var fleetTable = document.getElementsByTagName('table');
    fleetTable = fleetTable[fleetTable.length - 1].firstChild.childNodes;
    
    /* Quit if there's no fleet to count */
    if(fleetTable[0].innerHTML.indexOf('Fleets') === -1) { return; }
    
    var fleetSize, fleetGuild, inbound, found;
    var fleetSummaryTable = document.createElement('center');
    var fleetSummary = new Array();
    regex = /\[([^\]]+)\]/;
    
    /* Gather stats */
    for(var i = 2; i < fleetTable.length; i++)
    {
        /* Find the Guild */
        fleetGuild = regex.exec(fleetTable[i].childNodes[1].firstChild.innerHTML);
        
        fleetGuild = (fleetGuild ? fleetGuild[1] : 'Independant');
        fleetSize = parseInt(fleetTable[i].childNodes[3].firstChild.innerHTML);
        inbound = (fleetTable[i].childNodes[2].innerHTML.length !== 0);
        
        /* Search the array, and add the values */
        for(var j = 0; j < fleetSummary.length; j++)
        {
            if(fleetSummary[j][0] === fleetGuild)
            {
                if(inbound) { fleetSummary[j][1] += fleetSize; }
                else { fleetSummary[j][2] += fleetSize; }
                found = true;
            }
        }
        
        /* If we didn't find the guild in the array, build a new one */
        if(!found)
        {
            fleetSummary[fleetSummary.length++] = new Array(fleetGuild, (inbound ? fleetSize : 0), (inbound ? 0 : fleetSize));
        }
    }
    
    /* Create the HTML table */
    /* TODO: This is nasty. I hate DOM parsing... creating elements... */
    var text = '<table style="width: 500px" onclick="this.style.display=\'none\'"><tr><th colspan="3"><small>Click to hide</small></th></tr><tr><th>Guild</th><th>Inbound</th><th>Landed</th></tr>';
    for(var i = 0; i < fleetSummary.length; i++)
    {
        text += '<tr>' +
                '<td style="text-align: center">[' + fleetSummary[i][0] + ']</td>' +
                '<td style="text-align: right">' + fleetSummary[i][1] + '</td>' +
                '<td style="text-align: right">' + fleetSummary[i][2] + '</td>' +
                '</tr>';
    }
    text += '</table><br>';
    fleetSummaryTable.innerHTML = text;

    /* Stick the table in the document */
    if(fleetSummary.length > 0)
    {
        fleetTable = document.getElementsByTagName('table');
        fleetTable = fleetTable[fleetTable.length - 2];
        fleetTable.parentNode.insertBefore(fleetSummaryTable, fleetTable);
    }
}

/* Put the derbs next to planets that have them. */
debrisFinder = function()
{
    var debris, currentItem;
    result = document.evaluate('//span[contains(@title, "Debris")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    for (var i = 0; i < result.snapshotLength; i++)
    {
        currentItem = result.snapshotItem(i);
        debris = parseInt(currentItem.title.split(' ')[0]);
        currentItem.innerHTML = debris;
        if(debris > 1000)
        {
            currentItem.style.color = '#00FF00';
        }
    }
}

/* Turns dates into relative time */
modMessagesPage = function()
{
    /* Setup today. (Assumes we've setup the server time) */
    var today = new Date(), messageDate = new Date();
    today.setTime(parseInt(document.getElementById('pageDate').title));
    
    /* Grab all the TD elements with this year in it. */
    var dates = document.evaluate('//td[contains(., "-' + today.getFullYear() + ' ")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for(var i = 0; i < dates.snapshotLength; i++)
    {
        var currentMessage = dates.snapshotItem(i);
        
        /* Make sure we're actually editing a date... No longer than 20 chars 
           then set it up so its nice and easy to read. */
        if(currentMessage.innerHTML.length < 20)
        {
            currentMessage.title = currentMessage.innerHTML;
            
            var relTime = parseInt((today - AEDateToTime(currentMessage.innerHTML)) / 1000 / 60);
            
            if(relTime < 60) { currentMessage.innerHTML = relTime + ' minutes ago'; }
            else if(relTime >= 60 && relTime < 1440) { relTime /= 60; currentMessage.innerHTML = Math.round(relTime) + ' hours ago'; }
            else if(relTime >= 1440 && relTime <= 10080) { relTime /= 1440; currentMessage.innerHTML = Math.round(relTime) + ' days ago'; }
        }
    }
}

function main()
{
    var location = window.location.href;
    
    fixTitle();
    modTimers();
    fixMarquee();
    setupTimer();

    /* Insert Empire Bar
        NOTE: Must come early on. */
    if(location.indexOf('empire.aspx') === -1 && location.indexOf('view=move') === -1 && location.indexOf('view=production') === -1) { insertEmpireBar(); insertedEmpireBar = 1; }
    /* Clean Build Menus (on a base) */
    if(location.indexOf('view=production') !== -1 || location.indexOf('view=defenses') !== -1 || location.indexOf('view=structures') !== -1) { cleanBuild(); }
    /* Clean the Guild Page up */
    if(location.indexOf('guild.aspx') !== -1 && location.indexOf('guild=') === -1 && location.indexOf('action=') === -1 && location.indexOf('info=') === -1) { cleanGuild(); }
    /* Clean fleet movement up */
    if(location.indexOf('fleet.aspx') !== -1 && location.indexOf('view=move') !== -1) { cleanFleetMove(); }
    if(location.indexOf('fleet.aspx') !== -1 && location.indexOf('view=') === -1) { modFleetPage(); }    
    /* Write in the neat little relative times on the messages page */
    if(location.indexOf('messages.aspx') !== -1 || location.indexOf('board.aspx') !== -1) { modMessagesPage(); };
    
    /* Map page on a planet */
    regex = /map\.aspx\?loc=[A-Z](?:\d{2}:){3}\d{2}/;
    result = regex.exec(location);
    if(result) { cleanMap(); fleetSummary(); }
    
    /* Within a system page */
    regex = /map\.aspx\?loc=[A-Z](?:\d{2}:){2}\d{2}/;
    result = regex.exec(location);
    if(result) { debrisFinder(); }
}

/* Don't play with this... */
insertedEmpireBar = 0;
main();