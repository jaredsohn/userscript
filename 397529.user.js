// ==UserScript==
// @name Hackahackaday
// @version 0.1
// @author Rasz_pl (citizenr@gmail.com)
// @namespace
// @description Highlights new comments since last visit using red box, highlights own comments using green box.
// @include			http://hackaday.com/*
// ==/UserScript==

window.addEventListener("load", myFunction,false);

function myFunction()
{

if (typeof(Storage) != "undefined")
 {

// lets load custom css
  var css = 'li.new-comment-hack { border: 2px solid red !important;} li.your-own-hack { border: 1px solid green !important;}',
  head = document.head || document.getElementsByTagName('head')[0],
  style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet)
   { style.styleSheet.cssText = css; }
  else
   { style.appendChild(document.createTextNode(css)); }

  head.appendChild(style);

// use localStorage to store "URL" = "oldest comment seen" key/value pair

  url_in_storage = localStorage.getItem(document.location.href.match(/(^[^#]*)/)[0]);
//  var url_in_storage = localStorage.getItem("test");
//  alert( url_in_storage ); 

  if (url_in_storage == null)
   { url_in_storage = 2000000000000; }

  my_name_is = document.getElementById("author").value;

  var list = document.getElementsByClassName("commentmetadata");
  var comment_time_oldest = 0
  for (var i = 0; i < list.length; i++)
   {
    var comment_time = Date.parse(list[i].childNodes[1].childNodes[0].nodeValue.replace(" at ", ' '));

    comment_time_oldest = (comment_time > comment_time_oldest) ? comment_time : comment_time_oldest ;
//    if (comment_time > comment_time_oldest)
//     { comment_time_oldest = comment_time }

// this could be easier and faster, but im no js guru and it works so i leave it as is
    current_commenter_name = list[i].parentNode.getElementsByClassName("comment-author")[0].getElementsByClassName("fn")[0].textContent;

    if (my_name_is == current_commenter_name)
     {
      list[i].parentNode.className += " your-own-hack";
     }
    else if (url_in_storage < comment_time)
     {
      list[i].parentNode.className += " new-comment-hack";
     }

   }

  localStorage.setItem(document.location.href.match(/(^[^#]*)/)[0], comment_time_oldest);
//  localStorage.setItem("test", comment_time_oldest);
//  alert( comment_time_oldest ); 

 }
}