// ==UserScript==
// @name           XKCD Title
// @namespace      http://greasefire.userscripts.org/scripts/show/27963
// @description    Adds the very important title of the XKCD Strips below the picture.
// @include        http://xkcd.com/*
// @include        http://www.xkcd.com/*
// @exclude        http://xkcd.com/archive
// @exclude        http://www.xkcd.com/archive
// @exclude        http://xkcd.com/store
// @exclude        http://www.xkcd.com/store
// @exclude        http://xkcd.com/about
// @exclude        http://www.xkcd.com/about
// ==/UserScript==

//Get the Image and give it an ID
var image = document.getElementById("contentContainer").getElementsByTagName('img')[0];
image.id = "comic_strip";


// Create a wrapper for the image title text and apply a break before the text
var title_wrap = document.createElement("div");
var title_break = document.createElement("br");
title_wrap.appendChild(title_break);


// Add a bold "Title: "
var title_header = document.createElement("b");
var title_header_content = document.createTextNode("Title: ");
title_header.appendChild(title_header_content);
title_wrap.appendChild(title_header);


// Create the title text and make it invisible by default
var title_text = document.createElement("span");
var title_content = document.createTextNode(image.title);
title_text.appendChild(title_content);
title_text.id = "title_text";


// Hide the title text by default and on mouseOut. Show it on mouseOver.
if (GM_getValue("hideText", "true") == "true"){
  title_text.style.visibility = 'hidden';
  title_wrap.setAttribute('onMouseOver', 'document.getElementById(\'title_text\').style.visibility = \'visible\'');
  title_wrap.setAttribute('onMouseOut', 'document.getElementById(\'title_text\').style.visibility = \'hidden\'');
}


// Add the title to the wrapper and put it after the comic strip
title_wrap.appendChild(title_text);
document.getElementById("comic_strip").parentNode.insertBefore(title_wrap, document.getElementById("comic_strip").nextSibling);






// Option: Disable Title
GM_registerMenuCommand("Toggle title popup", disablePopup);

function disablePopup(){
  var currentSetting = GM_getValue("disabled", "false")
  if(currentSetting == "true"){
    GM_setValue("disabled", "false");
  } else {
    GM_setValue("disabled", "true");
  }
}

// Option: No hidden Text
GM_registerMenuCommand("Toggle hidden text", hideText);

function hideText(){
  var currentSetting = GM_getValue("hideText", "true");
  if(currentSetting == "false"){
    GM_setValue("hideText", "true");
  } else {
    GM_setValue("hideText", "false");
  }
}


//Disable the popup if the user did choose so
if(GM_getValue("disabled", "false") == "true"){
  image.title= "";
}

//.user.js