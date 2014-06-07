//  Interaction Toolbar script for Conquer Club
//  version 1.0.0
//  2011-04-14
//  Copyright (c) 2011, Daniel Pavlyuchkov (dako.lrd@gmail.com)
//  Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name           Conquer Club - Toolbar
// @namespace      http://userscripts.org
// @version        1.0.0
// @description    Conquer Club interaction toolbar
// @include        http*://*conquerclub.com/*
// @exclude        http*://*conquerclub.com/api.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

const background = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAVCAMAAABWpb9yAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAA8UExURRAQEBcXFzQ0NCoqKiEhIRYWFiYmJhwcHCQkJDMzMy8vLxoaGhMTEzU1NSgoKCwsLBERER4eHjExMRQUFE1bPO8AAAA2SURBVHjaPMFHAoAgAMCwigNZKvj/v9ITCSyfqOIXp9hEEVF0cYhbXOIRu3hFFkMkEUTTFGAAkaUC+U4xqYQAAAAASUVORK5CYII=';
const facebook = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAAXNSR0IArs4c6QAAAFRQTFRFO1uZO1uZO1uZO1uZkqTH2+HsbYW0SGagPl6bdYy40dnn////na3MztbmO1uZbISzR2Wf8/X5hZm/VHCmtsLZ5+vyqbfSYHqskaPGeI65wszf2uDs6B4OVQAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfbBA0WFBp4oMm8AAAAMElEQVQI12PgQwUMuPnc3NzIfG4MPop6flQ+NzeqenQ+unri+WwQwMLNDSSx8FEBAH/KCzcPxX9aAAAAAElFTkSuQmCC';
const twitter = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEDRYUEwF8cRgAAAJqSURBVCjPRZM9a1xXEIafmTP33t2VViuvYsV2sCGG2IQEAiIGF+nsf5A2qdLF4B/j1k26/IGULlyoC4GQDzcWmERowVJWkr2rvV/nnHGxcjwwwxTvMO/MOyM/7h9iRXmrMn28WYRdwbMAIJcO4DgOiC76dNzG/CT23b9G30y2RoNfR6a7p33CRDCFhBMzH8zX5Ttl4EL5/rRu71iXeViZ7L5cdH6lCvLgxogvJiW/n3U8e71i2ed1f3cATtvktzdtt8/yQHPfjuuUEXX5fFLy8NqIWBj3Px7yzUcVpcLIBGTNxsnS5Ezu27GtUqRNGQe2K2XucBwzYsLedMh2ZYjAq0XHb6cNb7LTpswqRezoovaibjiLzioOaTO8SZAcpoXx6dSIDvevDpm3keevF2hWjla1W5+dZUyc1D3nXaRxOI+wwJmxnjMCky3FJDNvOgZSELNjFgJFCJTBCSo0Ceadc6sUPhsIySEDh29b/n7bobrGFyFgpkJQwYISVKmTc945dyq4Xen/Su0vEsddRlQxXWNNZZ2oOr2DAmd95o+lMGsz2QUH9jYG7E1H7B9fEFRQEUxVRVXIIvyzinxrMAnwYpnQywOrM9wdltwYFZQW0KCoqpgKUqqikv3VKskvsyXfXd+gdaFO64UNFCpxfl70RPBCVTSI2Pi/w4PwyXWuVCarjD87aeXPZebqwKiCAE5MzqzumdXJp6WJijA+OTwIX9+7d9Ikv7m9s/PVdGMkW1WgDIGsSo/SuFAnEIGxBaliw/LgxU/F0cFT+eHRY9icDKvYfKnuO3AprrwP/v6xAMRV560N/vLlef0OKwwnIWXD5L4AAAAASUVORK5CYII=';

/**
 * Add script styles
 * 
 */
