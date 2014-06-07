// TheMarker Tv video user script
// version 1.0
// 2010-04-05
// Copyright (c) 2010 Alon C 
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
// ==UserScript==
// @name           Fix TheMarker Tv
// @namespace      urn:alonc:greasemonkey:scripts:themarkertv
// @description    Fix video playback on TheMarker Tv
// @include        http://*.cast-tv.biz/play/*
// ==/UserScript==


   fixVideoWithoutAutoPlay();
   fixVideoTag();

   function fixVideoWithoutAutoPlay()
   {
      try
      {
         var LayerDef = document.getElementById("LayerDef")
         var span = LayerDef.getElementsByTagName("span")[0];
         span.addEventListener('click', function(event) {
               setTimeout(function() {fixVideoTag();}, 500);
            }, true);

         var centers = document.getElementsByTagName("center");
         if(centers[1] != null)
         {
            center = centers[1];
            var a = center.getElementsByTagName("a");
            if(a[0] != null)
            {
               center.removeChild(a[0]);
            }
         }
      }
      catch(err)
      {
      }
   }

   function fixVideoTag()
   {
      var playerObject;
      var player;

      playerObject = document.getElementById("Player");
      if (playerObject != null)
      {
         var div = document.createElement("div");
         div.id="PlayerDiv";

         var player = document.createElement("embed");
         player.id="Player";
         player.type="video/x-ms-wvx";
         player.name="plugin";
         player.height=playerObject.height;
         player.width=playerObject.width;
         player.src=playerObject.data;

         playerObject.parentNode.replaceChild(player, playerObject);

         createLink(div, player.src);
      }

      var playerObject=document.getElementsByName("MediaPlayer");
      for (var i=0; i<playerObject.length; i++) 
      {
         var div = document.createElement("div");
         div.id="PlayerDiv";

         var player = document.createElement("embed");
         player.id="Player";
         player.type="video/x-ms-wvx";
         player.name="plugin";
         player.height=playerObject[i].height;
         player.width=playerObject[i].width;
         player.src=playerObject[i].src;
         div.appendChild(player);

         playerObject[i].parentNode.replaceChild(div, playerObject[i]);

         createLink(div, player.src);
      }

   }

   function createLink(container, url)
   {
      var center;
   
      var centers = document.getElementsByTagName("center");
      if(centers[0] != null)
      {
         center = centers[0];
         var a = center.getElementsByTagName("a");
         if(a[0] != null)
         {
            center.removeChild(a[0]);
         }
      }
      else
      {
         center = document.createElement("center");
      }

      //create link
      var VideoLink = document.createElement("a");
      VideoLink.setAttribute("href", url);
      var str = document.createTextNode("Direct Link to Video");
      VideoLink.appendChild(str);
      //add link to center element
      center.appendChild(VideoLink);
      //add center element to the container  
      container.appendChild(center);

   }


