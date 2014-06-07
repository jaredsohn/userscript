// ==UserScript==
// @name            PARC Roleplay Script
// @version         1.03
// @namespace       johnwu@radio.blmurphy.net
// @description     Adds support for custom quests into Pardus.
// @author          John Wu && Beigeman
// @grant           GM_xmlhttpRequest
// @include         http*://*.pardus.at/planet*
// @include         http*://*.pardus.at/starbase*
// @include         http*://*.pardus.at/main.php*
// @include         http*://*.pardus.at/shipyard.php*
// @include         http*://*.pardus.at/blackmarket.php*
// @include         http*://*.pardus.at/options.php*
// @require         http://rp.blmurphy.net/bbcode.min.js
// ==/UserScript==
"use strict";

var doc = document;
var url = doc.location.href;

var UNIVERSE = getUniversePrefix();
var RP_STORAGE_NAME = UNIVERSE + "pardus_roleplay_opt";
var DEFAULT_STORY_PROVIDER = "http://rp.blmurphy.net/";
var DEFAULT_STORY_NAME = "Thisisthedefaultquestname";
var DATA_DELIM = ",";
var CONFIG_VERSION = 1.0; // Update this when the config object changes.
var HTTP_OK = 200;

/* Some data is saved to prevent unecessary HTTP requests on the server,
 * and because it is not available on all pages, so is cached when available.
 */
var userid = unsafeWindow.userid;
var imgDir = rpGetValue(RP_STORAGE_NAME + "imgDir");
var questObjective = rpGetValue(RP_STORAGE_NAME + "questObjective");
var stageTargets = getStageTargetData(rpGetValue(RP_STORAGE_NAME + "stageTargets"));
var availableQuests = rpGetValue(RP_STORAGE_NAME + "availableQuests");
var sector = rpGetValue(RP_STORAGE_NAME + "sector", "");
var coords = rpGetValue(RP_STORAGE_NAME + "coords", "");
var config = null;
var observer;
var mutationConfig = { attributes: true };
var partialRefresh = false;

/* Load Saved Configuration if it exists, else use defaults specified here. */
config = JSON.parse(rpGetValue(RP_STORAGE_NAME));

if (config === null)
{
    config = {};
    config.version = CONFIG_VERSION;
    config.contentProvider = DEFAULT_STORY_PROVIDER;
    config.currentQuest = DEFAULT_STORY_NAME;
    config.markTargets = true;
    config.displayObjective = true;
    rpSetValue(RP_STORAGE_NAME, JSON.stringify(config));
}

addPartialRefreshObserver();

/* Begin main operation. */
main();

function main()
{
    doNav(false);
    
    if (url.indexOf("starbase.php") >= 0)
    {
        if (userid) getStory(insertStarbaseStory);
    }
    else if (url.indexOf("planet.php") >= 0)
    {
        if (userid) getStory(insertPlanetStory);
    }
    else if (url.indexOf("shipyard.php") >= 0)
    {
        if (userid) getStory(insertShipyardStory);
    }
    else if (url.indexOf("blackmarket.php") >= 0)
    {
        if (userid) getStory(insertBlackmarketStory);
    }
    else if (url.indexOf("_trade.php") >= 0)
    {
        if (userid) getStory(insertTradeStory);
    }
    else if (url.indexOf("options.php") >= 0)
    {
        getAvailableQuests();
        insertOptionsForm();
    }
}

/* If you modify the ap counter inside doNav, then you MUST disable the observer while doing so or you'll hit an infinite loop because the observer detects your change and then re-runs doNav. */
function addPartialRefreshObserver()
{
    var mutationTarget = doc.querySelector('#apsleft');

    if ((url.indexOf("main.php") >= 0) && (mutationTarget))
    {
        /* Initialise the oberserver for the first click */
        observer = new MutationObserver(function() {
            /* Prevent function running multiple times per click. */
            observer.disconnect();

            /* Run the function to do whatever we want. */
            doNav(true);

            /* Initialise a new observer for subsequent nav clicks. */
            var newTarget = doc.querySelector('#apsleft');
            if(newTarget) observer.observe(newTarget, mutationConfig);
        });

        observer.observe(mutationTarget, mutationConfig);
    }
}

