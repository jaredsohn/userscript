// ==UserScript==
// @name           Youtube-embedder
// @namespace      http://www.vof.se
// @include        http://www.vof.se/forum/*
// @author           C-J
// ==/UserScript==

//Skrev det här med jquery men det var jobbigt att få det att fungera i chrome.
//Vägrar använda den redan inlästa jqueryn.

var allAnchors = document.getElementsByTagName('a');

for (i = 0; i <allAnchors.length; i++)
{
   var currentAnchor = allAnchors[i];
   var parent = currentAnchor.parentNode;
   
   //Signaturer ligger i en span, resten av posten ligger i en div.
   if (currentAnchor.href.match(/http:\/\/.*?youtube\.com\/watch\?/i) && parent.localName != "SPAN" && parent.classname != "signature")
   {
      ShowYoutubeVideo(currentAnchor, i);
   }

        //TODO: Lägg till andra tillägg som påverkar länkar här
}


function ShowYoutubeVideo(anchorElement, index)
{
   try
   {
      var video = document.createElement("div");
      video.id = "insertedVideo" + index;
      video.style.width = '425px';
      video.style.height = '350px';
      anchorElement.parentNode.insertBefore(video, anchorElement);
      
      var videoId = anchorElement.href.match(/watch\?v=.{11}/).toString();
      videoId = videoId.substr(8);
      
      video.innerHTML = "<object width=\"425\" height=\"350\"><param name=\"movie\" value=\"http://www.youtube.com/v/\
%VIDEOID%\"></param><param name=\"wmode\" value=\"transparent\"></param><embed src=\
\"http://www.youtube.com/v/%VIDEOID%\" type=\"application/x-shockwave-flash\" wmode=\"transparent\" \
width=\"425\" height=\"350\"></embed></object>";
      
      video.innerHTML = video.innerHTML.replace(/%VIDEOID%/g, videoId);
   }
   catch (e)
   {
      //No embed for you.
   }
}