// Last.fm top fan highlighter (FOR FIREFOX 1.5 ONLY!  THIS WON'T WORK IN 1.0)
// See: http://afternight.org/nick/greasemonkey/last.fm.topartists.ff1.0.user.js

// ==UserScript==
// @name          Last.fm  top fan highlighter
// @namespace     tag:http://www.afternight.org/nick
// @description   Puts a red star next to an artist if you're the top fan for that artist
// @include       http://www.last.fm/user/*/charts/&charttype=overall&subtype=artist
// ==/UserScript==


/*
BEGIN LICENSE BLOCK
Copyright (C) 2005 Nick Lanham nick at afternight dot org

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
 */


(function() {

  var top_artists;
  var i = 0;
  var unloaded = false;

  window.addEventListener("unload", function(e) {
    unloaded = true;
  }, false);

  function xpath(query,node) {
    return document.evaluate
      (query, node, null,
       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  }

  function doRequest() {

    if(unloaded) return; // don't keep going if we unloaded the page

    var art_div = top_artists.snapshotItem(i);

    var lnk = xpath("A",art_div);
    lnk = lnk.snapshotItem(0);
    lnk.style.color = "#9b3f26";

    var href = xpath("A[@href]",art_div);
    href = href.snapshotItem(0)+"";
    if(href.indexOf("musicpages") > 0)  // weird style link
      href+="fans";
    else
      href+="/+fans";

    GM_xmlhttpRequest({
      method:"GET",
      url:href,
      onload:function(details) {
	var txt = details.responseText;
	var spos = txt.indexOf('<div id="togglelist"');
	if(spos > 0) {
	  txt = txt.substring(spos);
	  txt = txt.substring(0,txt.indexOf('<div id="LastContextSidebar">'));
	  var mstr = 'href="/user/'+me+'/"([^>]*)>'+me;
	  if(txt.match(mstr)) {
	    art_div.parentNode.previousSibling.previousSibling.firstChild.style.background = 
	      "url(data:image/gif;base64,R0lGODlhFQAUAKU/AP8gCf8jC/8tEP8tEf81E/85GP88G/9gNv5hOv9jOv9oQ/9ySf91TP97UP99Vf+DXv+KY/+Wbv2ZdP+be/+ddv+lhP+lhf6ujP+ujv+yjf+5nf69nvrGqfrHsP/KtP/Ptt/cy9vgz//Sv97j0uHk1ePm1OLm2OTo2//fz//f0v/g0ufq3unr4f7j1+ru5O3w4+3w5/3q3P/q3//q4PDx6v7r5Pbw6PL07PP18Pn07/b48/n59vr7+fv7+fz8/P///yH+FUNyZWF0ZWQgd2l0aCBUaGUgR0lNUAAsAAAAABUAFAAABsnAn1DIc5lCyKQyOfS5ltCl0HdEmmBYFika+lGtOqFkI7yNoL8VkjWcDQrDXjWpQ56GPwsAIIqfkywhID14CnsQeDRQHRgOjgsCewQLjg81f0k2FwMBe56fBzlqSmEeBJ+eAgotPzBLYT8yBqgAiEKuSjhDE7QpQ4FKbEKGqBVDW0hqIz4/M5ECEQ2RDGWkaz8ZAgkqQhoCCD4+yEg/J0gvHxfMQygUclI8ZyAc63gxJWg/O5gsNzo6NMxFGcJDIJd8Q3SswHQwRBAAOw%3D%3D) top left no-repeat #DBE0CF";
	  }
	}
	lnk.style.color = "#564b42";
	i++;
	if(i < top_artists.snapshotLength) 
	  doRequest();
      }
    });
  }
  
  var me = xpath("//H1[@class='h1user']/text()",document);
  me = me.snapshotItem(0).nodeValue;

  var top_artists = 
    xpath("//DIV[@class='lastChart']//TD[@class='chartlabel']/DIV",document);

  doRequest();

})();