/* #TODO not used. */
function disablePartialRefreshObserver()
{
    if(observer) observer.disconnect();
}

function doNav(ppr)
{
    /* If the user has not yet selected a quest from the dropdown menu. */
    if(config.currentQuest === DEFAULT_STORY_NAME)
    {
        return;
    }
    if (url.indexOf("main.php") >= 0)
    {
        partialRefresh = ppr;        
        sector = doc.getElementById('sector').textContent;
        coords = doc.getElementById('coords').textContent.replace(/[\[\]]/g, '');

        rpSetValue(RP_STORAGE_NAME + "sector", sector);
        rpSetValue(RP_STORAGE_NAME + "coords", coords);
        rpSetValue(RP_STORAGE_NAME + "imgDir", unsafeWindow.imgDir);
        
        /* If we have no quests saved locally at all, query the server before we get to the options page. */
        if((!availableQuests) && (!partialRefresh)) getAvailableQuests();

        addObjectiveText();
        addObjectiveToNav();

        if((doc.getElementById('aCmdStarbase')) || (doc.getElementById('aCmdPlanet'))) getStory(headerSaveHandlerNav);
    }
}

/* Queries the database for a quest for the current location,
 * and passes the response to a handler which deals with inserting
 * it into a particular page (base, planet, BM etc).
 */
function getStory(responseHandler)
{
    sendPOSTRequest(responseHandler, "content.php");
}

/* Called when a user clicks a story content link to show they can progress to the next stage. */
function reportCompletion(responseHandler)
{
    /* Unset data from previous quest stage. */
    rpSetValue(RP_STORAGE_NAME + "questObjective", "Complete! Await new instructions!");
    rpSetValue(RP_STORAGE_NAME + "stageTargets", "");

    sendPOSTRequest(responseHandler, "completed.php");
}

/* Get and cache available quest names */
function getAvailableQuests()
{
    sendPOSTRequest(parseavailableQuests, "quests.php", "user=" + userid + "&universe=" + UNIVERSE + "&quest=" + config.currentQuest);
}

function sendPOSTRequest(responseHandler, page, data)
{
    var postData = "coords=" + coords + "&sector=" + sector + "&user=" + userid + "&universe=" + UNIVERSE + "&area=" + getArea() + "&quest=" + config.currentQuest;
    if(data) postData = data;

    GM_xmlhttpRequest
    ({
        method: "POST",
        url: config.contentProvider + page,
        data: postData,
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        onload: responseHandler
    });
}

function insertPlanetStory(response)
{
    insertWelcomeScreenStory(response, doc.getElementsByTagName('table')[4]);
}

function insertStarbaseStory(response)
{
    /* Only NPC bases have popularity, so we can use that to figure out what kind of base we're on. */
    var npc_base = doc.getElementById('popularity_value');

    if(npc_base)
    {
        insertWelcomeScreenStory(response, doc.getElementsByTagName('table')[4]);
    }
    else
    {
        insertWelcomeScreenStory(response, doc.getElementsByTagName('table')[5]);
    }
}

function insertShipyardStory(response)
{
    if (response.status === HTTP_OK)
    {
        saveHeaderInfo(response);

        if (response.responseText)
        {
            var story = initStoryObject(response);
            
            if(Object.keys(story).length !== 0)
            {
                var br = doc.createElement('br');
                var hr = doc.createElement('hr');
                var hr2 = hr.cloneNode(true);
                var parent = doc.getElementsByTagName('center')[0];

                parent.appendChild(hr);
                parent.appendChild(story.link);
                parent.appendChild(br);
                parent.appendChild(hr2);
                parent.appendChild(story.div);

                story.link.addEventListener('click', function(){ toggleStoryForLink(story.linkName); }, false);
            }
        }
    }
}

