// ==UserScript==
// @name           Kongregate YouTube Link Magics
// @namespace      tag://kongregate
// @description    Makes YouTube links much more tolerable in chat. Builds from Ventero's framework.
// @author        Doomcat
// @version       0.22
// @date            02.06.2011
// @include        http://www.kongregate.com/games/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


/**
 * This is full of dirty awful hacks that I eventually intend to iron out.
 * Until then, don't judge me.
 */


var dom;
var videoArea;
var youtubeVideoInfo;
var youtubeIDs;
var youtubeTooltips;
var canAjax;
var YTLMVersion = 0.22;
var triangleImage = "data:image/gif;base64,R0lGODlhPAA8AKECADMzM////wwNDQwNDSH5BAEKAAIALAAAAAA8ADwAAALBBGKpy+0PkzAo2ouXmCf732xcBZaZOJqqhabry7QuTMszvdo3Xuo77/H9gBfhkAgxHpEhJYVZVC6hBunmSXVYr51sbDtFgrkkL2BMNlfRYRw77X3DqfI5s24n4vO8Pb/m1wYS+JdDKHhyiBiliAWjKOJoCLn4QBnZpXKJWTa4Wcj4KRn0ydlTavqBijLKspqK8cqa6SoLqmELm5Srq8Xb+/V7KzzbqUBc7Iv8t5yM25wH7bwmPVftfJ2cXbw9281aAAA7";
try{
	if(unsafeWindow && unsafeWindow.holodeck){
		dom = unsafeWindow;
	} else {
		dom = this;
	}
}catch(e){
	dom = this;
}

if (window.undefined === console)
{
    console = new function() 
    {
        this.log = function(message){};
        this.info = function(message){};
        this.warn = function(message){};
        this.error = function(message){};
    };
}


