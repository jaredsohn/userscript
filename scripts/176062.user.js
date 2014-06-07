// ==UserScript==
// @name       YOUTUBE related vids LIKES/DISLIKES
// @version    1
// @description  Loads the likes/dislikes of videos on the thumbnail
// @match      http://www.youtube.com/*
// @copyright  2013+, You
// ==/UserScript==
var loaded = {};
var containerName="yt-thumb-default"
loaded[""] = true;
window.addEventListener (
    'scroll',
    function (e) {
      iterateClips(document.getElementsByClassName(containerName));
    },
    false);
var wm = document.getElementById("watch-more-related");
if (wm) {
  // On "Load More Suggestions" button click
  wm.addEventListener (
    'DOMNodeInserted',
    function (e) {
      iterateClips(e.target.getElementsByClassName(containerName));
    },
    false);
}
// starts here 
iterateClips(document.getElementsByClassName(containerName));
function iterateClips(clips)
{
  if (clips)
  {
    for (var i=0; i<clips.length; ++i) 
      if (isVisible(clips[i])) 
        requestRating(clips[i]);
  } 
}
function requestRating(box)
{ 
  var id = getVideoId(box);
  if (loaded[id])
    return;
  loaded[id] = true;
  setTimeout( function() {
    GM_xmlhttpRequest({
      method: 'GET',
      url: "http://gdata.youtube.com/feeds/api/videos/" + id + "?v=2&alt=json&fields=yt:rating",
      onload: function(response) 
      {
        if (response.status == 200) 
        {
          var rsp = eval( '(' + response.responseText + ')' );
          if (rsp && rsp.entry && rsp.entry.yt$rating)
            attachBar(box, parseInt(rsp.entry.yt$rating.numLikes),
                           parseInt(rsp.entry.yt$rating.numDislikes));
        } 
        else
          delete loaded[id]; // give it a chance to reload while scrolling 
      }
    });
  }, 0);
}
function getVideoId(box)
{
  var anchor=box.parentNode.parentNode;
  var isAnchorFound = 2;
  while (anchor && anchor.tagName != undefined) 
  {
    if (anchor.tagName.toLowerCase()=="a")
      break;
    anchor = anchor.parentNode; 
    --isAnchorFound;
    if (0==isAnchorFound)
      break;
  }
  if ( isAnchorFound>0 )
  {
    var href = anchor.getAttribute("href");
    if (href)
    {
      var id = href.replace(/.*v=([^&]*).*/, "$1");
      if (id.length<href.length) 
        return id;
    }
  }
  return "";
}
function attachBar(videoThumb, likes, dislikes) 
{
  var total = likes + dislikes;
  if (total > 0)
  {
    var ratingDiv = document.createElement("div");
    ratingDiv.setAttribute("class", "video-extras-sparkbarks");
    ratingDiv.setAttribute("style", "position: relative; top: 1px;" );
    ratingDiv.setAttribute("title",  likes + " likes, " + dislikes + " dislikes");

    var likesDiv = document.createElement("div");
    likesDiv.setAttribute("class", "video-extras-sparkbar-likes"); 
    likesDiv.setAttribute("style", "width: "+(100*likes)/total+"%"); 

    var dislikesDiv = document.createElement("div");
    dislikesDiv.setAttribute("class", "video-extras-sparkbar-dislikes"); 
    dislikesDiv.setAttribute("style", "width: "+(100*dislikes)/total+"%;"+"background: #C00;"); 

    ratingDiv.appendChild(likesDiv);
    ratingDiv.appendChild(dislikesDiv);
    videoThumb.parentNode.parentNode.appendChild(ratingDiv);
    //videoThumb.appendChild(ratingDiv);

    // fixing time element position to be inside of the thumb image
    var spans = videoThumb.parentNode.parentNode.getElementsByTagName("span");
    for (var i=0; i<spans.length; ++i )
      if (spans[i].getAttribute("class")=="video-time")
      {
        spans[i].style.bottom = "6px";
        break;
      }
  }
}
function isVisible ( el )
{
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}