function insertBlackmarketStory(response)
{
    if (response.status === HTTP_OK)
    {
        saveHeaderInfo(response);

        if (response.responseText)
        {
            var story = initStoryObject(response);
            
            if(Object.keys(story).length !== 0)
            {
                var br = doc.createElement('br');
                var hr = doc.createElement('hr');
                var insertionPoint = doc.getElementsByTagName('hr')[1];
                var parent = insertionPoint.parentNode;

                parent.insertBefore(hr, insertionPoint);
                parent.insertBefore(story.link, insertionPoint);
                parent.insertBefore(br, insertionPoint);
                parent.insertBefore(story.div, insertionPoint);

                story.link.addEventListener('click', function(){ toggleStoryForLink(story.linkName); }, false);
            }
        }
    }
}

function insertTradeStory(response)
{
    if (response.status === HTTP_OK)
    {
        saveHeaderInfo(response);

        if (response.responseText)
        {
            var story = initStoryObject(response);
            
            if(Object.keys(story).length !== 0)
            {
                var br = doc.createElement('br');
                var hr = doc.createElement('hr');
                var hr2 = hr.cloneNode(true);

                var parent = doc.getElementsByTagName('h1')[0].parentNode;
                var insertionPoint = parent.childNodes[1];

                parent.insertBefore(hr, insertionPoint);
                parent.insertBefore(story.link, insertionPoint);
                parent.insertBefore(br, insertionPoint);
                parent.insertBefore(story.div, insertionPoint);
                parent.insertBefore(hr2, insertionPoint);

                story.link.addEventListener('click', function(){ toggleStoryForLink(story.linkName); }, false);
            }
        }
    }
}

function insertWelcomeScreenStory(response, linkTable)
{
    if (response.status === HTTP_OK)
    {
        saveHeaderInfo(response);

        if (response.responseText)
        {
            var story = initStoryObject(response);
            
            if(Object.keys(story).length !== 0)
            {
                linkTable.appendChild(getSpacerTr());
                linkTable.appendChild(getLinkTr(story.link));
                linkTable.parentNode.parentNode.appendChild(story.div);
                linkTable.parentNode.parentNode.appendChild(doc.createElement('br'));

                story.link.addEventListener('click', function(){ toggleStoryForLink(story.linkName); }, false);
                story.link.className = "hlLink";
            }
        }
    }
}

function insertOpenSpaceStory(response)
{
    if (response.status === HTTP_OK)
    {     
        saveHeaderInfo(response);

        if (response.responseText)
        {
            var story = initStoryObject(response);
            var br = doc.createElement('br');
            var hr = doc.createElement('hr');            
            var parent = doc.getElementById('navarea').parentNode;
            var links = removeEmptyArrayElements([doc.getElementById('aCmdBuilding'),doc.getElementById('aCmdWreck'),doc.getElementById('aCmdStarbase'), doc.getElementById('aCmdOwnBuilding')]);
            var existingLink = doc.getElementById(nameToID(story.linkName));
            var div;

            /* The nav DOM looks a little different during PPR */
            if(partialRefresh) parent = parent.parentNode.parentNode;
            
            if(!existingLink)
            {
                    if(story)
                    {
                        /* We're not on a tile with a command link */
                        if(links.length === 0)
                        {
                            div = doc.createElement('div');
                            var commandsContent = doc.getElementById('commands_content');
                                            
                            commandsContent.insertBefore(doc.createElement('br'), commandsContent.childNodes[0]);
                            commandsContent.insertBefore(div, commandsContent.childNodes[0]);                
                        }
                        else
                        {
                            div = links[0].parentNode;
                            div.innerHTML = "";           
                        }
                                                
                        div.appendChild(story.link);                
                        div.style.position = "relative";
                        div.style.top = "6px";
                        story.link.innerHTML = "<b>" + story.link.textContent + "</b>";
                        story.div.style.height = ((unsafeWindow.tileRes * doc.getElementById('navarea').rows.length) - 13) + "px";
                        story.div.style.width = ((unsafeWindow.tileRes * doc.getElementById('navarea').rows.length) - 13) + "px";

                        parent.appendChild(story.div);                        
                    
                        story.link.addEventListener('click', function(){ toggleNavStory(story.linkName); }, false);
                    }
            }
            else
            {
                existingLink.innerHTML = "<b>Enter " + story.linkName + "</b>";
                var existingDiv = doc.getElementById(nameToID(story.linkName + "_div"));
                existingDiv.innerHTML = "";
                existingDiv.appendChild(story.text);
            }
        }
    }
}

