// ==UserScript==
// @name           abs forumz page claim notifier
// @namespace      http://absf0rumz.com/
// @description    lol
// @include        http://www.absforums.com/?showforum=*
// ==/UserScript==
var TD = document.getElementsByClassName('row2');
var replies = [];
var isNumber = /[0-9]+/g;
var isClaimable = function(number)
{
  if(!isNumber.test(number))
    return false;
  indicator = (parseInt(number)+1)/30;
  if(indicator == parseInt(indicator))
    return true;
  else
    return false;
}
var gup = function(string,name)
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec(string);
  if( results == null )
    return "";
  else
    return results[1];
}
for(i in TD)
{
  try
  {
    node = TD[i].getElementsByTagName('a')[0];
    if(isClaimable(node.textContent) == true)
      replies[replies.length] = node;
  }
  catch(e)
  {
  // z0r
  }
}
for(i in replies)
{
  var thread = replies[i].parentNode.parentNode.getElementsByTagName('td')[2];
  var message = document.createElement('a');
  message.href = "/?act=Post&CODE=02&f=" + gup(window.location.href,'showforum') + "&t=" + gup(thread.getElementsByTagName('a')[0].href,'showtopic');
  message.textContent = "ONE (1) CLAIMABLE PAGES AVAILABLE";
  message.style.fontSize = 'large';
  message.style.fontStyle = 'bold';
  message.style.color = '#f00'
  thread.appendChild(message);
}