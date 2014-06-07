// ==UserScript==
// @name        Youtube Video Ratings with Like Strength
// @description Shows the rating as well as the ratio of likes per views (Like Strength) below each video's thumbnail.
// @namespace   http://userscripts.org/scripts/show/154285
// @updateURL   https://userscripts.org/scripts/source/154285.meta.js
// @downloadURL https://userscripts.org/scripts/source/154285.user.js
// @version     1.0.12
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// ==/UserScript==
GM_addStyle(".video-time { margin-bottom: 3px;} .yt-uix-simple-thumb-related > img {margin-bottom: -27px !important;} a.related-video { padding-bottom: 11px !important; margin-bottom: -11px !important; } .lsLines { opacity: 0; } .lsLines:hover { opacity: .6; } .channels-browse-content-grid .channels-content-item { height: 167px } .yt-thumb-default-288 + span + button + div > .lsLines { background-size: 288px 4px; } .yt-thumb-default-194 + span + button + div > .lsLines { background-size: 194px 4px; } .yt-thumb-default-185 + span + button + div > .lsLines, .yt-thumb-feed-185 + span + span + div .lsLines { background-size: 185px 4px; } .yt-thumb-default-160 + img + span + div > .lsLines { background-size: 160px 4px; } .yt-thumb-default-40 + span + span + span + span + div .lsLines { background-size: 157px 4px; } .yt-thumb-default-106 + span + button + div > .lsLines { background-size: 106px 4px; } .yt-thumb-default-138 + span + button + div > .lsLines { background-size: 138px 4px; } .yt-thumb-default-120 + span + button + div > .lsLines, .yt-thumb-default-224 + span + div > .lsLines { background-size: 120px 4px; } .yt-thumb-default-76 + span + span + span + div .lsLines { background-size: 76px 4px; } .yt-thumb-default-64 + div > .lsLines { background-size: 64px 4px; } .feed-item-thumb.watched .ux-thumb-wrap {opacity: 1 !important;} .ux-thumb {background-color: white !important;} .feed-item-thumb.watched .ux-thumb-wrap img {opacity: .4 !important;} .feed-item-thumb.watched .ux-thumb-wrap img:hover {opacity: 1 !important;} .feed-thumb-watched {opacity: .5 !important;} .video-response .video-extras-sparkbarks {width: 26% !important;} .video-extras-sparkbar-likes {border-right: 0px !important}");
var loaded = {};
var containerName="yt-thumb-default";
var rightnow = new Date().getTime();
loaded[""] = true;
window.addEventListener (
  'scroll',
  function (e) {
    iterateClips(document.getElementsByClassName('yt-thumb-default'));
    iterateClips(document.getElementsByClassName('video-time'));
  },
  false);
