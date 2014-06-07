// ==UserScript==
// @name        Firefox error image holder
// @namespace   https://twitter.com/leedorian
// @description Replace images those download failed in firefox, like Internet Explorer.
// @version     1
// @run-at      document-end
// @grant       none
// @icon        http://www.thedealchannel.co.uk/common/images/productpage/error_icon.gif
// ==/UserScript==
var allimg = document.getElementsByTagName("img");
for (i=0;i<allimg.length;i++){
    allimg[i].onerror = function(){
        this.style.borderTop="1px solid #333";
        this.style.borderLeft="1px solid #333";
        this.style.borderRight="1px solid #ccc";
        this.style.borderBottom="1px solid #ccc";
        this.style.backgroundColor="#ddd";
        this.style.backgroundImage="url('data:image/gif;base64,R0lGODlhGQAYANUAAFlZWf///2VlZfHx8XZ2duDg4PPz82NjY9zc3Hh4eF9fX8zMzNbW1mlpab+/v/39/ZSUlPv7+8LCwvf395mZmWdnZ25ubsbGxnBwcIaGhltbW97e3l1dXXR0dH5+ftDQ0NjY2OLi4vn5+Xp6enJycoyMjIKCgu/v75CQkKWlpe3t7QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAZABgAAAadQIBwSCwaj8ikEkAhJAkLUlIhCQycRsIgMMkcNYuA+FrUigMikzF1HmMB5vZJUGS03fDtfUMnHhB3VhB6bQV9RX+BioZJiYpnjEqOi4eSgIEhlUodhG0GCUtCcYqfS6OPpUinYg+BqWWdYgUYBa4jRh+BjAK1dwYVRRYGhYe8dw5HJRGymsZiIBxIHiqRRcYXCkoNmkQCKKHg4eJCQQA7')";
        this.style.backgroundPosition="5px 5px";
        this.style.backgroundRepeat="no-repeat";
    }
}