/* Some magic from: http://stackoverflow.com/questions/10590257/remove-null-values-from-arrays-with-splice */
function removeEmptyArrayElements(arr) 
{ 
   if (!Array.isArray(arr)) 
   {
      return arr;
   } 
   else
   {
       return arr.filter( function(elem) 
       {
        return elem !== null; 
       }).map(removeEmptyArrayElements);
   }
}

function headerSaveHandler(response)
{
    if (response.status === HTTP_OK)
    {
        saveHeaderInfo(response);
    }
}

function headerSaveHandlerNav(response)
{
    if (response.status === HTTP_OK)
    {
        headerSaveHandler(response);
        addObjectiveText();
        addObjectiveToNav();
    }
}

function initStoryObject(response)
{
    var story = {};
    var targetInfo = getStageDataForCurrentLocation();

    if(targetInfo)
    {
        story.linkName = targetInfo.name;
        story.div = getStoryDiv(story.linkName);
        story.link = getStoryLink(story.linkName);
        story.text = getFormattedStoryText(response);
        story.div.appendChild(story.text);
    }
    return story;
}

function getStageTargetData(stageJSON)
{
    if (stageJSON)
    {
        var array = [];
        var stages = JSON.parse(stageJSON);
        if(stages)
        {
            if(stages.length === undefined)
            {
                array.push(stages);
            }
            else
            {
                array = stages;
            }
                
            if(array)
            {
                for(var i = 0; i < array.length; i++)
                {
                    array[i].coords = array[i].coords.replace(/[^0-9,]/gi, '');
                }
                return array;
            }  
        }
    }       
}

function saveHeaderInfo(response)
{
    /* Save header values. Ensure coords only come through as numbers separated by a comma. */
    questObjective = getHeaderValue(response, "Quest-Objective");
    var tmp = getStageTargetData(getHeaderValue(response, "Stage-Targets"));

    /* Don't nuke our old stage target data if the new one can't be read. */
    if(tmp) stageTargets = tmp;
    
    if(questObjective) rpSetValue(RP_STORAGE_NAME + "questObjective", questObjective);
    if(stageTargets) rpSetValue(RP_STORAGE_NAME + "stageTargets", JSON.stringify(stageTargets));
}

function getSpacerTr()
{
    var tr = doc.createElement('tr');
    var td = doc.createElement('td');
    var hr = doc.createElement('hr');

    td.colSpan = 3;

    td.appendChild(hr);
    tr.appendChild(td);
    return tr;
}

function getLinkTr(link)
{
    var tr = doc.createElement('tr');
    var td = doc.createElement('td');

    td.align = "center";
    td.colSpan = 3;

    td.appendChild(link);
    tr.appendChild(td);
    return tr;
}

function getStoryLink(linkName)
{
    var link = doc.createElement("a");
    link.id = nameToID(linkName);
    link.href = "#";
    link.innerHTML = "Enter " + linkName;
    return link;
}

function getStoryDiv(linkName)
{
    var div = doc.createElement('div');
    div.style.borderColor = "#A0B1C9";
    div.style.borderStyle = "outset";
    div.style.borderWidth = "1px";
    div.style.padding = "5px";
    div.style.width = "740px";
    div.style.display = "none";
    div.style.background = "url('" + imgDir + "/bgd.gif')";
    div.id = nameToID(linkName) + "_div";
    return div;
}

function getFormattedStoryText(response)
{
    var storyText = doc.createElement('div');
    storyText.align = "left";
    storyText.style.textAlign = "left";    
    storyText.innerHTML = new bbcode.Parser().toHTML(response.responseText);
    return storyText;
}

function getArea()
{
    if((url.indexOf("starbase.php") >= 0) || (url.indexOf("planet.php") >= 0)) return "1";
    else if(url.indexOf("blackmarket.php") >= 0) return "2";
    else if(url.indexOf("shipyard.php") >= 0) return "3";
    else if(url.indexOf("_trade.php") >= 0) return "4";
    else if(url.indexOf("main.php") >= 0) return "5";

    /* If we're not on a page with a valid area code, notify the PHP script. */
    return "-1";
}