function addStyles() {
  GM_addStyle('body {margin-top: 21px;}');
  
  GM_addStyle('#cc-toolbar {position: fixed; z-index: 1000; top: 0; margin-left: -2%; height: 21px; width: 100%; background: url(' + background + ') repeat-x scroll left bottom #101010; text-align: left; font-size: 12px; font-family: "lucida grande",tahoma,verdana,arial,sans-serif;}');
  GM_addStyle('#cc-toolbar a, #cc-toolbar h3, #cc-toolbar p {color: white;}');
  GM_addStyle('#cc-toolbar div {float: left; margin: 0;}');
  
  GM_addStyle('#cc-toolbar div h3 {font-size: 0.9em; font-weight: normal; margin: 0; padding: 4px 12px 3px; border-right: 1px solid #323232; text-transform: none; border-bottom: 0;}');
  GM_addStyle('#cc-toolbar div h3 img {width: 15px; vertical-align: top; padding-right: 5px;}');
  GM_addStyle('#cc-toolbar div ul {font-size: 1em; position: absolute; left: auto; margin: 0; padding: 0; list-style: none; display: none; background-color: black; opacity: 0.88;}');
  GM_addStyle('#cc-toolbar div:hover ul {display: block;}');
  GM_addStyle('#cc-toolbar div ul li {background: none repeat scroll 0 0 #202020; opacity: 0.88; width: 160px; border-top: 1px solid #323232;}');
  GM_addStyle('#cc-toolbar div ul li:hover {background-color: #111111;}');
  GM_addStyle('#cc-toolbar div ul li a {text-decoration: none; display: block; padding: 4px 12px 3px; font-size: 0.9em;}');
  GM_addStyle('#cc-toolbar div ul li a span {color: white;}');
  
  GM_addStyle('#cc-toolbar #game-jump {width: 250px;}');
  GM_addStyle('#cc-toolbar #game-jump h3 {float: left;}');
  GM_addStyle('#cc-toolbar #game-jump input {font-size: 10px; height: 8px; margin-top: 3px; width: 60px;');
  
  GM_addStyle('#cc-toolbar #twitter-menu {margin-left: 15%;}');
  
  GM_addStyle('#cc-toolbar #logout {float: right;}');
  GM_addStyle('#logout p {font-size: 0.9em; line-height: 1em; margin: 0; padding: 6px 12px 3px;}');
  
}

$(document).ready(function() {
    // Quit if user is not logged in
    if ($('#username').length > 0) { return; }
  
    // Add toolbar styles
    addStyles();
    
    // Do the magic ;)
    $('body').append('<div id="cc-toolbar"></div>');
    $toolbar = $('#cc-toolbar');
    
    $navigation = $('div.vnav');
    
    $logout = $('<div id="logout"></div>')
        .append($navigation.children('p'));
    $toolbar.append($logout);
    
    
    $gameMenu = $('<div id="game-menu"></div>')
        .append($navigation.children('h3').eq(0))
        .append($navigation.children('ul').eq(0));
    $toolbar.append($gameMenu);
    
    
    $interactionMenu = $('<div id="interaction-menu"></div>')
        .append($navigation.children('h3').eq(0))
        .append($navigation.children('ul').eq(0));
    $toolbar.append($interactionMenu);
    
    
    $personalMenu = $('<div id="personal-menu"></div>')
        .append($navigation.children('h3').eq(0))
        .append($navigation.children('ul').eq(0));
    $toolbar.append($personalMenu);
    
    
    $goto = $('<div id="game-jump"><h3>Jump to game</h3><form method="get" action="http://www.conquerclub.com/game.php"><input type="text" name="game"/></form></div>')
    $toolbar.append($goto);
    
    
    $twitter = $('<div id="twitter-menu"><h3><img src="' + twitter + '" /><a href="http://www.twitter.com/ConquerClub" target="_blank">Follow us on Twitter</a></h3></div>');
    $toolbar.append($twitter);

    
    $facebook = $('<div id="facebook-menu"><h3><img src="' + facebook + '" /><a href="http://www.facebook.com/pages/Conquer-Club/8208257210" target="_blank">Find us on Facebook</a></h3></div>');
    $toolbar.append($facebook);
});