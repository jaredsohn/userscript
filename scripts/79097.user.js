// ==UserScript==
// @name          Toggle YouTube comments visibility (2010)
// @description   Toggles the visibility of YouTube comments. There is a link to hide/show the comments (which are hidden by default).
// @include       http://*.youtube.com/watch*
// @include       http://youtube.com/watch*
// ==/UserScript==

var comment_div = document.getElementById('watch-discussion');
var show_link = document.createElement('a');
var display_txt = "Show comments.";
var hide_txt = "Hide comments.";

show_link.innerHTML = '<a style="margin-top:15px;font-size:1.5em;" name="ftf4u-show-link" id="ftf4u-show-link" href="#ftf4u-show-link">'+display_txt+'</a>';

comment_div.parentNode.insertBefore(show_link.firstChild, comment_div);
document.getElementById('ftf4u-show-link').addEventListener('click', ftf4u_toggle_comments, true);

var toggle = 1;
function ftf4u_toggle_comments(event) {
  if(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  if (!comment_div || !show_link) {return;}
  if (toggle % 2) {
    comment_div.style.display = "none";
    document.getElementById('ftf4u-show-link').innerHTML = display_txt;
    toggle++;
  } else {
    comment_div.style.display = "block";
    document.getElementById('ftf4u-show-link').innerHTML = hide_txt;
    toggle++;
  }
  return false;
}
ftf4u_toggle_comments(false);
