// ==UserScript==
// @name       Highlight Unhighlightable Text (Marketing)
// @namespace  http://mturkwiki.net/forums
// @version    0.3
// @description  Allows highlighting of unhighlightable text.
// @match      https://*.mturk.com/*
// @include    https://*.mturkcontent.com/*
// @include    https://s3.amazonaws.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @copyright  2013+, tux_mark_5
// ==/UserScript==
 
function create_href(self)
{
  var text0 = self.innerText;
  var text1 = /^Keyword\: (.*)$/im.exec(text0)[1];
  var div   = document.createElement("div");
   
  div.innerHTML = "Copy"
  div.addEventListener("click", function()
  {
    console.log(text1);
    GM_setClipboard(text1);
  });
  self.appendChild(div);
}
 
function enableTextSelect()
{
  return this.each(function()
  {
    $(this).unbind("mousedown");
    //$(this).css({"color":"blue"});
    create_href(this);
  });
}
 
function gen_search_url(text)
{
  text = text.replace(" ", "+")
  text = "https://www.google.com/search?channel=fs&q=" + text + "&ie=utf-8&oe=utf-8";
  return text;
}
 
if (window.top === window.self)
{
}
else
{
  console.log("Selectoid: activated");
  $j = $(window.self.document);
  $j.extend($.fn.enableTextSelect = enableTextSelect);
  $j.find("h2.text-rep")
        .enableTextSelect()
    .attr("unselectable", "off")
    .css({"-moz-user-select":"auto","-webkit-user-select":"auto","user-select":"auto"});
  console.log("Selectoid: finished");
}