var wm = document.getElementById("watch-more-related");
if (wm) {
  // On "Load More Suggestions" button click
  wm.addEventListener (
    'DOMNodeInserted',
    function (e) {
      iterateClips(e.target.getElementsByClassName('yt-thumb-default'));
      iterateClips(e.target.getElementsByClassName('video-time'));
    },
    false);
}
// starts here 
iterateClips(document.getElementsByClassName('yt-thumb-default'));
iterateClips(document.getElementsByClassName('video-time'));
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
  // Added "yt:statistics" and "published" for the view count and date. It barely increases the download.
      url: "http://gdata.youtube.com/feeds/api/videos/" + id + "?v=2&alt=json&fields=yt:rating,yt:statistics,published",
      onload: function(response) 
      {
        if (response.status == 200) 
        {
          var rsp = eval( '(' + response.responseText + ')' );
          if (rsp && rsp.entry && rsp.entry.published && rsp.entry.yt$statistics && rsp.entry.yt$rating)
            attachBar(box, String(rsp.entry.published.$t),
                           parseInt(rsp.entry.yt$statistics.viewCount),
                           parseInt(rsp.entry.yt$rating.numLikes),
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
function attachBar(videoThumb, published, views, likes, dislikes) 
{
  var paused;
  var waitStyle = "";
  var likeStrength = 0;
  var total = likes + dislikes; 
  if (total > 0)
  {
// Check if YouTube's counter is paused at around 301 (it's a method they use to prevent spam)
    if (!(views < total) && (views >= 301) && (views <= 320))
    {  
      var daysAgo = (rightnow - new Date(published).getTime())/1000/60/60/24;
      if (daysAgo <= .5) 
      {
        var paused = true; 
        var likeStrengthMsg = ", View Counter Off";
      // Change the color of the stripes in the pause bar to indicate the ratio of likes and views
      // The stripes go from grey to blue as the number of likes increases
        if (likes>dislikes)
        {    
          if (likes<views/3) {var pauseLikes = (likes*3)/views;} else {var pauseLikes = 1;}
        }    
        else
        {
          var pauseLikes = 0;
        }
        var pauseR = ("00"+ Math.round(102-pauseLikes*102).toString(16)).substr(-2);
        var pauseG = ("00"+ Math.round(102-pauseLikes*34).toString(16)).substr(-2);
        var pauseB = ("00"+ Math.round(102+pauseLikes*119).toString(16)).substr(-2);    
        var waitStyle = "border-bottom: 4px dashed #"+pauseR+""+pauseG+""+pauseB+"; height: 0px;";
      }
    }
// Since sometimes the view < total when the counter isn't being paused, this gives a more vague message
    if (views < total)
    { 
      var likeStrengthMsg = ", View Count Incorrect"; 
      var waitStyle = "border-bottom: 4px dashed #0044dd; height: 0px;";
    }  
    if (waitStyle == "")
// Setting up the "Like Strength" bar
    {
      if (views < 2000)
      {
      // Videos with under 2000 views will have their view counts altered for the ratio
      // y = x + x * ((3000-x)/2000)  This is a curve where 200=500, 500=1000 and 2000=3000
        var viewLikeRatio2k = Math.round( (views + views * ((3000-views)/2000)) / (likes) );
      // Videos under 255 views get their ratio tweaked further, so 1 view 1 like isn't solid blue
        if (views < 255) 
        { var viewLikeRatio = Math.round( viewLikeRatio2k / (views/255) ); } 
          else
        { var viewLikeRatio = viewLikeRatio2k; }
      }
        else
      {      
      // Over 2000 views, the view count for the ratio is on a 1/3 line. (2000 is still 3000)
        var viewLikeRatio = Math.round( (views+7000) / 3 / (likes) );
      }
    // 255 'views' per like is the minimum Like Strength rating. Below 1 means there's an error
      if ((viewLikeRatio < 1) || (viewLikeRatio > 255))
      { 
        var likeStrengthMsg = "";
      }
        else 
      {
      // likeStrength is the percentage used for the blue bar and the title message
        var likeStrength = ((255-viewLikeRatio)/2.55);
      // likeStrengthLog uses a logarithmic scale for the blue bar width. 90 = 81%, 80 = 64%, 70 = 49%, etc
        var likeStrengthLog = ( likeStrength * likeStrength ) / 100;
      // likeStrengthMsg is added to the title of the div    
        var likeStrengthMsg = ", " + Math.round(likeStrength*10)/100 + " Like Strength";
      }
    }
  // Calculating the width of each section of the ratings bar
    if (likeStrengthLog > 0)
    {
      if (likeStrengthLog < (100*likes)/total)
      {
        var likeStrengthBar = likeStrengthLog;
        var purpleBar = 0;
        var likesBar = (100*likes)/total - likeStrengthLog;
        var dislikesBar = dislikes;
      }
      if (likeStrengthLog > (100*likes)/total)
      {
        var likeStrengthBar = 100 - (100*dislikes)/total;
        var purpleBar = likeStrengthLog - (100*likes)/total;
        var likesBar = 0;
        var dislikesBar = (100*dislikes)/total - purpleBar;
      }
    }
    else
    {
      var likeStrengthBar = 0;
      var purpleBar = 0;
      var likesBar = (100*likes)/total;
      var dislikesBar = dislikes;
    }
    var ratingDiv = document.createElement("div");
    ratingDiv.setAttribute("class", "video-extras-sparkbarks ratingContainer");
      ratingDiv.setAttribute("style", "position: relative; height: 4px" ); //top: 1px; padding-bottom: 11px; margin-bottom: -7px;" );
    ratingDiv.setAttribute("title",  likes + " Likes, " + dislikes + " Dislikes" + likeStrengthMsg);      
    var likeStrengthDiv = document.createElement("div");
    likeStrengthDiv.setAttribute("class", "video-extras-sparkbar-likes likeStrengthBar");
    likeStrengthDiv.setAttribute("id", "likeStrength");
    likeStrengthDiv.setAttribute("style", "height: 4px; width: " + likeStrengthBar + "%; background-color: #04d;"); 
    var purpleDiv = document.createElement("div");
    purpleDiv.setAttribute("class", "video-extras-sparkbar-likes purpleBar");
    purpleDiv.setAttribute("style", "height: 4px; width: " + purpleBar + "%; background-color: #84d;");
    var likesDiv = document.createElement("div");
    likesDiv.setAttribute("class", "video-extras-sparkbar-likes likesBar"); 
    if (waitStyle != "") {likesDiv.setAttribute("class", "video-extras-sparkbar-likes likesBar waitingBar");}
    likesDiv.setAttribute("style", "height: 4px; width: "+likesBar+"%; background: #0b2;" + waitStyle); 
    var dislikesDiv = document.createElement("div");
    dislikesDiv.setAttribute("class", "video-extras-sparkbar-dislikes dislikesBar"); 
    dislikesDiv.setAttribute("style", "height: 4px; width: 100%; background: #c00; margin-bottom: -4px;");
    var lsLinesDiv = document.createElement("div");
  // lsLines is a div showing the log scale used for the blue/purple bar, shown on mouse hover
    lsLinesDiv.setAttribute("class", "lsLines"); 
      lsLinesDiv.setAttribute("style", "background-size: 100%; width: "+ (likeStrengthBar + purpleBar) + "%; height: 4px; padding-bottom: 0px; position: absolute; background-repeat: none; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAECAYAAAB4FpoOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAATElEQVR42mL8f4Yhk4GBYSoDA4MZAwODKRL7DAMEZGIRYyBCjhQ15KilRA819GKaYfyfXDPggIlhFAwqMBohoxEyCvABAAAAAP//AwB+MBQF1ZMikwAAAABJRU5ErkJggg==);");
    if (dislikesBar > 0) {ratingDiv.appendChild(dislikesDiv);}
    if (likeStrengthBar > 0) {ratingDiv.appendChild(likeStrengthDiv);}
    if (purpleBar > 0) {ratingDiv.appendChild(purpleDiv);}
    if (likesBar > 0) {ratingDiv.appendChild(likesDiv);}
    if ((likeStrengthBar + purpleBar) > 0) {ratingDiv.appendChild(lsLinesDiv);}
    videoThumb.parentNode.appendChild(ratingDiv);
    //videoThumb.appendChild(ratingDiv);
    // fixing time element position to be inside of the thumb image
    var spans = videoThumb.parentNode.getElementsByTagName("span");
    for (var i=0; i<spans.length; ++i )
      if (spans[i].getAttribute("class")=="video-time")
      {
        spans[i].setAttribute("class", "video-time timeMoved");  
        spans[i].style.bottom = "4px";
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