function getUniversePrefix()
{
    return doc.location.hostname.substr(0, doc.location.hostname.indexOf('.'));
}

function toggleStoryForLink(linkName)
{
    var link = doc.getElementById(nameToID(linkName));
    var div = doc.getElementById(nameToID(linkName) + "_div");
    
    if (div.style.display === 'none')
    {
        div.style.display = '';
        link.innerHTML = "Leave " + linkName;
        reportCompletion(headerSaveHandler);
    }
    else
    {
        div.style.display = 'none';
        link.innerHTML = "Enter " + linkName;
    }
}

function toggleNavStory(linkName)
{
    var link = doc.getElementById(nameToID(linkName));
    var div = doc.getElementById(nameToID(linkName) + "_div");
    var nav = doc.getElementById('navarea');

    if (div.style.display === 'none')
    {
        div.style.display = '';
        nav.style.display = 'none';
        if(partialRefresh) nav.parentNode.parentNode.style.display = 'none';
        link.innerHTML = "<b>Leave " + linkName + "</b>";
        reportCompletion(headerSaveHandler);
    }
    else
    {
        div.style.display = 'none';
        nav.style.display = '';        
        if(partialRefresh) nav.parentNode.parentNode.style.display = '';
        link.innerHTML = "<b>Enter " + linkName + "</b>";
    }
}

function getHeaderValue(response, header)
{
    var headers = response.responseHeaders.split("\n");
    var value = "";
    if(header === "Link-Name") value = "Tavern";

    for(var i = 0; i < headers.length; i++)
    {
        if(headers[i].indexOf(header) >= 0)
        {
            value = headers[i].substr(headers[i].indexOf(":") + 2, headers[i].length);
            value = value.replace(/(\r\n|\n|\r)/gm,"");
            break;
        }
    }
    return value;
}

function nameToID(name)
{
    return name.toLowerCase().replace(/ /g, "_");
}

function coordsToID(coordinates)
{
    return coordinates.toLowerCase().replace(/,/g, "_");
}

function addObjectiveImage(target)
{
    if(target.name && target.image)
    {
        var img = doc.createElement('img');
        img.className = "nf";
        img.id = nameToID(target.name) + "img";
        img.style.width = unsafeWindow.tileRes + "px";
        img.style.height = unsafeWindow.tileRes + "px";
        img.title = target.name;
        
        img.src = target.image;
        return img;
    }
    else
    {
        return null;
    }
}

function getStageDataForCurrentLocation()
{
    if(stageTargets)
    {
        for(var i = 0; i < stageTargets.length; i++)
        {        
            if((stageTargets[i].sector.toLowerCase() === sector.toLowerCase()) && (stageTargets[i].coords === coords))
            {                
                return stageTargets[i];
            }            
        }
    }
}

/*
 * Add Quest Markers to nav screen if the target is within sight.
 * If a building exists on this tile, its image will be overwritten.
 */
