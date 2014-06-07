// ==UserScript==
// @name       Highlight Unhighlightable Text (CrowdSource)
// @namespace  http://mturkwiki.net/forums
// @version    0.2
// @description  Allows highlighting of unhighlightable text.
// @match      https://*.mturk.com/*
// @include    https://work.scalableworkforce.com/*
// @copyright  2012+, tux_mark_5
// @grant      GM_setClipboard
// ==/UserScript==
 
function withPages_jQuery(NAMED_FunctionToRun)
{
  var funcText        = NAMED_FunctionToRun.toString ();
  var funcName        = funcText.replace (/^function\s+(\w+)\s*\((.|\n|\r)+$/, "$1");
  var script          = document.createElement("script");
  script.textContent  = funcText + "\n\n";
  script.textContent += 'jQuery(document).ready(function() {'+funcName+'(jQuery);});';
  document.body.appendChild(script);
};
 
function main0($)
{  
  function create_href(self)
  {
    /*div           = document.createElement("div");
    div.innerHTML = "Copy"
    div.text0     = self.innerText.replace("Keyword: ", "");
    div.addEventListener("click", function()
    {
      GM_setClipboard(div.text0);
    });
    self.appendChild(div);*/
  }
   
  function gen_search_url(text)
  {
    text = text.replace(" ", "+")
    text = "https://www.google.com/search?channel=fs&q=" + text + "&ie=utf-8&oe=utf-8";
    return text;
  }
   
  $.extend($.fn.enableTextSelect = function()
  {
    return this.each(function()
    {
      $(this).unbind("mousedown");
      create_href(this);
    });
  });
   
  $(this).unbind("mousedown");
 
  $("h2.text-rep")
    .enableTextSelect()
    .attr("unselectable", "off")
    .css({"-moz-user-select":"auto","-webkit-user-select":"auto","user-select":"auto"});
   $("span").enableTextSelect()
   .enableTextSelect()
    .attr("unselectable", "off")
    .css({"-moz-user-select":"auto","-webkit-user-select":"auto","user-select":"auto"});
   
  console.log("Selectoid finished");
}
 
if (window.top === window.self)
{
  //withPages_jQuery(main0);
}
else
{
  withPages_jQuery(main0);
}