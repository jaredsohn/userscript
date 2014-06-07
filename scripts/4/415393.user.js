// ==UserScript==
// @name        Get Thumbnail Images!
// @namespace   youtube
// @include     *.youtube.com/*
// @version     2.1
// @grant       none
// ==/UserScript==

/*
The MIT License (MIT)

Copyright (c) 2014 0x90

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var script = document.createElement('script');
script.type = 'text/javascript';
script.text = "function GetThumbnail() { var getThumbnail = document.getElementById('watch7-content').children[10].href; window.open(getThumbnail, '_blank'); }";
document.getElementsByTagName('script')[0]

/*function GetThumbnail() { 
    var getThumbnail = document.querySelector('[itemprop="thumbnailUrl"]').href;
    window.open(getThumbnail, '_blank');
}*/

var buttonnode = document.createElement('button');
buttonnode.setAttribute('type', 'button');
buttonnode.setAttribute('name', 'getthumbnail');
buttonnode.setAttribute('class', 'yt-uix-button yt-uix-button-text yt-uix-button-size-default yt-uix-button-has-icon yt-uix-tooltip yt-uix-button-toggled');
buttonnode.setAttribute('id', 'watch-like2');
buttonnode.setAttribute('data-position', 'bottomright');
buttonnode.setAttribute('data-orientation', 'vertical');
buttonnode.setAttribute('data-like-tooltip', 'Get Thumbnail Image!');
buttonnode.setAttribute('data-force-position', 'true');
buttonnode.setAttribute('data-button-toggle', 'true');
buttonnode.setAttribute('data-unlike-tooltip', 'Unlike');
buttonnode.setAttribute('role', 'button');
buttonnode.setAttribute('data-tooltip-text', 'Displays the Thumbnail Image in a new Tab!');
buttonnode.setAttribute("onclick", "GetThumbnail()");

var spannode = document.createElement('span')
spannode.setAttribute('class', 'yt-uix-button-content');
spannode.innerHTML="Grab Thumbnail Image!";

document.head.appendChild(script);
document.getElementById("watch-like-dislike-buttons").appendChild(buttonnode);
document.getElementById("watch-like2").appendChild(spannode);