function addObjectiveToNav()
{
    if(stageTargets)
    {
        for(var i = 0; i < stageTargets.length; i++)
        {
            if (stageTargets[i].coords && stageTargets[i].sector && sector && coords)
            {
                if(stageTargets[i].sector.toLowerCase() === sector.toLowerCase())
                {
                    var nav;
                    var navSize = unsafeWindow.navAreaSize;
                    var targetNum = stageTargets[i].coords.split(',');
                    var currentNum = coords.split(',');
                    var inSearchRange = false;
                    var yDiff = (parseInt(targetNum[1], 10) - parseInt(currentNum[1], 10));
                    var xDiff = (parseInt(targetNum[0], 10) - parseInt(currentNum[0], 10));
                    var middle = Math.floor(navSize / 2);

                    if(partialRefresh) nav = doc.getElementById('navareatransition');
                    else nav = doc.getElementById('navarea');

                    /* Check if the target is in view from the current location */
                    if (((yDiff + middle) < navSize) && ((yDiff + middle) >= 0) && ((xDiff + middle) < navSize) && ((xDiff + middle >= 0)))
                    {
                        inSearchRange = true;
                    }

                    if(inSearchRange)
                    {
                        /* Locate the target tile if it is in view. */
                        var target = nav.rows[middle + yDiff].cells[middle + xDiff];
                        var a = target.querySelector('a');
                        var objName = stageTargets[i].name;
                        var targetImage = addObjectiveImage(stageTargets[i]);
                        var innerImg;
                        
                        /* If we're on the target tile send a request to the server */
                        if ((xDiff === 0) && (yDiff === 0) && (stageTargets[i].area === "5"))
                        {                        
                            getStory(insertOpenSpaceStory); 
                            
                            /* Modify the middle nav click response if we're under a building
                            and our objective is in open space.. */
                            if(a)
                            {
                                a.href = "";
                                
                                a.addEventListener('click', function(){ toggleNavStory(objName); }, false);                            
                            }
                        }
                        
                        target.className = "navBuilding";
                        
                        if (targetImage && a && (stageTargets[i].area === "5"))
                        {
                            /* Check if this tile has a building on it already, if not move the inside the td to be the background image so we can put our new foreground in. */
                            innerImg = a.querySelector('img');
                            if((!target.style.background) && innerImg)
                            {
                                if(innerImg.src.indexOf("backgrounds") >= 0 )
                                {
                                    target.style.background = "url(" + a.querySelector('img').src + ")";
                                }
                            }
                            a.innerHTML = "";                            
                            a.appendChild(targetImage);
                        }
                        
                        /* If the image in the center of the screen is unclickable (because it is your ship. */
                        else if (targetImage && (stageTargets[i].area === "5"))
                        {
                            innerImg = target.querySelector('img');
                            var link = doc.createElement('a');              
                            link.addEventListener('click', function(){ toggleNavStory(objName); }, false);
                            target.removeChild(innerImg);
                            target.appendChild(link);
                            link.appendChild(targetImage);
                        }
                        
                        if  (config.markTargets)
                        {
                            if(!a)
                            {
                                a = target;
                            }
                            
                            /* display a small image if we can see the target location. */
                            a.appendChild(getTargetImage(a));
                        }
                    }
                }
            }
        }
    }
}

function getTargetImage(link)
{
    link.style.position = "relative";
    link.style.display = "block";
    
    var img = doc.createElement('img');
    img.className = "nf";
    img.src = imgDir + "/crosshair_red.png";
    img.style.position = "absolute";
    img.style.left = "0px";
    img.style.top = "0px";
    img.style.width = '50%';
    img.style.height = "auto";    
    return img;
}

function addObjectiveText()
{
    if(doc.getElementById('yourObjective'))
    {
        replaceObjectiveText();
    }
    else
    {
        if (questObjective && config.displayObjective)
        {
            var table = doc.getElementById('yourship').cloneNode(true);
            var otherships = doc.getElementById('otherships');
            var div =  doc.createElement('div');

            table.getElementsByTagName('img')[0].src = imgDir + "/actions.png";
            table.id = 'yourObjective';
            div.id = 'objectiveText';
            div.style.margin = "0 auto";
            div.style.width = "82%";

            var obj = questObjective.split('[*]');
            var ul = doc.createElement('ul');

            for(var i = 0; i < obj.length; i++)
            {
                if(obj[i])
                {
                    var li = doc.createElement('li');
                    li.textContent = obj[i];
                    ul.appendChild(li);
                }
            }
            div.appendChild(ul);

            table.rows[1].cells[0].innerHTML = "";
            table.rows[1].cells[0].appendChild(div);
            table.rows[1].cells[0].align = 'center';
            otherships.parentNode.insertBefore(table, otherships);
            otherships.parentNode.insertBefore(doc.createElement('br'), otherships);
            otherships.parentNode.insertBefore(doc.createElement('br'), otherships);
        }
    }
}

function replaceObjectiveText()
{
    if (questObjective && config.displayObjective)
    {
        var objective = doc.getElementById('objectiveText');

        if(objective)
        {
            var obj = questObjective.split('[*]');
            var ul = doc.createElement('ul');

            objective.innerHTML = "";

            for(var i = 0; i < obj.length; i++)
            {
                if(obj[i])
                {
                    var li = doc.createElement('li');
                    li.textContent = obj[i];
                    ul.appendChild(li);
                }
            }

            objective.appendChild(ul);
        }
    }
}

