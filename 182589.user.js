// ==UserScript==
// @name       Expand Trello Cards
// @namespace  http://flipxfx.com
// @version    1.0
// @description  Expands Trello cards for better viewing and editing on bigger screens.
// @match      https://*trello.com/b/*
// @match      https://*trello.com/c/*
// @include      https://*trello.com/b/*
// @include      https://*trello.com/c/*
// @copyright  2013+, flipxfx
// ==/UserScript==

//Add style to expand card and comment textareas
var style = document.createElement('style')
style.type = 'text/css'
style.innerHTML = '.js-text { height: 500px !important; } .window { bottom: auto !important; left: auto !important; margin: 30px auto 30px auto !important; padding: 0 !important; position: relative !important; right: auto !important; top: auto !important; width: 95% !important; } div.window-main-col { width: 80% !important; } div.window-sidebar { width: 15% !important; }';
document.getElementsByTagName('head')[0].appendChild(style);