// ==UserScript==
// @name          FriendFeed Retweet Button
// @namespace     http://3on.us/
// @description   Append a retweet button to the end of each twitter entry
// @include       http://friendfeed.com/*
// @author    	Alex Schleber, adapted from Ziru's excellent "Twitter Enhancements: Retweet This"; all changes appear with "// Alex:..." commentary
// ==/UserScript==


// choose the locale by commenting one of the following lines
const locale = '';
//const locale = 'zh-CN';

var gblRetweetTemplate, gblRetweetButtonTitle;

if (locale == 'zh-CN') {
  gblRetweetTemplate = '[è½¬] @%a: %c';
  gblRetweetButtonTitle = 'è½¬å‘';
} else {
  gblRetweetTemplate = 'RT @%a: %c';
  gblRetweetButtonTitle = 'Retweet this';
}

function createButton(target, func, title, width, height, src) {
  var img, button;
  img = document.createElement('img');
  img.width = width;
  img.height = height;
  img.src = src;
  button = document.createElement('a');
  button._target = target;
  button.title = title;
  button.href = '#';
  button.addEventListener('click', func, true);
  button.appendChild(img);
  return button;
}

function GetEntryAuthor(entry) {
  var url = entry.getElementsByClassName('service')[0].href;		// Alex: switched to class "service" for FF support
  var m = /^https?:\/\/twitter.com\/(.*?)\/statuses\/.*$/.exec(url);
  return m[1];
}

function getText(elem) {		// Alex: not sure if this will still work
  var result = '';
  for (var i = 0; i < elem.childNodes.length; i++) {
    var childElem = elem.childNodes[i];
    if (childElem.nodeType == 3)
      result = result + childElem.nodeValue;
    else if ((childElem.nodeType == 1) && (childElem.tagName.toUpperCase() == 'A'))     // remove the html link tag
      if (/^https?:\/\/.*$/.exec(childElem.firstChild.nodeValue))
        result = result + childElem.href;
      else
        result = result + childElem.firstChild.nodeValue;
  }
  return result.replace(/\n/g,'').replace(/^ *\t* */g, '').replace(/ *\t* *$/g, '');
}

function OnRetweetButtonClicked(event, entry) {
  var entryAuthor = GetEntryAuthor(entry);
  var entryContent = getText(entry.getElementsByClassName('text')[0]);  	// Alex: switched to class "text" from "entry-content" for FF support
  var retweetStr = gblRetweetTemplate.replace(/%a/g, entryAuthor).replace(/%c/g, entryContent);
  
// Alex: we know we have to open a new Twitter window/tab since we are coming from FF; removed "status field vs. none" switch logic
//    var m = /^(https?:\/\/twitter.com\/).*$/.exec(document.location.href);

  window.open("http://twitter.com/home?status=" + encodeURIComponent(retweetStr));
  
  //event.preventDefault();
}

function CreateRetweetButton(entry) {
  return createButton(
            null,
            function(event) { OnRetweetButtonClicked(event, entry); },
            gblRetweetButtonTitle,
            13,
            12,
            'data:image/png;base64,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');
}

function addRetweetButtonToEntry(entry) {

// Alex: code added to ferret out if the "from [service]" exists in the entry

var url2 = entry.getElementsByClassName('info')[0].innerHTML;
var m2 = /(from)/.exec(url2);
//alert(m2[1]);

if(m2) {  // Alex: have to test since FF native posts have no "service" identifier, and this otherwise crashes getElementsByClassName

	var url = entry.getElementsByClassName('service')[0].href;		// Alex: we need to test if Twitter entry, else, no button
	var m = /^https?:\/\/twitter.com\/(.*?)\/statuses\/.*$/.exec(url);
}

if(m){

  var actions = entry.getElementsByClassName('info');		// Alex: switched to class "info" for FF support

  var action = actions[0];
  if (action) {
    var button = CreateRetweetButton(entry);
    action.appendChild(button);
    button.style.display = 'inline';
    button.style.margin = '0';
    // entry.addEventListener('mouseover', function(evt) {  button.style.display = 'inline'; }, true);
    // entry.addEventListener('mouseout', function(evt) { button.style.display = 'none'; }, true);
  }
} // end if(m)

}

// =================  MAIN ================= 
var statusBodyElems = document.getElementsByClassName('l_entry');		// Alex: switched to class "l_entry" for FF support
if (!statusBodyElems) return;
for (var i = 0; i < statusBodyElems.length; i++)
  addRetweetButtonToEntry(statusBodyElems[i]);  // Alex: trying taking out the ".parentNode" extension; worked!