function parseavailableQuests(response)
{
    if((response.responseText) && (response.status === HTTP_OK))
    {
        availableQuests = response.responseText;
        rpSetValue(RP_STORAGE_NAME + "availableQuests", availableQuests);
        replaceSelectContent("currentQuest", availableQuests.split(DATA_DELIM));

        /* Grab useful information from the response headers if it exists. */
        saveHeaderInfo(response);
    }
}

/*
 * User-Configuration Support.
 * Adds extra HTML forms to the options.php page
 * to allow users to configure the script easily.
 */
function insertOptionsForm()
{
    var leftColumn = doc.getElementsByTagName('td')[7];
    var tableClone = doc.getElementsByTagName('table')[4].cloneNode(true);
    tableClone.id = "roleplay_script_options";

    optionsTableChangeTitle(tableClone, "PARC Roleplaying Script Configuration");
    optionsTableChangeBody(tableClone);
        
    leftColumn.appendChild(doc.createElement('br'));
    leftColumn.appendChild(doc.createElement('br'));
    leftColumn.appendChild(tableClone);
    injectOptionsFunctions(leftColumn);
}

function optionsTableChangeTitle(table, new_title)
{
    var th = table.childNodes[0].childNodes[0].childNodes[0];
    th.innerHTML = new_title;
    th.setAttribute('style', 'background:none repeat scroll 0 0 #600; color:#CCC;');
}

function optionsTableChangeBody(table)
{
    var tbody = table.childNodes[0];
    var optionContents = tbody.childNodes[3];
    var optionsTable = doc.createElement('table');
    var submit_btn = doc.createElement('input');

    submit_btn.type = "submit";
    submit_btn.value = "Save";
    submit_btn.setAttribute('onClick', 'rpApplyOptions([{name:"contentProvider",type:"text"}])');
      
    tbody.childNodes[2].childNodes[0].innerHTML = "<span>Note: settings are universe-specific.</span>";
    optionContents.removeChild(optionContents.childNodes[0]);
    
    optionsTable.appendChild(addCheckBox("markTargets", "Mark quest target on the nav screen."));
    optionsTable.appendChild(addCheckBox("displayObjective", "Add current quest objective text to the nav screen."));
    optionsTable.appendChild(doc.createElement('br'));

    if (availableQuests)
    {
        submit_btn.setAttribute('onClick', 'rpApplyOptions([{name:"currentQuest",type:"select"},{name:"contentProvider",type:"text"}])');
        addSelectBox("Select a different quest (progress will be saved on the server): ", optionsTable, "currentQuest", availableQuests.split(DATA_DELIM));
        optionsTable.appendChild(doc.createElement('br'));
        optionsTable.appendChild(doc.createElement('br'));
    }
    
    /* Display warning if user has not yet selected a quest. */
    if(config.currentQuest === DEFAULT_STORY_NAME)
    {
        var span = doc.createElement('span');
        span.textContent = "You must select a quest from the dropdown and hit save before you can begin playing!";
        span.style.color = "#CC0000";
        optionsTable.appendChild(span);
        optionsTable.appendChild(doc.createElement('br'));
        optionsTable.appendChild(doc.createElement('br'));
    }    
    
    
    addTextBox("Address of the content server:", optionsTable, "contentProvider");

    optionsTable.appendChild(doc.createElement('br'));
    optionsTable.appendChild(submit_btn);

    optionContents.appendChild(optionsTable);
}

function rpApplyOptions(opts)
{
    for (var i =0; i < opts.length; i++)
    {
        if(opts[i].type === "text")
        {
            rpSetOption(opts[i].name, doc.getElementById(opts[i].name).value);
        }
        if(opts[i].type === "select")
        {
            rpSetOption(opts[i].name, doc.getElementById(opts[i].name).options[doc.getElementById(opts[i].name).selectedIndex].value);
        }
    }
    alert("Saved PARC Roleplay Script Settings!");

    /* Should ensure new stageTargets headers are sent if necessary when new options are set. */
    location.reload();
}

