// ==UserScript==
// @name           Kongregate Wildwest Town Link Helper
// @namespace      tag://kongregate
// @description    Stops links from opening in new windows
// @match        http://www.kongregate.com/games/ClipwireGames/wild-west-town-dev_preview*
// @match        http://www.kongregate.com/games/ClipwireGames/wild-west-town*
// ==/UserScript==

function main()
{
    // Properties for this script
    window.WWT_Properties = {

        version: "1.0",
        authorURL: "http://www.kongregate.com/accounts/elvisclipwire",
        debugMode: false

    };

    function declareClasses()
    {

window.Timer = {

    start: function(timerName)
    {
        var timer = Timer[timerName];
        if (typeof timer == "undefined")
        {
            timer = {name: timerName, start: 0, totalTime: 0, longestTime: 0, numTimes: 0};
            window.Timer[timerName] = timer;
        }
        timer.start = new Date()/1;
    },

    stop: function(timerName)
    {
        var timer = Timer[timerName];
        if (typeof timer == "undefined")
        {
            console.log("Can't stop a timer (" + timerName + ") that wasn't started");
        }
        else
        {
            var elapsed = (new Date()/1) - timer.start;
            timer.totalTime += elapsed;
            if (timer.longestTime < elapsed) {timer.longestTime = elapsed;}
            timer.numTimes++;
            timer.start = 0;
        }
    },

    getTimer: function(timerName)
    {
        var timer = Timer[timerName];
        if (typeof timer == "undefined")
        {
            console.log("Can't get a timer (" + timerName + ") that wasn't started");
        }
        else
        {
            timer.getAverage = function()
            {
                return this.totalTime / this.numTimes;
            }.bind(timer);
        }

        return timer;
    }
};



    // Represents and parses actual WWT link
    // Constructor is either
    // new WWTLink(str)
    //	params:
    //		str - Any string containing a wwt link. The rest of the string will be ignored.

    window.WWTLink = Class.create({
        initialize: function()
        {
            Timer.start("WWTLink init");
            // Capture variable args
            var args = $A(arguments);
            console.log('WWTLink args length: ' + args.length);
            // If there's only one arg, must be link text
            if (args.length == 1)
            {

                var linkURL = args[0];
                console.log('LINK URL: ' + linkURL);
                if (typeof linkURL != "undefined")
                {
                    var match = WWTLink.linkPattern.exec(linkURL);
                    console.log('WWTLink.js match: ' + match);

                    if (match != null)
                    {
                        var paramString = match[0];
                        console.log('WWTLink.js paramstring: ' + paramString);
                        paramString = paramString.replace(/amp;/gi, "");
                        console.log('WWTLink.js paramstring replaces: ' + paramString);
                        var params = paramString.split("\?")[1].split("&");
                        var paramObj = {kv_link: "", kv_poster: "", kv_link_id:""};

                        try
                        {
                            for (var i = 0; i < 3; i++)
                            {
                                if (typeof params[i] == "string" &&  params[i] != "")
                                {
                                    var paramKV = params[i].split("=");

                                    if (typeof paramKV[1] == "string")
                                    {
                                        paramKV[1] = paramKV[1].split(/["'] /)[0].replace(/[^\w]/, "");
                                        paramObj[paramKV[0]] = paramKV[1];
                                    }
                                }
                            }
                        }
                        catch(ex)
                        {
                            console.warn(ex);
                        }

                        this.link = paramObj.kv_link;
                        console.log('WWTLink.js this.link: ' + this.link);

                        this.poster = paramObj.kv_poster;
                        console.log('WWTLink.js this.poster: ' + this.poster);

                        this.linkid = paramObj.kv_link_id;
                        console.log('WWTLink.js this.linkid: ' + this.linkid);
                    }
                }
                else
                {
                    console.warn("Attempted make a wwt link from an undefined URL");
                }
            }
            else
            {
                console.error("Invalid parameters trying to create a WWTLink. ");
                console.error(args);
            }

            Timer.stop("WWTLink init");
        },

        // Generate a url for this link
        getURL: function()
        {
            var wwtURL = "http://www.kongregate.com/games/ClipwireGames/wild-west-town?";

            if (typeof this.link != "undefined")
            {
                wwtURL += "kv_link=" + this.link;
            }
            if (typeof this.poster != "undefined")
            {
                wwtURL += "&kv_poster=" + this.poster;
            }
            if (typeof this.linkid != "undefined")
            {
                wwtURL += "&kv_link_id=" + this.linkid;
            }

            console.log('WWT url: ' + wwtURL);
            return wwtURL;
        },

        getImageSRC: function()
        {
            var imageSRC = WWTLink.defaultImageSRC;
            return imageSRC;
        },

        isValid: function()
        {
            return typeof this.link != "undefined";
        },

        getFormattedWWTLinkText: function(messageFormat)
        {
            try
            {
                console.log('valid? ' + this.isValid());
                if (this.isValid())
                {
                    var newMessage = messageFormat;
                    console.log('newMessage: ' + messageFormat);

                    newMessage = newMessage.replace(/{id}/gi, this.id);
                    newMessage = newMessage.replace(/{line}/gi, "<br>");

                    var fsMatch = /{fs([^}]*)}/.exec(newMessage);
                    var fsMatchCount = 0;
                    while (fsMatch != null)
                    {
                        try
                        {
                            if (fsMatchCount >= 5)
                            {
                                console.warn("Can only match 5 {fs} with math");
                                break;
                            }

                            fsMatchCount++;
                            var fsMatch = /\{fs([^\}]*)\}/.exec(newMessage);
                        }
                        catch (ex)
                        {
                            console.error("Error while formatting - Failed to process FS: " + fsMatch[0]);
                            console.error(ex);
                        }
                    }
                    console.log('WWTLink.js getFormattedWWTLinkText return newmessage: ' + newMessage.trim());
                    return newMessage.trim();
                }
                else
                {
                    console.warn("Tried to get formatted wwt link text from invalid link");
                    return 'Tried to get formatted wwt link text from invalid link';
                }
            }
            catch(ex)
            {
                console.warn("Error encountered in WWTLink.getFormattedWWTLinkText");
                console.warn(ex);
                return 'Error encountered in WWTLink.getFormattedWWTLinkText';
            }
        },

        getFormattedWWTLink: function(messageFormat, linkFormat)
        {
            Timer.start("getFormattedWWTLink");
            console.log('wwtlink.js getFormattedWWTLink messagefmt: ' + messageFormat);
            console.log('wwtlink.js getFormattedWWTLink linkFormat: ' + linkFormat);

            if (typeof messageFormat == "undefined")
            {
                messageFormat = WWT_Helper.getMessageFormat();
            }

            if (typeof linkFormat == "undefined")
            {
                linkFormat = WWT_Helper.getLinkFormat();
            }

            var newMessage = this.getFormattedWWTLinkText(messageFormat).trim();
            console.log('wwtlink.js getFormattedWWTLink newMessage: ' + newMessage);

            try
            {
                var noImage = newMessage.replace(/{image}/gi, "").replace(/<[^>]+>/gi, "").trim();
                console.log('wwtlink.js getFormattedWWTLink noImage: ' + noImage);
                var imageTag = this.getFormattedImageTag();
                console.log('wwtlink.js getFormattedWWTLink imageTag: ' + imageTag);

                var imageIndex = newMessage.indexOf("{image}");
                console.log('wwtlink.js getFormattedWWTLink imageIndex: ' + imageIndex);

                if (imageIndex == -1 || (imageIndex > 0 && imageIndex < newMessage.length - "{image}".length))
                {
                    newMessage = newMessage.replace(/{image}/gi, imageTag).trim();
                    console.log('wwtlink.js getFormattedWWTLink if newMessage: ' + newMessage);

                }
                else
                {
                    if (newMessage.indexOf("{image}") == 0)
                    {
                        newMessage = linkFormat.replace(/{text}/gi, imageTag).replace(/class=\"/, "class=\"game_icon_link ") + " " + linkFormat.replace(/{text}/gi, newMessage);
                    }
                    else
                    {
                        newMessage = linkFormat.replace(/{text}/gi, newMessage) + " " + linkFormat.replace(/{text}/gi, imageTag);
                    }
                    newMessage = newMessage.replace(/{image}/gi, "");
                    console.log('wwtlink.js getFormattedWWTLink if newMessage2: ' + newMessage);
                }

                newMessage = newMessage.replace(/{text-no-image}/gi, noImage);
                newMessage = newMessage.replace(/{url}/gi, this.getURL());
                console.log('wwtlink.js getFormattedWWTLink if newMessage3: ' + newMessage);
                newMessage = "<span class=\"WWTLink\">" + newMessage + "</span>";
            }
            catch(ex)
            {
                console.warn("Error encountered in WWTLink.getFormattedWWTLink");
                console.warn(ex);
            }

            Timer.stop("getFormattedWWTLink");
            console.log('WWTLink.js getFormattedWWTLink newMessage: ' + newMessage);
            return newMessage;
        },

        getImageSRC: function()
        {
            var imageSRC = WWTLink.defaultImageSRC;
            return imageSRC;
        },

        getFormattedImageTag: function()
        {
            var imageSRC = this.getImageSRC();
            var imageTag = WWTLink.defaultImageFormat.replace("{imageSRC}", imageSRC);
            console.log('WWTLink.js getFormattedImageTag: ' + imageTag);
            return imageTag;
        }

    });

    // Parameter text for this parser
    WWTLink.paramText = "url";
    WWTLink.linkPattern = /(?:https?:\/\/www\.kongregate\.com)?(?:\/games\/)?(?:ClipwireGames\/wild-west-town)?(?!\?4217\-op)\?([^,"]*)\b/i;
    WWTLink.defaultImageFormat = '<img style="wwtIcon" src="{imageSRC}" />';
    WWTLink.defaultImageSRC = "http://cdn2.kongregate.com/game_icons/0037/4501/wc.jpg?46171-op";
    WWTLink.defaultMessageFormat = "{image} Wild West Town";
    WWTLink.defaultLinkFormat_v2 = "<a style=\"{linkStyle}\" class=\"WWTLink\" onclick=\"return WWT_Helper.linkClick(event);\" href=\"{url}\" title=\"{text-no-image}\">{text}</a>";



    window.WWT_Helper = Class.create({

        //constructor
        initialize:function(){
            // ChatDialogue is the Kongregate ChatDialogue class that is part of the Kongregate Holodeck
            // See: http://www.kongregate.com/javascripts/holodeck/chat_dialogue.js for readable source
            // We're going to take the normal function that displays a chat message and move it so that
            // we can intercept chat messages and reformat them.

            ChatDialogue.prototype.WWT_displayUnsanitizedMessage = ChatDialogue.prototype.displayUnsanitizedMessage;

            // Define the NEW function that will display chat messages (we call the old function at the end
            // params:
            // user - user name of the user who sent the message
            // message - message text
            // attributes - an object that usually is undefined, but somtimes contains {class: "CSSclassname"} among others
            // options - Mostly for use with private messages
            ChatDialogue.prototype.displayUnsanitizedMessage = function(user, msg, attributes, options)
            {
                console.log('displayUnsanitizedMessage');
                Timer.start("Process Message");

                var originalMsg = msg;
                var wwtLink = new WWTLink(msg);

                if (msg.indexOf("<span class=\"wwtLink\"") == -1 && wwtLink.isValid())
                {
                    var messageFormat = WWT_Helper.getMessageFormat();
                    var linkFormat = WWT_Helper.getLinkFormat();
                    var newMessage = wwtLink.getFormattedWWTLink(messageFormat, linkFormat).trim();

                    console.log('old message: ' + msg);
                    msg = msg.replace(/<a(?:(?!<a class="reply_link).)*<\/a>/i, newMessage);
                    console.log('new message: ' + newMessage);

                    if (msg == originalMsg)
                    {

                    }

                    if (typeof attributes === "undefined")
                    {
                        attributes = {};
                    }

                    if (typeof attributes.class === "undefined")
                    {
                        attributes.class = "";
                    }

                    attributes.class += 'wwtLink';

                    if (msg == originalMsg)
                    {
                        console.warn("Failed to replace wwt link in chat text");
                        console.warn(wwtLink);
                        console.warn($A(arguments));
                    }
                }

                this.WWT_displayUnsanitizedMessage(user, msg, attributes, options);
                Timer.stop("Process Message");
            }

        }
    });

    WWT_Helper.getMessageFormat = function()
    {
        return WWTLink.defaultMessageFormat;
    }

    WWT_Helper.getLinkFormat = function()
    {
        return WWTLink.defaultLinkFormat_v2;
    }
WWT_Helper.loadWWT = function(wwtParam)
{
    console.log('loadWWT');

    try
    {
        // Regex to locate the iframe properties as defined by Kong
        var reg = new RegExp(/var iframe_options = ([^\x3B]+)/g);
        // If Kong has defined the properties we need to scrape from
        console.log('activateGame: ' + activateGame);
        if (typeof activateGame !== "undefined")
        {
            var match = reg.exec(activateGame);

            console.log('match: ' + match);
            if (match != null)
            {
                var wwtLink;
                if (typeof wwtParam === "string")
                {
                    console.log('WWT Param: ' + wwtParam);
                    var wwtLink = new WWTLink(wwtParam);
                }
                else if (typeof wwtParam.isValid === "function")
                {
                    wwtLink = wwtParam;
                }

                // If the link is valid
                if (typeof wwtLink !== "undefined" && wwtLink.isValid())
                {
                    var iframe_options = eval('('+match[1]+')');
                    iframe_options['kv_link'] = wwtLink.link;
                    iframe_options['kv_poster'] = wwtLink.poster;
                    iframe_options['kv_link_id'] = wwtLink.linkid;

                    // Destroy the old iframe and replace with blank one
                    $('gameiframe').replace(new Element('iframe', {"id":"gameiframe","name":"gameiframe","style":"border:none;position:relative;z-index:1;","scrolling":"auto","border":0,"frameborder":0,"width":930,"height":1200,"class":"dont_hide"}));

                    // Set location of new game window
                    $('gameiframe').contentWindow.location.replace("http://wwt-secure.clipwiregames.com/wildwest/pKongregate/index.php?" + Object.toQueryString(iframe_options));
                }
                else
                {

                }

                return false;
            }
        }
    }
    catch(ex)
    {
        console.error("FAILED TO PROCESS LOADWWT");
        console.error(wwtParam);
        console.error(ex);
    }

    return true;
};

WWT_Helper.linkClick = function(eventParam)
{
    try
    {
        var event = eventParam || window.event;
        if (typeof event == "undefined")
        {
            console.warn("Couldn't locate the event for right-click detection");
            return;
        }

        var target;
        if (event.target)
        {
            target = event.target;
        }
        else if (event.srcElement)
        {
            target = event.srcElement;
        }

        if (target.nodeType == 3)
        {
            target = target.parentNode;
        }


        if (typeof target == "undefined")
        {
            console.warn("Couldn't locate the target for right-click detection");
            return;
        }

        var url = target.href;

        if (typeof url == "undefined" || url.length == 0)
        {
            if (target.parentNode.href != "undefined")
            {
                url = target.parentNode.href;
            }
            else
            {
                return true;
            }
        }
        return WWT_Helper.loadWWT(url);
    }
    catch(ex)
    {
        return true;
    }
};
    }

    function bootstrap_wwt_Helper(loadSubFrames)
    {
        // Only run if the script is running in the top frame
        if (top !== self && loadSubFrames != true)
        {
            return;
        }

        if (typeof window._wwt_helper_fails == "undefined")
        {
            window._wwt_helper_fails = 0;
        }

        if (window._wwt_helper_fails >= 10)
        {
            console.warn("WWT Helper could not load.");
            return;
        }

        if (!window._wwt_helper)
        {
            if (typeof holodeck == "undefined" || typeof ChatDialogue == "undefined" || typeof Class == "undefined")
            {
                window._wwt_helper_fails++;
                setTimeout(bootstrap_wwt_Helper, 1000); // 1000ms = 1 second
                return;
            }
            console.info("WWT Link Helper v" + WWT_Properties.version + " trying to start...");
            declareClasses();

            window._wwt_helper = new WWT_Helper();
        }

        console.info("WWT Helper started!");
    }

    bootstrap_wwt_Helper();
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);