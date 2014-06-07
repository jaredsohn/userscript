// ==UserScript==
// @name          Download from YouTube
// @description   Adds FLV, MP4, 3GP, and 720p download links to YouTube.
// @include       http://*.youtube.com/watch*
// @include       http://youtube.com/watch*
// @copyright      JoeSimmons
// @version        1.0.4
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

// addGlobalStyle
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function main() {
// Getting t
var t = document.getElementById('movie_player').getAttribute('flashvars').split('&t=')[1].split('&')[0];

// Getting video id
var id = location.href.split('?v=')[1].split('&')[0] || location.href.split('&v=')[1].split('&')[0];

// Set the basic download url to add formats to it later
var url = 'http://youtube.com/get_video?video_id='+id+'&t='+t;

addGlobalStyle('.spaced { padding: 2px !important; }');

// Flv download
var dflv = document.createElement('a');
dflv.textContent = 'FLV';
dflv.setAttribute('rel', 'nofollow');
dflv.setAttribute('class', 'actionLink spaced');
dflv.href = url;

// 3gp download
var d3gp = document.createElement('a');
d3gp.textContent = '3GP';
d3gp.setAttribute('rel', 'nofollow');
d3gp.setAttribute('class', 'actionLink spaced');
d3gp.href = url + '&fmt=17';

// Mp4 download
var dmp4 = document.createElement('a');
dmp4.textContent = 'MP4';
dmp4.setAttribute('rel', 'nofollow');
dmp4.setAttribute('class', 'actionLink spaced');
dmp4.href = url + '&fmt=18';

// 720p HD download
var d720p = document.createElement('a');
d720p.textContent = '720p';
d720p.setAttribute('rel', 'nofollow');
d720p.setAttribute('class', 'actionLink spaced');
d720p.href = url + '&fmt=22';

var save_as = document.createElement('span');
save_as.setAttribute('style', 'color: #aaa;');
save_as.textContent = " (Right click and Save Link As)";

var clip = document.createElement('span');
clip.innerHTML = "<img src=\"data:image/gif;base64,R0lGODlhEAAQAPemADZqu3uj4nSd3Pf6/Xmi4Xqj4+jw+vf6/vH2/Nvn93eg3m2SyzpuvXqj4uHs+TRntHih4Ddsu3qj4Xuj4TJhpzZru3uk4tnl977R7L3Q7HKb2ePt+e7z++3y+6G43Nvm9/P3/fb6/WqTz+/0/Hqk49jl9vP4/WySyzZqtzVotbvQ7+rx+8LV8rrQ7unx+vb6/szd9TNjrZ+64Xeg37bM7nqi4Onw+vf7/jJhqjhsuzFgqN3o+DVotmeOyWaNyUN0vUR0v77S8I6r1anC50JyvHWe3tvn+HyayO70+3mYx9/p+Pj6/jJhqZq13Xqi4lOAxVyHyICq6TJiqzJiqjVotzhsuoqn1OXt+nCZ1naf3tHg9n2m5jNkrzRlsWiQzYqn0mmQymWNyfL2/GmRzOLs+U58wsnc9DxoqoGezIqo1T9rrbPK7cfZ9KS+5IGi0zJjrLbI4e70/Huk44Sjzjptu36o6DJhqLjO79Df9mSLx36o53Sc2jRms0N0wHef3mWMyF+DuvD1/DRmsq3G63af3TZququ/3evx+3qi4d/p+WWNyjNlsNHf9m2W0zlsvHybya3F6pWw2kFzvzhru8XY8nOb2jNkrnGZ2HSe3cPV73ii4HOb2erw+jtuvdHg93Kc232n5/b5/WSMyMLcv4jAYvj7/vb29gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAKYALAAAAAAQABAAAAj/AD2kgdKHQYQKAAA46kQHSB44ptxo8VTqRqhAnDqEGnBICYYxhp4wivIihCgOK8SUQkDGSIsMPyThqYMAgSgXSAaEMrDjg4RMKBjA0GPAgA8bJpaMSJTggqYhPCKYAeXAwYY4A0BcaVpCQZsHFdhsERWmx4kFYP6IWrtHBh8AlOQUIGEhwAQCM7Jg+iSgSRcALAoUCBDAAgEICooIqLQpEhcAQRo0kGAXgh9CAjRcwiIkRiEVTkqJHk260Rcpk+4QOECqtevWoUTMwZGDBqIDo3Lrzh3KCxo7VdbUYP3adShFjyiUGQSJtPNSR5KosbKACJUUDwQtsvRmChMdFM4AAgoIADs=\"> Download:";

var wpd = document.getElementById('watch-player-div'),
	div = document.createElement('div');
	
div.setAttribute('style', 'padding:4px;');
div.setAttribute('id', 'downloadfromyoutube');

div.appendChild(clip);
div.appendChild(dflv);
div.appendChild(dmp4);
if(document.getElementById('movie_player').getAttribute('flashvars').indexOf('&fmt_map=22/2000000/9/0/115')!=-1) {
div.appendChild(d720p);
}
div.appendChild(d3gp);
div.appendChild(save_as);
wpd.appendChild(div);
}

window.addEventListener('load', main, false);