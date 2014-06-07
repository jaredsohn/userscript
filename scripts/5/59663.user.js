// ==UserScript==
// @name           Facebook keyboard navigation
// @description    Allows you to navigate around Facebook using your keyboard
// @namespace      FaceKey
// @include        http://www.facebook.com/*
// ==/UserScript==

function OnKeyUp(e)
{
  key_map = {
    "A" : "editapps.php",
    "B" : "events.php?bday=1",
    "C" : "photos",
    "D" : "find-friends",
    "E" : "events.php",
    "F" : "friends/?filter=afp",
    "G" : "groups.php",
    "H" : "home.php",
    "I" : "inbox",
    "L" : "posted.php",
    "M" : "gbd.php",
    "N" : "notes.php",
    "P" : "profile.php",
    "S" : "editaccount.php",
    "T" : "notifications.php",
    "V" : "privacy"
  }

  if (String.fromCharCode(e.keyCode) in key_map && 
      String.trim(e.target.className).length == 0 &&
      (typeof e.target.type == "undefined" || (e.target.type != "text" && e.target.type != "textarea")) && 
      !e.altKey && !e.ctrlKey && e.keyCode <= 90)
  {
    window.location.replace("http://www.facebook.com/" + 
     key_map[String.fromCharCode(e.keyCode)])
  }
}

window.addEventListener("keyup",function(event) { OnKeyUp(event); },false)
