// Brian Shaler's AutoSmile for Flickr
// version 1.0
// 2007.10.21
// Copyright (c) 2007 - Brian Shaler
// Brian's Interwebs: // http://brian.shaler.name/
// Brian's Blog: // http://brianshaler.com/blog/
// brian@shaler.name // Feedback is ALWAYS appreciated!
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// --------------------------------------------------------------------
// ==UserScript==
// @name          Twitter Inspector
// @namespace     http://brian.shaler.name/twitter/inspector/
// @description   Displays profile design settings when you view a Twitter user's profile.
// @include       http://twitter.com/*
// ==/UserScript==

body = document.getElementsByTagName("body")[0];

if (body.id == "profile")
{
  styles = document.getElementsByTagName("style");
  side = document.getElementById("side");

  for (var i = 0; i<styles.length; i++)
  {
    if (styles[i].innerHTML.indexOf("body") > -1)
    {
      pieces = styles[i].innerHTML.split("}");
      for (var j = 0; j<pieces.length; j++)
      {
        pieces[j] = pieces[j].split("\n").join("");
        pieces[j] = pieces[j].split(": ").join(":");
        targ = pieces[j].split("{");
        if (targ.length == 2)
        {
          targ[0] = targ[0].split(" ").join("");
          sub = targ[1].split(";");
          for (var k = 0; k<sub.length; k++)
          {
            key = sub[k].substring(0, sub[k].indexOf(":"));
            val = sub[k].substring(key.length + 1, sub[k].length);
            key = key.split(" ").join("");
            if (targ[0] == "body" && key == "background-color")
            {
              myBackgroundColor = val;
            }
            if (targ[0] == "body" && key == "background")
            {
              myBGImage = "<a href='"+val.substring(val.indexOf("url(")+4, val.indexOf(")"))+"'>Link</a>";
            }
            if (targ[0] == "body" && key == "color")
            {
              myTextColor = val;
            }
            if (targ[0] == "h2.thumb,h2.thumba" && key == "color")
            {
              myNameColor = val;
            }
            if (targ[0] == "a" && key == "color")
            {
              myLinkColor = val;
            }
            if (targ[0] == "#side" && key == "background-color")
            {
              mySideFillColor = val;
            }
            if (targ[0] == "#side" && key == "border")
            {
              mySideBorderColor = val.substring(val.indexOf("#"), val.length);
            }
          }
        }
      }
    }
  }
  div = document.createElement("div");
  div.className = "section";
  side.insertBefore(div, null);
  innerhtml = "<br class='clear' /><div class='section-header'><h1>Profile Settings</h1></div>";
  innerhtml += "<ul class='stats'>";
  innerhtml += "<li><span class='label'>Background</span><span class='stats_count'>"+myBackgroundColor+"</span></li>";
  innerhtml += "<li><span class='label'>BG Image</span><span class='stats_count'>"+myBGImage+"</span></li>";
  innerhtml += "<li><span class='label'>Text</span><span class='stats_count'>"+myTextColor+"</span></li>";
  innerhtml += "<li><span class='label'>Name</span><span class='stats_count'>"+myNameColor+"</span></li>";
  innerhtml += "<li><span class='label'>Link</span><span class='stats_count'>"+myLinkColor+"</span></li>";
  innerhtml += "<li><span class='label'>Sidebar Fill</span><span class='stats_count'>"+mySideFillColor+"</span></li>";
  innerhtml += "<li><span class='label'>Sidebar Border</span><span class='stats_count'>"+mySideBorderColor+"</span></li>";
  innerhtml += "</ul>";
  div.innerHTML = innerhtml;
}

