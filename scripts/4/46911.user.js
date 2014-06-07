// ==UserScript==
// @author         Andreas Jung (sd-daken.deviantart.com)
// @name           Improved tooltips for danbooru-based image boards
// @namespace      http://www.w3.org/1999/xhtml 
// @description    Improves the info tooltips of thumbnails (makes them look prettier and adds further information).
// @include        *
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//

var images = document.getElementsByTagName('img');
var previews = new Array();
var style_added = false;
var preview_timeout;
var previews_found = false;


function getPreviews() {
   //Get the preview images
   for (i = 0; i < images.length; i++) {
      imgclass = images[i].getAttribute('class');
      if (!imgclass) {
         imgclass = '';
      }
      if (imgclass.indexOf('preview') != -1) {
         previews[previews.length] = images[i];
      }
   }
   //Continue only if there are previews...
   if (previews.length > 0) {
      addStyles();
      addEventListeners();
      previews_found = true;
   }
}

function addStyles() {
   if(!style_added) {
      //Add styles to the site header
      head = document.getElementsByTagName('head')[0];
      style = head.appendChild(document.createElement('style'));
      style.setAttribute('type','text/css');
      style.appendChild(document.createTextNode('#tooltip{background-color: rgb(17, 17, 17); -moz-border-radius: 5px; min-height: 50px; min-width: 50px; max-width: 200px; z-index: 100; position: absolute; border: 2px solid white; padding: 5px; opacity: 0.95;}'));
      style.appendChild(document.createTextNode('.tooltipheader{font-weight: bold; line-height: 150%;}'));
      style.appendChild(document.createTextNode('#tooltip > a{font-size: 75%; color: white; font-family: verdana, sans-serif !important;}'));
      style.appendChild(document.createTextNode('#imgurl{display:none;}'));
      style_added = true;
   }
}

function addEventListeners() {
   //Add EventListeners to the previews
   for (i = 0; i < previews.length; i++) {
      previews[i].addEventListener('mouseover', function(){showInfo(this)} ,false);
      previews[i].addEventListener('mousemove', function(e){moveInfo(e)} ,false);
      previews[i].addEventListener('mouseout', function(){removeInfo(this)} ,false);
      previews[i].setAttribute('title','');
   }
}

function showInfo(img) {
   //Extract information from alt-attribute
   imgtitle = img.getAttribute('alt');

   try {
      imgrating = imgtitle.match(/Rating..\w*/i);
      imgrating = imgrating.toString().slice(7);
   }
   catch (e) {
   }

   try {
      imgscore = imgtitle.match(/Score..\w*/i);
      imgscore = imgscore.toString().slice(6);
   }
   catch (e) {
   }

   try {
      imgtags = imgtitle.match(/Tags.*User/i);
      imgtags = imgtags.toString().slice(6,(imgtags.toString().length - 4));
      imgtags = imgtags.replace(/\s/g,"\n");
   }
   catch (e) {
      try {
         imgtags = imgtitle.match(/(.*)rating/i)[1];
      }
      catch (e) {
         if (!imgscore && !imgrating) {
            imgtags = imgtitle.match(/.*/i);
         }
      }
   }

   try {
      imguser = imgtitle.match(/User..\w*/i);
      imguser = imguser.toString().slice(5);
   }
   catch (e) {
   }

   //DEBUG: are all information extracted correctly?
   //alert(imgrating + "\n" + imgtags + "\n" + imgscore + "\n" + imguser);

   body = document.getElementsByTagName('body')[0];

   //if an old tooltip still exists, remove it first
   if (document.getElementById('tooltip')) {
      body.removeChild(document.getElementById('tooltip'));
      window.clearTimeout(timeoutid);
   }

   //add tooltip and information
   tooltip = body.appendChild(document.createElement('div'));
   tooltip.setAttribute('id', 'tooltip');

   ratingheader = tooltip.appendChild(document.createElement('a'));
   ratingheader.appendChild(document.createTextNode('Rating: '));
   ratingheader.setAttribute('class', 'tooltipheader');
   ratingtext = tooltip.appendChild(document.createElement('a'));
   ratingtext.appendChild(document.createTextNode(imgrating));
   tooltip.appendChild(document.createElement('br'));

   scoreheader = tooltip.appendChild(document.createElement('a'));
   scoreheader.appendChild(document.createTextNode('Score: '));
   scoreheader.setAttribute('class', 'tooltipheader');
   scoretext = tooltip.appendChild(document.createElement('a'));
   scoretext.appendChild(document.createTextNode(imgscore));
   tooltip.appendChild(document.createElement('br'));

   tagsheader = tooltip.appendChild(document.createElement('a'));
   tagsheader.appendChild(document.createTextNode('Tags: '));
   tagsheader.setAttribute('class', 'tooltipheader');
   tagstext = tooltip.appendChild(document.createElement('a'));
   tagstext.appendChild(document.createTextNode(imgtags));
   tooltip.appendChild(document.createElement('br'));

   userheader = tooltip.appendChild(document.createElement('a'));
   userheader.appendChild(document.createTextNode('User: '));
   userheader.setAttribute('class', 'tooltipheader');
   usertext = tooltip.appendChild(document.createElement('a'));
   usertext.appendChild(document.createTextNode(imguser));
   tooltip.appendChild(document.createElement('br'));

   //Check if the href attribute begins with a slash, if not add one...
   var href_attr = img.parentNode.getAttribute('href');
   if (href_attr.slice(0, 1) != "/") href_attr = "/" + href_attr;

   //This is needed later to test if the the tooltip displayed when the request for additional
   //details was made is the sames as the one displayed at the moment
   imgurl = "http://" + window.location.hostname + href_attr;

   //we request additional details only if the tooltip is displayed longer than a second
   //to avoid unecessary network traffic
   timeoutid2 = window.setTimeout(function() {showAdditionalDetails("http://" + window.location.hostname + href_attr)}, 1000);

   //remove the tooltip automatically after 60 seconds
   timeoutid = window.setTimeout(function() {removeInfo()}, 60000);
   
}

