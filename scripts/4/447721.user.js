// ==UserScript==
// @name          YouTube Ultimate
// @version       2.0.1
// @description   Improves Youtube in Lots of ways !
// @author        U BLESS (annlabv3[at]gmail.com)
// @co-authors    Blasium, vfede, Timid Script
// @match         http://www.youtube.com/*
// @match         https://www.youtube.com/*
// @icon          http://i.imgur.com/cdvhFZG.png
// @homepageURL   https://userscripts.org/scripts/show/447721
// @updateURL     https://userscripts.org/scripts/source/447721.meta.js
// @downloadURL   https://userscripts.org/scripts/source/447721.user.js
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

 /* 
 If you want to download youtube videos, 
 Install Youtube Links http://userscripts.org/scripts/show/110007
 
 If you want to download youtube mp3,
 Install Youtube to MP3 update 03.08.13 http://userscripts.org/scripts/show/119630 

 If you want to buffer the video, 
 Install YouTube - Auto-Buffer & Auto-HD http://userscripts.org/scripts/show/49366
 */

 // Youtube No Redirects/Search Result Ads

removeLinkTracking();
removePromotedNodes(document.getElementsByClassName("promoted-videos list-view yt-lockup-list pyv-promoted-videos"));
var intervalHandle = setTimeout(function () { removeAlerts(); }, 500);

function removeNode(id)
{
    var node = document.getElementById(id);
    if (node) node.parentNode.removeChild(node);
}


function removeAlerts()
{
    removeNode("alerts");
    removeNode("ticker");
}

function removePromotedNodes(eles)
{    
    for (i = 0; i < eles.length; i++)
    {        
        eles[0].parentNode.removeChild(eles[i]);
    }
}

function removeLinkTracking()
{
    var links = document.getElementsByClassName("yt-uix-redirect-link");
    for (var i = links.length - 1; i >= 0; --i) links[i].removeAttribute("class");
}

 // Youtube Thumbs Preview on hover

const LOOP_INTERVAL = 1000; 
var loopHandler, img, imgs;

document.addEventListener('mouseover', mo, false);

function mo(evt)
{
	if( evt.target.nodeName=='IMG' && evt.target.getAttribute('src') && evt.target.getAttribute('src').search(/default\.jpg$/)>-1 )
	{
		start(evt);
		evt.target.addEventListener('mouseout', end, false);		
	}
}

function start(evt)
{
	img = evt.target;
	imgZIndex(evt);
	img.setAttribute('src', img.getAttribute('src').replace(/\/[^\/]+\.jpg$/, '/1.jpg'));
	loopHandler = setInterval(loop, LOOP_INTERVAL);
}

function loop()
{
	if(!img){
		clearInterval(loopHandler)
		return;
	}
	var num = parseInt( img.getAttribute('src').match(/(\d)\.jpg$/)[1] );
	if(num==3) 
		num = 1;
	else 
		num++;
	img.setAttribute('src', img.getAttribute('src').replace(/\d\.jpg$/, +num+'.jpg')); 
}

function end(evt) 
{
	var node;
	clearInterval(loopHandler);
	evt.target.setAttribute('src', img.getAttribute('src').replace(/\/[^\/]+\.jpg$/, '/default.jpg'));
	img.style.zIndex = null;
	img = null;
}

function imgZIndex(evt) {
	if(GM_getValue('noButtons') || evt.ctrlKey){
		img.style.zIndex = '999999999';
	}else{
		img.style.zIndex = null;
	}	
}
 
 // YTRating
  
$(document).ready(function () {
	window.setInterval(function() { loadrating(); },900);
});

function loadrating(div,link)
{
	$('img[alt="Thumbnail"], img[data-thumb]').closest('a').each(function (i) {
		if( $(this).attr('done') == 1) return true;
		else $(this).attr('done','1');
	
		var that=this;
		var inda=i;
		var hrea = $(this).attr('href');
		if(hrea.indexOf('?v=')==-1) 
		{
			if($(this).closest('div[data-context-item-id]').length)
			{
				hrea = "/watch?v="+($(this).closest('div[data-context-item-id]').attr("data-context-item-id"));
			}
			else return true;
		}
		hrea = hrea.replace("&amp;","&");
		hrea=hrea+"&";
		var vidid = hrea.between('?v=','&');
		
		//alert(vidid);
	
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://gdata.youtube.com/feeds/api/videos/"+vidid+"?v=2",
			headers: {
				"Accept": "text/xml",
				"GData-Version": "2",
				"X-GData-Key": "key=AI39si59MgtnnLtTwZTnvZ--XNvnXWlYpVcDfYO8AJK-CJSmS3pTytqktlxTp3YVriK0IYGcx1z2BK1_ud1DEduKBAI7T3JdpQ"
			  },
			onload: function(resp) {
				var xmldat = new DOMParser().parseFromString(resp.responseText, "text/xml");
				var conti=resp.responseText;
				var rating = xmldat.getElementsByTagNameNS("http://gdata.youtube.com/schemas/2007","rating");
				if(conti.indexOf("yt:rating")!=-1)
				{
					var likes = rating[0].getAttribute("numLikes");
					var dislikes = rating[0].getAttribute("numDislikes");
				}
				else 
				{
					var likes="1";
					var dislikes="0";
				}
				//console.log("Ergebnis:"+likes+"/"+dislikes);
				likes=likes.replace('.', '');
				dislikes=dislikes.replace('.', '');
				if(likes.length>0 && conti.indexOf("action='rate' permission='denied'")==-1)
				{
					var resul = likes+"/"+dislikes;
					likes=parseInt(likes);
					dislikes=parseInt(dislikes);
					
					var dr = (likes/(likes+dislikes))*100;
					dr=Math.round(dr);

					if((likes+dislikes)>80)
					{
						if(dr > 70) $('.video-time', that).append("<label style='color:#82FA58;font-size:18px;'> "+dr+"%</label>");
						else if(dr > 40) $('.video-time', that).append("<label style='color:#C9C618;font-size:18px;'> "+dr+"%</label>");
						else $('.video-time', that).append("<label style='color:red;font-size:18px;'> "+dr+"%</label>");
					}
					else 
					{
						if((likes+dislikes)==0)	$('.video-time', that).append("<label style='color:#848484; font-size:18px;'> NO</label>");
						else $('.video-time', that).append("<label style='color:#848484; font-size:18px;'> "+dr+"%</label>");
					}
				}
				else 
				{
					$('.video-time', that).append("<label style='color:red;font-size:18px;'> OFF</label>");
				}
			}
		});
		//return false;
	});
}


String.prototype.between = function(prefix, suffix) {
s = this;
var i = s.indexOf(prefix);
if (i >= 0) {
s = s.substring(i + prefix.length);
}
else {
return '';
}
if (suffix) {
i = s.indexOf(suffix);
if (i >= 0) {
s = s.substring(0, i);
}
else {
return '';
}
}
return s;
}

 // Youtube Ratings Bar
 
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
    likesDiv.setAttribute("style", "height: 4px; width: "+(100*likes)/total+"%"); 

    var dislikesDiv = document.createElement("div");
    dislikesDiv.setAttribute("class", "video-extras-sparkbar-dislikes"); 
    dislikesDiv.setAttribute("style", "height: 4px; width: "+(100*dislikes)/total+"%;"+"background: #C00;"); 

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

 // ETC code 
 
iterateClips(document.getElementsByClassName(containerName));