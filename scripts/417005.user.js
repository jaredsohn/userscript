// ==UserScript==
// @name			Doge West
// @author			Diggo11
// @description			wow, such doge, very west
// @match			http://*.the-west.net/game.php*
// @match			http://*.the-west.de/game.php*
// @match			http://*.the-west.pl/game.php*
// @match			http://*.the-west.nl/game.php*
// @match			http://*.the-west.se/game.php*
// @match			http://*.the-west.ro/game.php*
// @match			http://*.the-west.com.pt/game.php*
// @match			http://*.the-west.cz/game.php*
// @match			http://*.the-west.es/game.php*
// @match			http://*.the-west.ru/game.php*
// @match			http://*.the-west.com.br/game.php*
// @match			http://*.the-west.org/game.php*
// @match			http://*.the-west.hu/game.php*
// @match			http://*.the-west.gr/game.php*
// @match			http://*.the-west.dk/game.php*
// @match			http://*.the-west.sk/game.php*
// @match			http://*.the-west.fr/game.php*
// @match			http://*.the-west.it/game.php*
// @match			http://*.the-west.no.com/game.php*
// @exclude			http://*.beta.the-west.net/game.php*
// @version			1.01
// @grant			none
// @run-at			document-end
// @updateURL			http://www.diggo11.com/west/userscripts/dogewest.user.js
// @downloadURL			http://www.diggo11.com/west/userscripts/dogewest.user.js
// ==/UserScript==

/*
    COPYRIGHT
    This script must not be reproduced or repackaged into a multi-purpose tool or similar. Permission is granted to edit and reproduce solely for the purposes of translations or extending the individual functionality of this script, provided it is made available under the same license.
    End users are licensed the right to download the code into their web browser(s) for standard and reasonable usage only.
*/

var script = document.createElement('script');
script.type = 'text/javascript';
script.textContent = '(' + (function () {

    'use strict';

    function textFactoryWow() {
        var element = document.createElement('p');
        element.textContent = 'wow';
        element.style.color = '#F00';
        element.style.position = 'absolute';
        element.style.bottom = '7px';
        element.style.right = '7px';
        element.style.fontSize = '14px';
        element.style.fontFamily = "'Comic Sans MS', 'Comic Sans', cursive";
        element.style.zIndex = '32767';
        element.style.fontWeight = 'bold';
        return element;
    }

    function textFactory(text, colour, top, left) {
        var element = document.createElement('p');
        element.textContent = text;
        element.style.color = colour;
        element.style.position = 'absolute';
        element.style.top = top + 'px';
        element.style.left = left + 'px';
        element.style.fontSize = '14px';
        element.style.fontFamily = "'Comic Sans MS', 'Comic Sans', cursive";
        element.style.zIndex = '32767';
        element.style.fontWeight = 'bold';
        return element;
    }

    function generateStrings(number, data) {
        var firstWords = ['such', 'much', 'very', 'so'];
        var lastWords = [data.playername || data.name, 'player', 'avatar', data.classKey || data.charClass];
        var strings = [];
        for (var i = 0; i < number && firstWords.length > 0 && lastWords.length > 0; i++) {
            var first = firstWords.splice(Math.floor(Math.random() * firstWords.length), 1)[0];
            var last = lastWords.splice(Math.floor(Math.random() * lastWords.length), 1)[0];
            strings.push(first + ' ' + last);
        }
        return strings;
    }

    function generateColours(number) {
        var palette = ['#0F0', '#00F', '#FF0', '#0FF', '#F0F'];
        var colours = [];
        for (var i = 0; i < number && palette.length > 0; i++)
            colours.push(palette.splice(Math.floor(Math.random() * palette.length), 1)[0]);
        return colours;
    }

    function generateText(number, width, height, topOffset, data) {
        var elements = document.createDocumentFragment();
        if (number > 0) {
            elements.appendChild(textFactoryWow());
            if (number > 1) {
                var words = generateStrings(number, data);
                var colours = generateColours(number);
                var segment = height / (2 * (number - 1) - 1);
                for (var i = 0; i < number - 1; i++) {
                    var top = Math.floor(Math.random() * segment + i * 2 * segment) + topOffset;
                    var left = Math.floor(Math.random() * width);
                    elements.appendChild(textFactory(words[i], colours[i], top, left));
                }
            }
        }
        return elements;
    }

    function stringify() {
        return '' +
            generateText.toString() +
            generateColours.toString() +
            generateStrings.toString() +
            textFactory.toString() +
            textFactoryWow.toString();
    }

    (function () {
        // Change top left portrait
        var container = document.querySelector('#user-interface #ui_char_avatar');
        while (container.lastChild)
            container.removeChild(container.lastChild);
        var avatar = document.createElement('img');
        avatar.src = 'http://mattunderation.com/Images/doge.jpg';
        avatar.alt = 'wow';
        avatar.style.width = '136px';
        avatar.style.height = '136px';
        avatar.style.marginTop = '5px';
        container.appendChild(avatar);
        container.appendChild(generateText(3, 70, 70, 15, Character));
    })();

    (function () {
        // Change player profile avatars
        var oldOpen = PlayerProfileWindow.open;
        var source = PlayerProfileWindow.toString().trim();
        var parameters = /^function\s*\(([^\)]*)\)/.exec(source)[1];
        var body = source.replace(/^function\s*\([^\)]*\)\s*{/, '').replace(/\s*}$/, '');
        var hook = 'that.playerid=resp.playerid;';
        body = body.replace(hook, '(' + function () {
            resp.avatar = '<img src="http://mattunderation.com/Images/doge.jpg" />';
        }.toString() + ')(); ' + hook);
        hook = 'that.Main.init();';
        body = body.replace(hook, hook + ' (' + function () {
            that.Main.window[0].querySelector('.profileavatar').appendChild(generateText(4, 90, 110, 0, resp));
        }.toString() + ')(); ' + stringify());
        PlayerProfileWindow = new Function(parameters, body);
        PlayerProfileWindow.open = oldOpen;
    })();

    (function () {
        // Add css to stylesheets
        var tag = document.createElement('style');
        tag.type = 'text/css';
        tag.textContent = '';
        tag.textContent += '#windows .playerprofile .profileavatar { overflow: hidden; }';
        tag.textContent += '#windows .playerprofile .profileavatar img { width: 170px; height: 170px; position: relative; left: -10px; margin: 0 !important; }';
        document.head.appendChild(tag);
    })();

}).toString() + ')()';
document.head.appendChild(script);