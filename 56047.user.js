// ==UserScript==
// @name        vBulletin Thread Text Hover Fix
// @copyright   2009+, GreyWyvern (http://userscripts.org/scripts/show/56047)
// @namespace   http://www.greywyvern.com/
// @version     1.2
// @description Forces display of tooltip previews in vBulletin thread lists, even if the original poster attempted to obsfucate their content by eg. wrapping it in quote BBCode.
// @license     BSDL; http://www.opensource.org/licenses/bsd-license.php
// @include     http://*/search.php?*
// @include     http://*/forumdisplay.php?*
// ==/UserScript==

/* ********************************************************************
 **********************************************************************
 * vBulletin Thread Text Hover Fix - v1.2
 *   Copyright (c) 2009 - GreyWyvern
 *
 *  - Licenced for free distribution under the BSDL
 *          http://www.opensource.org/licenses/bsd-license.php
 *
 * When viewing the thread list on vBulletin pages, the text of a post
 * is visible as a tooltip when hovering over each entry.  Crafty users
 * can hide this text by wrapping their first post in quote BBCode.
 * This script will fill in the tooltip regardless of what users do to
 * try and obsfucate their posts.
 *
 */
window.addEventListener('load', function() {
  var throbber = document.createElement('img');
      throbber.src = "data:image/gif;base64,R0lGODlhEAAQAPQAAP///wAAAPj4+Dg4OISEhAYGBiYmJtbW1qioqBYWFnZ2dmZmZuTk5JiYmMbGxkhISFZWVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==";
      throbber.style.lineHeight = "0px";
      throbber.style.verticalAlign = "middle";

  var http = [], threads = document.getElementById('threadslist');
  if (threads) {
    for (var x = 2; x < threads.rows.length; x++) {
      if (threads.rows[x].cells.length >= 6) {
        if (threads.rows[x].cells[2].title.length <= 10) {
          if (threads.rows[x].cells[2].getElementsByTagName('a')[0].href.indexOf("showthread") > -1) {

            // Add throbber icon
            threads.rows[x].cells[2].getElementsByTagName('div')[0].appendChild(throbber.cloneNode(false));

            var index = http.push(new XMLHttpRequest()) - 1;
            http[index].open("GET", threads.rows[x].cells[2].getElementsByTagName('a')[0].href, true);
            http[index].onreadystatechange = (function(index, td) { return function() {
              if (http[index].readyState == 4) {
                var posts = http[index].responseText.replace(/[\n\r]/g, " ").split(/<a class="bigusername" href="[^"]+">/);

                var y = 1, user = posts[y].replace(/([^<]+)<[\s\S]+$/g, "$1"), message = "";
                do {
                  var start = posts[y].indexOf('<!-- message -->');
                  var end = posts[y].indexOf('<!-- / message -->') - start;

                  var output = posts[y].substr(start, end);
                  output = output.replace(/<img[^>]+?src="([^"]+)"[^>]+?>/g, "$1");
                  output = output.replace(/<[^>]+?>/g, "");
                  output = output.replace(/\s\s+/g, " ");

                  message += output;
                  if (message.length > 300) message = message.substr(0, 290) + "...";

                  

                } while (message.length < 295 && user == posts[++y].replace(/([^<]+)<[\s\S]+$/g, "$1"));

                td.title = message;
                td.getElementsByTagName('div')[0].removeChild(td.getElementsByTagName('div')[0].lastChild);
              }
            }})(index, threads.rows[x].cells[2]);
            http[index].send({});
          }
        } else {
          var imgs = threads.rows[x].cells[2].title.match(/(https?:\/\/[a-z0-9\.]+\/\S+?\.(jpg|gif|png))/ig);
          if (imgs) {
            threads.rows[x].cells[2].addEventListener('mouseover', function(e) {
              var self = this;

              clearTimeout(this.hide);

              try {
                document.body.removeChild(this.popup);
                if (this.mousemove)
                  this.removeEventListener('mousemove', this.mousemove, false);
                if (this.mouseout)
                  this.removeEventListener('mouseout', this.mouseout, false);
                if (this.click)
                  this.removeEventListener('click', this.click, false);
              } catch(e) {}

              this.imgs = this.title.match(/(https?:\/\/[a-z0-9\.]+\/\S+?\.(jpg|gif|png))/ig);
              this.popup = document.createElement('img');
              this.popupon = false;
              this.popup.index = 0;
              this.popup.src = this.imgs[this.popup.index];

              this.popup.style.position = "absolute";
              this.popup.style.top = (e.clientY + 20 + document.documentElement.scrollTop) + "px";
              this.popup.style.left = (e.clientX + 12) + "px";
              this.popup.style.maxHeight = "360px";
              this.popup.style.maxWidth = "480px";

              if (this.imgs.length > 1) {
                this.click = function() {
                  if (!this.popup.complete) return false;
                  if (++this.popup.index >= this.imgs.length) this.popup.index = 0;
                  this.popup.src = this.imgs[this.popup.index];
                };
                this.addEventListener('click', this.click, false);
              }

              document.body.appendChild(this.popup);
              this.popupon = true;

              this.mousemove = function(e) {
                self.popup.style.top = (e.clientY + 20 + document.documentElement.scrollTop) + "px";
                self.popup.style.left = (e.clientX + 12) + "px";
              };
              this.mouseout = function() {
                self.hide = setTimeout(function() {
                  if (self.popupon) {
                    document.body.removeChild(self.popup);
                    self.removeEventListener('mousemove', self.mousemove, false);
                    self.removeEventListener('mouseout', self.mouseout, false);
                    if (self.click)
                      self.removeEventListener('click', self.click, false);
                    self.popupon = false;
                  }
                }, 30);
              };

              this.addEventListener('mousemove', this.mousemove, false);
              this.addEventListener('mouseout', this.mouseout, false);
            }, false);
          }
        }
      }
    }
  }
}, false);