function showAdditionalDetails(imgpg) {
   //DEBUG: is the correct URL provided?
   //alert(imgpg);

   //request additional details
   req = new XMLHttpRequest();
   req.open('GET', imgpg, true);
   req.onreadystatechange = function (aEvt) {
     if (req.readyState == 4) {
        if (req.status == 200) {
           response = req.responseText;
           stats = response.toString().match(/<li>.*?<\/li>/gim);

           imgid = "";
           imgdate = "";

           //extract additional details
           for (i = 0; i < stats.length; i++) {
              if (stats[i].toString().match(/Id.*/)) {
                 imgid = stats[i].toString();
                 imgid = imgid.slice(8, imgid.length - 5);
              }
              if (stats[i].toString().match(/Posted.*/)) {
                 try {
                    imgdate = stats[i].toString().match(/Posted.*/);
                    imgdate = imgdate.toString().match(/>.*<\/a> by/);
                    imgdate = imgdate.toString().slice(1, imgdate.toString().length - 7);
                 }
                 catch (e) {
                    try {
                       imgdate = stats[i].toString().match(/Posted.*/);
                       imgdate = imgdate.toString().match(/>(.*)<b/)[1];
                    }
                    catch (e) {
                    }
                 }
              }
           }

          if (imgid == "") imgid = imgpg.match(/post\/show\/([^/]*)/)[1];

           //DEBUG: are additional details extracted correctly?
           //alert(imgid + "\n" + imgdate);

           //Add details if the requesting tooltip is still displayed
           if (document.getElementById('tooltip') && (imgurl == imgpg)) {
              tooltip = document.getElementById('tooltip');

              idheader = tooltip.appendChild(document.createElement('a'));
              idheader.appendChild(document.createTextNode('Id: '));
              idheader.setAttribute('class', 'tooltipheader');
              idtext = tooltip.appendChild(document.createElement('a'));
              idtext.appendChild(document.createTextNode(imgid));
              tooltip.appendChild(document.createElement('br'));

              dateheader = tooltip.appendChild(document.createElement('a'));
              dateheader.appendChild(document.createTextNode('Added: '));
              dateheader.setAttribute('class', 'tooltipheader');
              datetext = tooltip.appendChild(document.createElement('a'));
              datetext.appendChild(document.createTextNode(imgdate));
              tooltip.appendChild(document.createElement('br'));
           }
           else {
              // DEBUG: requesting tooltip and displayed tooltip aren't the same.
              // This happens if the User stays long enough over the preview to start the request
              // but not long enough to have the information displayed. Nothing unusual.
              // The information might be intersting if the code fails unexpected.
              // alert(imgurl + "\n" + imgpg);
           }
        }
     }
   };
   req.send(null);
}

function moveInfo(coords) {
   X = coords.pageX;
   Y = coords.pageY;
   if (document.getElementById('tooltip')) {
      document.getElementById('tooltip').setAttribute('style', 'left:' + (X + 20) + 'px; top:' + (Y - 50) + 'px');
   }
}

function removeInfo(img) {
      if (document.getElementById('tooltip')) {
      body.removeChild(document.getElementById('tooltip'));
      window.clearTimeout(timeoutid);
      window.clearTimeout(timeoutid2);
   }
}

window.addEventListener("load", function() {
   getPreviews();
   if(previews_found) {
      window.addEventListener("DOMNodeInserted", function() {
         //This is needed if the content is loaded dynamically (e.g. by AutoPagerize)
         //The timeout is needed because else we will call getPreviews() way too often,
         //while the content is added (this would freeze the browser!).
         window.clearTimeout(preview_timeout);
         preview_timeout = window.setTimeout(getPreviews, 1500);
      }, false);
   }
}, false);