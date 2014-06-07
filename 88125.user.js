// ==UserScript==
// @name           Instapaper Reader
// @description    Improves the look of articles on Instapaper. Inspired by Safari's Reader.
// @namespace      clintxs@gmail.com
// @include        http://*instapaper.com/text*
// @version        1.0
// ==/UserScript==

var style = document.createElement('style');
style.innerHTML = 'a:link { color: #2970A6; } a:visited { color: #273A7B; } .archiveButton:link { color: #933; } body { background: #333; margin-top: 25px; margin-bottom: 25px; } #gsWrapper { background: #fff; padding: 15px 50px; text-align: justify; }';

document.getElementsByTagName('head')[0].appendChild(style);

document.body.innerHTML = '<div id="gsWrapper">' + document.body.innerHTML + '</div>';