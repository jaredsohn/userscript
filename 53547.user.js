// ==UserScript==
// @name           Facebook EventsUp
// @description    Moves up the Events list to be more visible.
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// ==/UserScript==

// By default, page reload is checked by DOMNodeInserted to be most timely.
// But the event is disabled for a moment immediately after to avoid the avalanche of
// function calls due to bubbling events. I welcome a better suggestion.

function setListener() {
  var content = document.getElementById("content");
  if(!content) { setTimeout(setListener, 300); return; }
  content.addEventListener('DOMNodeInserted',eventsUp,false);
}
function stopListener() {
  var content = document.getElementById("content");
  content.removeEventListener('DOMNodeInserted',eventsUp,false);
}

function eventsUp() {
  stopListener();
  setTimeout(setListener, 300);
  try {
    var events = document.getElementsByClassName("UIUpcoming")[0];
    if(!events) return;
    events = events.parentNode.parentNode.parentNode;
    while(events.parentNode.id != "home_sidebar") events = events.parentNode;
    var sidebar = events.parentNode;
    sidebar.removeChild(events);
    sidebar.insertBefore(events, sidebar.firstChild.nextSibling);
  } catch(err) { return; }
}

eventsUp();
