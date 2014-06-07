// ==UserScript==
// @name       Custom emotes... hopefully x_x
// @namespace  http://use.i.E.your.homepage/
// @version    0.11
// @description  Custom emotes
// @match      http://instasynch.com/rooms/Sierra
// @match      http://instasynch.com/rooms/sierra
// @copyright  2012+, You
// ==/UserScript==
(function(){
    document.addEventListener("DOMContentLoaded", function(){
        var emotes = {
            'o-o': { 'url': 'http://i.imgur.com/rH7gBZ2.gif', 'height': 55 },
            'rage':       { 'url': 'http://i.imgur.com/tAQInNX.jpg', 'height': 55 },
            'data':         { 'url': 'http://i.imgur.com/FsLt3aK.gif', 'height': 55 },
            'feelsbadman':       { 'url': 'http://i.imgur.com/4lwg0.png', 'height': 55 },
            'feel':       { 'url': 'http://i.imgur.com/4lwg0.png', 'height': 35 },
            'jii':          { 'url': 'http://i.imgur.com/zG59d7Q.png', 'height': 55 },
            'oooo':    { 'url': 'http://i.imgur.com/ifjt6ru.gif', 'height': 55 },
            'stop':    { 'url': 'http://i.imgur.com/d3cA4Ul.png', 'height': 55 },
            'fresh':    { 'url': 'http://i.imgur.com/mSDGeAp.gif', 'height': 55 },
            '3':    { 'url': 'http://i.imgur.com/Aav23.png', 'height': 55 },
            'cool':    { 'url': 'http://i.imgur.com/oh9I5dq.png', 'height': 55 },
        }

        document.getElementById('chat_list').addEventListener('DOMNodeInserted', function(event) {
            var element = event.target;

            if (element.innerHTML) {
                for (var emote in emotes){
                    var re = new RegExp('/' + emote, 'g');
                    element.innerHTML = element.innerHTML.replace(re,
                        '<img src="' + emotes[emote]['url'] + '" alt="' + emote + '" height="' + emotes[emote]['height'] + '" />');
	        }
	    }
        });