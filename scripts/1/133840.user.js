// ==UserScript==
// @name          YouTube Download Button
// @namespace     macca8
// @description	  Inserts a download button on YouTube video pages
// @include       http://www.youtube.com/watch*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
/* 
	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
(function(){var j=$("meta[name=title]").attr("content");var a=i();var e=$('<ul style="list-style: disc inside none !important;" />');for(var b in a){var l=$("<li><strong>"+b+"</strong> &mdash;</li>");for(var k=0;k<a[b].length;k++){l.append(" ").append(a[b][k])}e.append(l)}var c=$('<div id="angelsl-download-area-container" style="height: auto; margin-bottom: 10px; display: none;" />').append($('<div class="yt-rounded" id="angelsl-download-area" style="background: none repeat scroll 0 0 #FFFFFF; border: 0 none; border-radius: 3px 3px 3px 3px; padding:10px; box-shadow: 0 1px 1px #CCCCCC;" />').append("<strong>Download</strong>").append(e)).insertBefore($("#watch-info"));$("#watch-share").after($('<button data-tooltip-text="Download this video" onclick=";return false;" title="Download this video" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" id="watch-angelsl-download" role="button"><span class="yt-uix-button-content">Download</span></button>').click(function(m){m.preventDefault();$(this).toggleClass("active");c.slideToggle("fast")}));function i(){var s=window.wrappedJSObject.yt.playerConfig.args.url_encoded_fmt_stream_map.split(",");var o={};for(var m=0;m<s.length;m++){var r=f(s[m]);var p=d(r.quality);if(!(p in o)){o[p]=[]}o[p].push(h(r))}return o}function f(p){var o={};var n=p.split("&");for(var m=0;m<n.length;m++){var q=n[m].split("=");o[q[0]]=decodeURIComponent(q[1])}return o}function h(n){var m=n.url+"&title="+encodeURIComponent(j);var o="Format ID: "+n.itag+" | Quality: "+n.quality+" | Mime: "+n.type;var p=g(n.type).toUpperCase();return $('<a href="'+m+'" title="'+o+'">'+p+"</a>")}function g(m){var n=/^[-\w+]+\/(?:x-)?([-\w+]+)/.exec(m);if(!n){return"MISSINGNO."}return n[1]}function d(m){switch(m.toLowerCase()){case"hd1080":return"1080p";case"hd720":return"720p";case"large":return"480p";case"medium":return"360p";case"small":return"240p"}return m.toLowerCase()}})();