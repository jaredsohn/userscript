// ==UserScript==
// @name BTTV Emote Addon
// @namespace #loghorizon
// @version 0.1
// @description Other scripts / addons that adds their own emotes to this menu. 
// @copyright 2011+, Ryan Chatham (http://userscripts.org/users/cletus)
// @icon
// @license Creative Commons; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @grant none
// @include http://*.twitch.tv/*
// @exclude http://api.twitch.tv/*
// @exclude http://*.twitch.tv/*/profile*
// ==/UserScript==

/**    
* Adds custom emotes so that anyone can use (and see) them.    
* @param {object}  emotes                               A array of objects where each emote's options are detailed below as `emote.*`.    
* @param {number}  emote.height                         The emote height, in pixels.    
* @param {number}  emote.width                          The emote width, in pixels.    
* @param {string}  emote.regex                          The regex to parse messages with. Keep it simple.    
* @param {string}  emote.url                            The emote image. This can be a data URI.    
* @param {boolean} [emote.hidden=false]                 Whether the emote should be hidden from the Twitch Chat Emotes menu.    
* @param {string}  [emote.text=null]                    The text to use with Twitch Chat Emotes. Use this if the text doesn't show the correct value on the emotes menu.    
* @param {string}  [channel='Custom Non-Twitch Emotes'] The channel name to show on Twitch Chat Emotes. This should be something unique to your script.    
* @param {string}  [badgeImage=null]                    The badge image to show on Twitch Chat Emotes. SHOULD be 16px x 16px. This can be a data URI.    
*/    
function addCustomEmotes(emotes, channel, badgeImage) {    
    emotes.forEach(function (emoteData) {    
        var emote = {    
            images: [{    
                emoticon_set: null,    
                height: emoteData.height,    
                html: '<span class="emoticon" style="background-image: url(' + emoteData.url + '); height: ' + emoteData.height + 'px; width: ' + emoteData.width + 'px;"></span>',    
                url: emoteData.url,    
                width: emoteData.width,    
            }],    
            regex: new RegExp('\\b' + emoteData.regex + '\\b', 'g'),    
            // Custom attributes to hook into Twitch Chat Emotes.    
            text: emoteData.text || null,    
            channel: channel || 'Custom Non-Twitch Emotes',    
            badge: badgeImage || null,    
            hidden: emoteData.hidden || false    
        };    
        // Add to the page.    
        window.CurrentChat.emoticons.push(emote);    
        window.CurrentChat.default_emoticons.push(emote);    
    });    
}

// Example usage.    
addCustomEmotes([    
    {    
        // The emote.* options.    
        url: 'https://dl.dropboxusercontent.com/u/86808114/BTTV/DerpyDuck.gif',    
        width: 30,    
        height: 30,    
        regex: 'DerpyDuck'    
    } 
    // ...    
], 'BetterTTV Emotes', 'http://cdn.betterttv.net/tags/kappa.png');