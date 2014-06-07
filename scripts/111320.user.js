// ==UserScript==
// @name       Hide Favorited Items from Metafilter Activity
// @namespace  http://metafilter.com/
// @version    0.2
// @description  Allows you to hide favorited items from your recent activity on Metafilter
// @copyright  2011+, schmod
// @match http://*.metafilter.com/contribute/activity/myfavorites
// ==/UserScript==

//Set up our local storage if we haven't yet done so
if(!localStorage.getItem('hidden')){
localStorage.setItem('hidden',null);
}
    
//A function to help us inject stuff into the main page.
//See http://wiki.greasespot.net/Content_Script_Injection for source
function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run
  document.body.appendChild(script);
}


//Our hide function to inject into the main page
var removeFromActivity = "function removeFromActivity(context){";
removeFromActivity += "var id = $(context).closest('div.copy').attr('id');";
removeFromActivity += "$(context).closest('div.copy').remove();";
removeFromActivity += "var hidden = localStorage.getItem('hidden').split(',');";
removeFromActivity += "hidden.push(id);";
removeFromActivity += "localStorage.setItem('hidden',hidden.join(','));";
removeFromActivity += "}";

contentEval(removeFromActivity);


var removeHREF="<br><span class=\"smallcopy\"><a class=\"remove\" href=\"#\" onclick=\"javascript:removeFromActivity(this);\">(hide from activity)</a></span>";
$('div[style="line-height:150%;width:25%;"]').append(removeHREF);

var hidden = localStorage.getItem('hidden').split(',');
for (var i in hidden){
   $('div#' + hidden[i]).remove();
}


//Add a link to reset hidden items
$('div[style="clear:both;margin-top:30px;margin-bottom:0px;"]').after("<br><div class=\"copy\" style=\"clear:both;margin-top:5px;margin-bottom:0px;\">(<a class=\"remove\" href=\"#\" onclick=\"javascript:r=confirm(\'Restore all hidden items?\');if(r==true){localStorage.removeItem('hidden');location.reload(true);}\">Restore Hidden Items</a>)</div>");