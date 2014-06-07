// ==UserScript==
// @name        Youtube: Show Ratings (on hover)
// @description Show video ratings on Youtube
// @homepageURL https://github.com/arekolek/Youtube-Show-Ratings/
// @namespace   http://arkadiusz.olek.student.tcs.uj.edu.pl/greasemonkey/
// @version     1.2.6
// @include     http://*youtube.com/*
// ==/UserScript==

// MAIN SCRIPT ////////////////////////////////////////////////////////////////////////////////////

var GM_Debug = true;

var BOX_CLASS_NAME = "yt-thumb-clip-inner";

if (unsafeWindow == window)
{
  unsafeWindow = (function() {
    var el = document.createElement("p");
    el.setAttribute("onclick", "return window;");
    return el.onclick();
  }())
}

if(GM_Debug && unsafeWindow.console){
  var GM_log = unsafeWindow.console.log;
}

if(!GM_Debug) {
  var GM_log = function(){};
}

var boxes = Array();
var boxesIds = Array();

// TODO reenable for channel videos

showBars();

function showRating(box)
{
  boxes.push(box);
    
  // Get all related video ids for each video box
  var id = getBoxId(box);
  // Empty id gives random result, we don't want that
  if(id){
    boxesIds.push(id);
    var skip = checkIfAlreadyExists(box);
    if (!skip)
    {
      // Send a request to fetch videos info from YouTube's API to the background page
      callBackVideoLink(box);
    }
  }
}

function showBars()
{
  // Get all video boxes in which to put the rating bar at the bottom
  var tempBoxes = document.getElementsByClassName(BOX_CLASS_NAME);

  for (var i = 0; i < tempBoxes.length; ++i) {
    showRating(tempBoxes[i]);
  }
}

function checkIfAlreadyExists(video_div)
{
  var childDivs = video_div.getElementsByTagName("div");
  for (var i = 0; i < childDivs.length; ++i)
  {
    if (childDivs[i].getAttribute("id") == "ytrp_rating_bar")
    {
      return childDivs[i];
    }
  }
  return false;
}

// Receive the videos info
function callBackVideoLink(box) { // related videos
  var id = getBoxId(box);
  setTimeout(function() {
    GM_xmlhttpRequest({
      method: 'GET',
      url: "http://gdata.youtube.com/feeds/api/videos/" + id + "?v=2",
      onload: function(response) 
      {
        if (response.status == 200) 
        {
          responseXML = new   DOMParser().parseFromString(response.responseText, "text/xml");
          var entry   = responseXML.getElementsByTagName("entry"); //root element of response is entry
          var rating  = entry[0].getElementsByTagName('yt:rating')[0];      // tag name yt:rating holds the ratings
        } 
        else
        {
          return;
        }
        if (rating)
        {
          var num_likes    = parseInt(rating.getAttribute("numLikes"));
          var num_dislikes = parseInt(rating.getAttribute("numDislikes"));

          var i = boxesIds.indexOf(id);
          attachBar(box, num_likes, num_dislikes);
        }
      }
    });
  }, 0);
}

// HELPER FUNCTIONS ///////////////////////////////////////////////////////////////////////////////

// Get all related video ids for each video box
function getBoxId(box)
{
  var anchor;
  var href;
  var params;
  var found;

  try
  {
    // Look for link to video in parent nodes (up to 5 levels up)
    var depthLimit = 5;
    var parent = box.parentNode;
    while(parent.tagName.toLowerCase() != "body" && depthLimit > 0){
      if(parent.tagName.toLowerCase() == "a"){
        anchor = parent;
        break;
      }
      else {
        parent = parent.parentNode;
      }
      --depthLimit;
    }

    if(!anchor){
      throw "Link to video not found, insert empty id";
    }
    
    // Extract video id from link
    href = anchor.getAttribute("href");
    params = (href.split("?")[1]).split("&");
    for (var j = 0; j < params.length; j++)
    {
      if (params[j].substr(0, 2).toLowerCase() == "v=")
      {
        return params[j].substr(2);
      }
    }
    
    throw "Link to video not found, insert empty id";
  }
  catch (err)
  {
    return "";
  }

  return "";
}


// Attaches the rating bar to the top of the element
function attachBar(videoThumb, likes, dislikes)
{
  while (videoThumb.getAttribute("class").indexOf("video-thumb") == -1)
  {
    videoThumb = videoThumb.parentNode;
  }
  if (videoThumb == null) return;
  
  var total = likes + dislikes;
  var totalWidth = videoThumb.offsetWidth;
  
  if (totalWidth > 0)
  {
    var title;
    var ratingDiv = document.createElement("div");
    ratingDiv.setAttribute("id", "ytrp_rating_bar");
    ratingDiv.setAttribute("style", "display: none; position: absolute; top: 0; left: 0; right: 0; height: 5px; background-color: white;");

    if (total > 0)
    {
      title = (Math.round((likes / total) * 10000) / 100) + "% likes (" + ts(total) + " ratings)";
      
      var likesWidth = Math.floor((likes / total) * totalWidth);
      var dislikesWidth = Math.ceil((dislikes / total) * totalWidth);
      
      // Keep white spacing between bars
      if (likesWidth > 0 && dislikesWidth > 0)
      {
        if (likesWidth >= dislikesWidth)
        {
          likesWidth -= 1;
        }
        else
        {
          dislikesWidth -= 1;
        }
      }
      
    
      var likesDiv = document.createElement("div");
      likesDiv.setAttribute("style", "position: absolute; top: 0; left: 0; height: 4px; width: " + likesWidth + "px; background: #060;");
      
      
      var dislikesDiv = document.createElement("div");
      dislikesDiv.setAttribute("style", "position: absolute; top: 0; right: 0; height: 4px; width: " + dislikesWidth + "px; background: #C00;");

      ratingDiv.appendChild(likesDiv);
      ratingDiv.appendChild(dislikesDiv);
    }
    else
    {
      title = "No ratings";
      var noRatingsDiv = document.createElement("div");
      noRatingsDiv.setAttribute("style", "position: absolute; top: 0; left: 0; right: 0; height: 4px;  background: #BBB;");
      
      ratingDiv.appendChild(noRatingsDiv);
    }
    
    // It's easier to hover over the thumb. Title is not used there anyway
    videoThumb.setAttribute("title", title);
    videoThumb.style.position = "relative";
    videoThumb.appendChild(ratingDiv);
    videoThumb.addEventListener('mouseover', OnMouseEvent, false);
    videoThumb.addEventListener('mouseout', OnMouseEvent, false);
  }
}

function OnMouseEvent (event) {
  if (event.type != "mouseover" && event.type != "mouseout") {
    return;
  }
  
  // somehow target and relatedTarget are sometimes not enough
  // so we traverse up to a safe starting point for the lookup
  var node = event.target;
  while(node.tagName.toLowerCase() != "a"){
    node = node.parentNode;
  }
  
  // find the rating bar
  var rb = checkIfAlreadyExists(node);
  if(rb) {
    rb.style.display = event.type == "mouseover" ? 'block' : 'none';
  }
}

// Formats the number with thousand separators
function ts(v)
{
  var val = v.toString();
  var result = "";
  var len = val.length;
  while (len > 3)
  {
    result = "," + val.substr(len - 3, 3) + result;
    len -= 3;
  }
  return val.substr(0, len) + result;
}