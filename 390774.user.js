// ==UserScript==
// @name       Twitch Plays Pokemon Chat Filter
// @namespace  http://www.twitch.tv/twitchplayspokemon
// @version    1.1
// @description  Remove input and spam from Twitch Plays Pokemon
// @match      http://www.twitch.tv/twitchplayspokemon
// @copyright  2014+, xephero, Thekillerwin
// ==/UserScript==

jQuery(function(){
    var commands = ["a", "b", "start", "select", "left", "down", "right", "up", "democracy", "anarchy", "start9", "start8", "start7", "start6", "start5", "start4", "start3", "start2", "start1", "start0", "up0", "up1", "up2", "up3", "up4", "up5", "up6", "up7", "up8", "up9", "right9", "right8", "right7", "right6", "right5", "right4", "right3", "right2", "right1", "right0", "down9", "down8", "down7", "down6", "down5", "down4", "down3", "down2", "down1", "down0", "left9" "left8", "left7", "left6", "left5", "left4", "left3", "left2", "left1", "left0"];
    var insert_chat_line = Chat.prototype.insert_chat_line;
    
    Chat.prototype.insert_chat_line = function(a) {
        if (commands.indexOf(a.message.toLowerCase()) < 0) {
            insert_chat_line.call(this, a);
        }
    };
});