function injectOptionsFunctions(parent)
{
        var ribbonScript = "var doc = document;\nvar RP_STORAGE_NAME = '" + RP_STORAGE_NAME + "';\n" + rpSetOption.toString() + "\n" + "\n" + getUniversePrefix.toString() + "\n" + rpApplyOptions.toString() + rpGetValue.toString() + rpSetValue.toString();
        var scriptElement = doc.createElement("script");
        scriptElement.type = "text/javascript";
        scriptElement.innerHTML = ribbonScript;
        parent.appendChild(scriptElement);
}

function rpSetOption(name, value) {
    var options = JSON.parse(rpGetValue(RP_STORAGE_NAME));
    options[name] = value;
    rpSetValue(RP_STORAGE_NAME, JSON.stringify(options));
}

function addSelectBox(text, parent, option, data)
{
    var select = doc.createElement('select');
    var text_tr = doc.createElement('tr');
    var text_td = doc.createElement('td');
    var span = doc.createElement('span');
    var nbsp = doc.createElement("span");
    var options;

    nbsp.innerHTML = "&nbsp;";
    select.id = option;
    select.value = option;
    select.style.width = "300px";

    for(var i = 0; i < data.length; i++)
    {
        options = doc.createElement('option');
        options.textContent = data[i];
        options.value = data[i];
        select.appendChild(options);
    }

    select.value = eval("config." + option);

    span.innerHTML = text;

    text_td.appendChild(span);
    text_tr.appendChild(text_td);
    parent.appendChild(text_tr);
    parent.appendChild(select);
    parent.appendChild(nbsp);
}

function replaceSelectContent(id, data)
{
    var select = doc.getElementById(id);
    var options;

    if(select)
    {
        select.innerHTML = "";

        for(var i = 0; i < data.length; i++)
        {
            options = doc.createElement('option');
            options.textContent = data[i];
            options.value = data[i];
            select.appendChild(options);
        }
        /* Make sure the selected index is set back to our active quest. */
        select.value = eval("config." + id);
    }
}

function addTextBox(text, parent, option)
{
    var text_tr = doc.createElement('tr');
    var input_tr = doc.createElement('tr');
    var td = doc.createElement('td');
    var text_td = doc.createElement('td');
    var text_box = doc.createElement('input');
    var span = doc.createElement('span');
    var nbsp = doc.createElement("span");
    nbsp.innerHTML = "&nbsp;";

    text_box.type = "text";
    text_box.id = option;
    text_box.style.width = "300px";
    text_box.value = eval("config." + option);
    span.innerHTML = text;
    text_td.appendChild(span);
    text_tr.appendChild(text_td);
    td.appendChild(text_box);
    td.appendChild(nbsp);
    input_tr.appendChild(td);
    parent.appendChild(text_tr);
    parent.appendChild(input_tr);
}

function addCheckBox(option, text)
{
    var tr = doc.createElement('tr');
    var td = doc.createElement('td');
    var input = doc.createElement('input');
    var label = doc.createElement('label');
    var br = doc.createElement('br');

    input.id = option;
    input.type = "checkbox";
    input.value = option;
    if(eval("config." + option)) input.checked = true;
    else input.checked = false;
    input.setAttribute('onChange', 'rpSetOption(this.value, this.checked)');

    label.setAttribute('for', option);
    label.innerHTML = text;

    td.appendChild(input);
    td.appendChild(label);
    td.appendChild(br);
    tr.appendChild(td);
    return tr;
}

/* Reimplementations of greasemonkey functions using HTML5 local storage to allow setting of coords and sector during PPR. */
function rpSetValue(name, value)
{
    if (typeof(Storage) !== "undefined")
    {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
}

function rpGetValue(name, defaultValue)
{
    if (typeof(Storage) !== "undefined")
    {
        if (name)
        {
            var value = localStorage.getItem(name);
            if ((!value) && ((defaultValue !== undefined) && (defaultValue !== null)))
                return defaultValue;
            if (!value)
                return null;
            var type = value[0];
            value = value.substring(1);
            switch (type) {
                case 'b':
                    return value == 'true';
                case 'n':
                    return Number(value);
                default:
                    return value;
            }
        }
    }
}