function init_youtubeFixer(){
    
    console.log(window.location.href + " " + document.location);
    
    // If no version of the script is running, write down this one
    if (!window.YTLMMaxVersion)
    {
        window.YTLMMaxVersion = YTLMVersion;
        setTimeout(init_youtubeFixer, 1000);
    }
    // If the max version is less than this version, kill it
    else if (window.YTLMMaxVersion < YTLMVersion)
    {
        window.YTLMMaxVersion = YTLMVersion;
        setTimeout(init_youtubeFixer, 1000);
    }
    // If this version is less than the max, kill this one
    else if (window.YTLMMaxVersion > YTLMVersion)
    {
        console.warn("YTLM: Version " + YTLMVersion + " is still installed, but is older than another version installed");
        return;
    }
    
    // If no version of the script is running, this one is
    if (!window.YTLMScriptRunning)
    {
        window.YTLMScriptRunning = true;
    }
    // If a version of the script is already running, kill this one.
    else
    {
        if (YTLMVersion == window.YTLMMaxVersion)
        {
            // TODO: Is a dupe of the script running on the frame of the game, also?
            console.warn("YTLM: Another instance of Version " + YTLMVersion + " attempted to run, but was cancelled.");
        }
        else
        {
            console.warn("YTLM: Version " + YTLMVersion + " failed to run because Version " + window.YTLMMaxVersion + " was already running.");
        }
        return;
    }
    
    
    
	var CRoom = dom.ChatRoom;
    var CDialogue = dom.ChatDialogue;
    videoArea = new VideoBoxArea();
    console.info("YTLM: Kongregate YouTube Link Magics loaded! v" + YTLMVersion);
    
    // Sets up the user command
    GM_registerMenuCommand("Toggle Video Banner", toggleVideoArea);
    
    // Are we able to get data from YouTube?
    if (typeof GM_xmlhttpRequest != 'function')
    {
        canAjax = false;
        console.warn("YTLM: No Greasemonkey Ajax :-(");
    }
    else
    {
        canAjax = true;
        console.info("YTLM: Crossite Ajax Capable! :-)");
    }
    
    // Configure some of the needed ui elements and styles
    setStyles();
    createCornerIcon();
    
    var youtubePattern = /((?:https?:\/\/)?(?:www\.)?youtube.com(?:\/v\/)?(?:\/watch\?v=)?([\w-]*)(?:[\w&#-=]*)?)/gi;
// Need to try this one, too
//    var youtubePattern = /((?:https?:\/\/)?(?:www\.)?youtube.com(?:(?:\/v\/)|(?:\/watch\?v=))([\w-]*)(?:[\w&#-=]*)?)/gi;
    var youtubePatternLocal = /((?:https?:\/\/)?(?:www\.)?youtube.com(?:\/v\/)?(?:\/watch\?v=)?([\w-]*)(?:[\w&#-=]*)?)/i;
    var youtubeLinkFormat = "<a href=\"$1\" class=\"video-$2-link youtube-video-link\" target=\"_new\">{[name]}</a>";
    
    var officialKongLinkPattern = /http:\/\/(?:[a-zA-Z0-9]*)\.kongregate\.com/i;
            
    // This regex was borrowed from: http://www.regexguru.com/2008/11/detecting-urls-in-a-block-of-text/
    var genericLinkFormat = "<a href=\"$1\" target=\"_new\">$1</a>";
    var genericLinkFormatPlusProtocol = "<a href=\"http://$1\" target=\"_new\">$1</a>";
    var genericLinkPattern = /\b(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/gi;
    var genericLinkPatternLocal = /\b((?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$]))/i;

    var protocolPattern = /(?:https?|ftp|file):\/\//i;

    youtubeVideoInfo = new Array();
    youtubeIDs = new Array();

	if(CRoom && CDialogue){
	
		CRoom.prototype = dom.CRprototype||dom.ChatRoom.prototype;

		CRoom.prototype.searchWord = function(a, b){
			var reg = new RegExp("\\b"+b+"\\b");
			return a.match(reg)?true:false;
		};
        CDialogue.prototype.displayUnsanitizedMessageStandard = CDialogue.prototype.displayUnsanitizedMessage;
        CDialogue.prototype.displayUnsanitizedMessage = function(user, msg, attributes, options)
        {
			var f=msg;
            // f now has the text of every message as it comes through
            g=f.replace(genericLinkPattern, '');

            if (f==g)
            {
                // Normal message with no links, just do normal stuff
                this.displayUnsanitizedMessageStandard(user,msg,attributes,options);
            }
            else
            {
                f=f.replace(/&amp;/g, "&");
                g = f;
                
                var lookups = new Array();
                                
                // For every link in the text
                while (result = genericLinkPattern.exec(f))
                {
                    // The text of the url that was in the message
                    var completeLink = result[0];
                    
                    // The HTML tag that will be inserted. Default to the same text
                    var linkTag = completeLink;
                    
//                    console.log("Found link: " + completeLink + " in " + f);
                    
                    
                    // Is it a Youtube Link?
                    if (youtubePatternLocal.test(completeLink))
                    {
                        // Break down YouTube links
                        result = youtubePatternLocal.exec(completeLink);
                        
                        // Parse YouTube ID
                        var youtubeID = result[2];
                        
                        // Set format
                        var linkFormat = youtubeLinkFormat;
                        
                        if (!youtubeVideoInfo[youtubeID])
                        {
//                            lookups.push({type: "youtube", id: result[2]});                        
                            
                            // Fetch info does a lot. Read its comments.
                            fetchInfo(youtubeID);
                            
                            linkFormat = linkFormat.replace("{[name]}", completeLink);
                        }
                        else
                        {
                            linkFormat = linkFormat.replace("{[name]}", youtubeVideoInfo[youtubeID].data.title);
                        }
                        // Create the link HTML tag
                        linkTag = completeLink.replace(youtubePatternLocal, linkFormat);
                    }
                    // Don't do fully specified Kong links because Kong does those
                    else if (!officialKongLinkPattern.test(completeLink))
                    {
                        // Decide what format to use
                        var linkFormat = genericLinkFormat;
                        if (!protocolPattern.test(completeLink))
                        {
                            linkFormat = genericLinkFormatPlusProtocol;
                        }
                        
                        // Create the link HTML tag
                        linkTag = completeLink.replace(genericLinkPatternLocal, linkFormat);
                    }
                    // Tricky business. Replace only the relevant occurrence of the link text
                    var linkStartIndex = f.indexOf(completeLink);
                    g=g.substring(0,linkStartIndex) + g.substring(linkStartIndex).replace(completeLink, linkTag);
                    
                    // Remove this link from the string we use to search for links
                    // Replace it with ### so that the g and f strings are the same length
                    f=f.replace(completeLink, str_repeat("#", linkTag.length));
                }
                
                if (!attributes) attributes = {};
                attributes.class = (attributes.class)?attributes.class+" contains-youtube-link":"contains-youtube-link";
                this.displayUnsanitizedMessageStandard(user,g,attributes, options);
                
                doAjaxLookups(lookups);
            }
		};
	}
}

function setStyles()
{
    var topBorderRadius = "0px";
    var bottomBorderRadius = "10px";

    var chatStyles = ""+
    ".video-box-area {"+
    "display: none;"+
    "position: fixed;"+
    "left: 0px;"+
    "top: 0px;"+
    "overflow: auto;" + 
    "white-space: nowrap;" + 
    "width: 100%;"+
    "background-color: #333333;"+
    "border-bottom: 1px solid #CCCCCC;"+
    "z-index: 5;"+
    "padding: 0.1% 4px;"+
    "-moz-border-radius-topleft: " + topBorderRadius + ";-webkit-border-top-left-radius: " + topBorderRadius + ";" +
    "-moz-border-radius-topright: " + topBorderRadius + ";-webkit-border-top-right-radius: " + topBorderRadius + ";" +
    "-moz-border-radius-bottomleft: " + bottomBorderRadius + ";-webkit-border-bottom-left-radius: " + bottomBorderRadius + ";" +
    "-moz-border-radius-bottomright: " + bottomBorderRadius + ";-webkit-border-bottom-right-radius: " + bottomBorderRadius + ";" +
    "}\n" +
    
    ".contains-youtube-link{}" + 
    
    
    "#corner-icon { " + 
    "position: fixed;" +
    "top: 0px;" + 
    "right: 0px;" + 
    "z-index: 10;" + 
    "color: #FFFFFF;" +
    "}" +
    
    "#corner-icon span{ " + 
    "position: fixed;" +
    "top: 0px;" + 
    "right: 0px;" + 
    "z-index: 15;" + 
    "color: #FFFFFF;" +
    "font-size: 17px;" + 
    "margin: 0px 2px;" + 
    "}" +
    
    "#corner-icon img {" + 
    "position: fixed;" + 
    "top:  0px;" + 
    "right: 0px;" + 
    "z-index: 5;" + 
    "height: 35px;" +
    "width: 35px;" +
    "}" + 
    "";
    
    GM_addStyle(chatStyles);
}

// Debugging function. Remove from release versions.
function listAll(el)
{
    var debugDiv = document.getElementById("debug");
    if (!debugDiv)
    {
        debugDiv = document.createElement("div");
        debugDiv.id = "debug";
        document.body.appendChild(debugDiv);
    }
    for (i in el)
    {
        debugDiv.appendChild(document.createTextNode(i + ": " + el[i]));
        debugDiv.appendChild(document.createElement("br"));
    }
}


// Function to asynchronously fetch a video's title and store it
// Addtionally, once the data returns, it calls the receivedInfo
// function as a callback
function fetchInfo(id)
{
    // Not allowed to Ajax data, so don't bother
    if (!canAjax) {return;}
    
    if (!youtubeVideoInfo[id])
    {
        console.info("YTLM: Fetching info on " + id + " from: " + "http://gdata.youtube.com/feeds/api/videos/" + id + "?v=2&alt=jsonc");
        setTimeout( function(){
            GM_xmlhttpRequest({
                method:"GET",
                url:"http://gdata.youtube.com/feeds/api/videos/" + id + "?v=2&alt=jsonc",
                headers:{
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                    'Accept': 'application/json, text/javascript, text/json'
                    },
                  onload:function(details) {
//                    console.log("loaded ajax");
//                    console.log([
//                      details.status,
//                      details.statusText,
//                      details.readyState,
//                      details.responseHeaders,
//                      details.responseText
//                    ].join("\n"));
                    var dataObj = JSON.parse(details.responseText);
//                    console.log(dataObj);
                    receivedInfo(dataObj,false);
                  },
                  onerror:function(details)
                  {
                    console.error("YTLM: Ajax query failed.");
                    console.log([
                      details.status,
                      details.statusText,
                      details.readyState,
                      details.responseHeaders,
                      details.responseText
                    ].join("\n"));
                  }
            });
        }, 0);
    }
    else
    {
        var dataObj = youtubeVideoInfo[id];
        receivedInfo(dataObj,true);
    }
}

// Used as a callback for fetchInfo
// whenever data is received, we do lots of magic with it
function receivedInfo(dataObj, wasCached)
{

        // If we got a valid data object
        if (window.undefined !== dataObj && window.undefined === dataObj.error)
        {
            
            var youtubeID = dataObj.data.id;
            var youtubeTitle = dataObj.data.title;
            
            // Drop the title into the links in the chat
            $(".video-" + youtubeID + "-link").html(youtubeTitle);

            // Fresh request for a video we haven't seen before
            if (!wasCached)
            {
                youtubeVideoInfo[youtubeID] = dataObj;
            }
            // Request for a video already in our info
            else
            {
                console.log("YTLM: Data was cached for video : " + youtubeID);
            }
            
            // If this video is not already in our box
            // and the video is embedable
            if (!videoArea.getVideoByYoutubeID(youtubeID) && 
                dataObj.data.accessControl.embed == "allowed"
               )
            {
                // Create and add the embed to the video area
                videoArea.addVideo(youtubeID);
            }
            else if (dataObj.data.accessControl.embed == "denied")
            {
                // Let the user know the video could not be embeded
                $(".video-" + youtubeID + "-link").html($(".video-" + youtubeID + "-link").html() + " (Embed Not Allowed)");
            }
        }
        else
        {
            // Unfortunately in this case, we don't even have the
            // id to display a more useful message back to the user
            console.warn("YTLM: Invalid video link");
            return;
        }
}

function doAjaxLookups(lookups)
{
    for (var i in lookups)
    {
        var lookup = lookups[i];
        console.dir(lookup);
        if (lookup.type == "youtube")
        {
            if (youtubeVideoInfo[lookup.id])
            {
                setTimeout(fetchInfo, 500, lookup.id);
            }
            else
            {
                fetchInfo(lookup.id);
            }
        }
    }
}


// Object
function YouTubeTooltip(youtubeID)
{
    this.id = "youtube-tooltip-" + youtubeID;
    this.youtubeID = youtubeID;
    
    this.htmlElement = document.createElement("div");
    this.className = "youtube-tooltip";
    if (youtubeVideoInfo[youtubeID])
    {
        this.title = youtubeVideoInfo[youtubeID];
    }
    else
    {
        this.title = "YouTube Video " + youtubeID;
    }
    
}


function showTooltip(youtubeID, x, y)
{
    if (youtubeTooltips[youtubeID])
    {
        
    }
    else
    {
            createYouTubeTooltip(youtubeID);
    }
}

function createYouTubeTooltip(youtubeID)
{
    youtubeTooltips[youtubeID] = new YouTubeTooltip(youtubeID);
}

var cornerIconSpinning = false;
function createCornerIcon()
{
    var htmlElement = document.createElement("div");
    htmlElement.id = "corner-icon";
    
    var expandVideoAreaText = document.createElement("span");
    disableTextSelect(expandVideoAreaText);
    expandVideoAreaText.appendChild(document.createTextNode("+"));
    htmlElement.appendChild(expandVideoAreaText);
    
    var cornerImage = document.createElement("img");
    cornerImage.src = triangleImage;
    htmlElement.appendChild(cornerImage);
    
    document.body.appendChild(htmlElement);
    
    $(htmlElement).click(
        function()
        {
            toggleVideoArea();
        }
    );
    
}


// Object
function VideoBoxArea()
{
    this.id = VideoBoxArea.prototype.nextID++;
    this.x = 0;
    this.y = 0;
    this.height = 20;
    this.backgroundColor = "#333333";
    this.videoList = new Array();
    
    this.htmlElement = document.createElement("div");
    this.htmlElement.id = "videoBoxArea-" + this.id;
    this.htmlElement.className = "video-box-area";

    document.body.appendChild(this.htmlElement);
        
    
    this.setPosition = function(x,y)
    {
        this.x = x;
        this.htmlElement.style.left = x;
        this.y = y;
        this.htmlElement.style.top = y;
    };
    
    this.addVideo = function(youtubeID)
    {
        var newEmbed = new VideoEmbed(this, youtubeID);
        this.videoList.push(newEmbed);
        youtubeIDs.push(youtubeID);
        this.htmlElement.appendChild(newEmbed.htmlElement);
    };
    
    this.getVideoByYoutubeID = function(youtubeID)
    {
        for (i in this.videoList)
        {
            if (this.videoList[i].youtubeID == youtubeID)
            {
                return this.videoList[i];
            }
        }
        
        return null;
    };
    
    this.hide = function()
    {
        $(this.htmlElement).slideUp();
    };
    
    this.show = function()
    {
        $(this.htmlElement).slideDown();

    };
    
}

VideoBoxArea.prototype.nextID = 0;


// Object
function VideoEmbed(parent, youtubeID)
{
    this.id = VideoEmbed.prototype.nextID++;
    this.youtubeID = youtubeID;
    this.url = "http://www.youtube.com/v/" + this.youtubeID + "?enablejsapi=1&version=3&playerapiid=videoEmbed-" + this.id;
    this.parent = parent;
    this.height = VideoEmbed.prototype.defaultHeight;
    this.width = VideoEmbed.prototype.defaultWidth;
    
    
    this.htmlElement = document.createElement("object");
    this.htmlElement.id = "videoEmbed-" + this.id;
    this.htmlElement.style.height = this.height + "px";
    this.htmlElement.style.width = this.width + "px";
    
    this.params = new Array();
    
    this.params['name'] = document.createElement("param");
    this.params['name'].name = "movie";
    this.params['name'].value = this.url;
    
    this.params['allowFullScreen'] = document.createElement("param");
    this.params['allowFullScreen'].name = "allowFullScreen";
    this.params['allowFullScreen'].value = "true";
    
    this.params['allowScriptAccess'] = document.createElement("param");
    this.params['allowScriptAccess'].name = "allowScriptAccess";
    this.params['allowScriptAccess'].value = "always";
    
    this.params['autostart'] = document.createElement("param");
    this.params['autostart'].name = "autostart";
    this.params['autostart'].value = "false";
    
    this.params['controller'] = document.createElement("param");
    this.params['controller'].name = "controller";
    this.params['controller'].value = "false";
    
    this.embed = document.createElement("embed");
    this.embed.src = this.url;
    this.embed.type = "application/x-shockwave-flash";
    for (i in this.params)
    {
        this.embed[i] = this.params[i].value;
    }
    this.embed.width = this.width;
    this.embed.height = this.height;
    
    for (i in this.params)
    {
        this.htmlElement.appendChild(this.params[i]);
    }
    this.htmlElement.appendChild(this.embed);
    
}

VideoEmbed.prototype.nextID = 0;
VideoEmbed.prototype.defaultWidth = 240;
VideoEmbed.prototype.defaultHeight = 170;


function spinCornerIcon()
{
    var span = $("#corner-icon").find("span");
    if (span.html() == "+")
    {
        span.html("x");
    }
    else
    {
        span.html("+");
    }
    if (cornerIconSpinning)
    {
//        setTimeout("spinCornerIcon();", 100);
//        alert("d");
    }
    else
    {
        if ($(".video-box-area").css("display") == "block")
        {
            span.html("x");
        }
        else
        {
            span.html("+");
        }
    }
}

function showVideoArea()
{
    cornerIconSpinning = true;
    spinCornerIcon();
    videoArea.show("normal", function(){cornerIconSpinning = false;});
}

function hideVideoArea()
{
    cornerIconSpinning = true;
    spinCornerIcon();
    videoArea.hide("normal", function(){cornerIconSpinning = false;});
}


function toggleVideoArea()
{
    if ($(".video-box-area").css("display") == "block")
    {
        hideVideoArea();
    }
    else
    {
        showVideoArea();
    }
}

function disableTextSelect(element){
    if (typeof element.onselectstart!="undefined")
    {
        element.onselectstart = function() {return false;};
    }
    else if (typeof element.style.MozUserSelect!="undefined")
    {
        element.style.MozUserSelect = "none";
    }
    else
    {
        element.onmousedown = function() {return false;};
    }

    element.style.cursor = "default";
}

// Borrowed from: http://www.highdots.com/forums/javascript/character-repeat-235974-2.html
function str_repeat(s, n) {
    var r = '';
    while (n) {
        if (n & 1) r = r + s;
        if (n == 1) break;
        n = n >> 1;
        s = s + s;
    }
    return r;
}

function check(){
	dom.injectScript = dom.injectScript||(dom.injectScript=document.getElementById("injectScriptDiv")?document.getElementById("injectScriptDiv").onclick():0);
	if(dom.injectScript){
		dom.injectScript(init_youtubeFixer, 0);
	} else if(!dom._promptedFramework && !/Chrome/i.test(navigator.appVersion)){
		if(confirm("You don't have the latest version of the framework-script!\n" + 
		           "Please install it, otherwise the scripts won't work.\n" +
		           "Clicking ok will open a new tab where you can install the script"))
			window.open("http://userscripts.org/scripts/show/54245", "_blank");
		dom._promptedFramework = true;
	}
}

setTimeout(check, 0);