// ==UserScript==
// @author         Andreas Jung (sd-daken.deviantart.com)
// @name           Thumbnail tooltips for pixiv
// @namespace      http://www.w3.org/1999/xhtml 
// @description    Displays info tooltips on the thumbnail images on pixiv.
// @include        http://www.pixiv.net/*
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

images = document.getElementsByTagName('img');
previews = new Array();
var preview_timeout;

//Add styles to the site header
head = document.getElementsByTagName('head')[0];
style = head.appendChild(document.createElement('style'));
style.setAttribute('type','text/css');
style.appendChild(document.createTextNode('#tooltip{background-color: rgb(255, 255, 255); -moz-border-radius: 5px; min-height: 50px; min-width: 50px; max-width: 200px; z-index: 100; position: absolute; border: 2px solid black; padding: 5px; opacity: 0.85;}'));
style.appendChild(document.createTextNode('.tooltipheader{font-weight: bold; line-height: 150%;}'));
style.appendChild(document.createTextNode('#tooltip > a{font-size: 90%; color: black;}'));
style.appendChild(document.createTextNode('#imgurl{display:none;}'));

function getPreviews() {
   //Get the preview images
   for (i = 0; i < images.length; i++) {
      imgparenthref = images[i].parentNode.getAttribute('href');
      if (!imgparenthref) {
         imgparenthref = '';
      }
      if (imgparenthref.indexOf('member_illust.php?mode=medium') != -1) {
         previews[previews.length] = images[i];
      }
      if (imgparenthref.indexOf('index.php?mode=medium') != -1) {
         previews[previews.length] = images[i];
      }
   }
   addEventListeners();
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
   //Extract ID
   imgid = img.parentNode.getAttribute('href');
   imgid = imgid.toString().match(/illust_id=(\d*)/i)[1];

   //DEBUG: are all information extracted correctly?
   //alert(imgid);

   body = document.getElementsByTagName('body')[0];

   //if an old tooltip still exists, remove it first
   if (document.getElementById('tooltip')) {
      body.removeChild(document.getElementById('tooltip'));
      window.clearTimeout(timeoutid);
   }

   //add tooltip and information
   tooltip = body.appendChild(document.createElement('div'));
   tooltip.setAttribute('id', 'tooltip');

   idheader = tooltip.appendChild(document.createElement('a'));
   idheader.appendChild(document.createTextNode('ID: '));
   idheader.setAttribute('class', 'tooltipheader');
   idtext = tooltip.appendChild(document.createElement('a'));
   idtext.appendChild(document.createTextNode(imgid));
   tooltip.appendChild(document.createElement('br'));

   //This is needed later to test if the the tooltip displayed when the request for additional
   //details was made is the sames as the one displayed at the moment
   imgurl = "http://" + window.location.hostname + "/" + img.parentNode.getAttribute('href');

   //we request additional details only if the tooltip is displayed longer than a second
   //to avoid unecessary network traffic
   timeoutid2 = window.setTimeout(function() {showAdditionalDetails("http://" + window.location.hostname + "/" + img.parentNode.getAttribute('href'))}, 1000);

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

           imgdate = response.toString().match(/\d\d\d\d.\d\d.\d\d.\s\d\d.\d\d/gim);

           imgrating = response.toString().match(/div\s*id="rating".*\n.*/gim);
           imgrating = imgrating.toString().match(/\d*\w*<br/);
           imgrating = imgrating.toString().slice(0, (imgrating.toString().length - 3));

           imguser = response.toString().match(/member\.php.*img.*\/a/gim);
           imguser = imguser.toString().match(/alt="[^"]*"/gim)[0];
           imguser = imguser.toString().match(/"(.*)"/i)[1];

           //DEBUG: are additional details extracted correctly?
           //alert(imgrating + "\n" + imgdate + "\n" + imguser);

           //Add details if the requesting tooltip is still displayed
           if (document.getElementById('tooltip') && (imgurl == imgpg)) {
              tooltip = document.getElementById('tooltip');

              dateheader = tooltip.appendChild(document.createElement('a'));
              dateheader.appendChild(document.createTextNode('Added: '));
              dateheader.setAttribute('class', 'tooltipheader');
              datetext = tooltip.appendChild(document.createElement('a'));
              datetext.appendChild(document.createTextNode(imgdate[0]));
              tooltip.appendChild(document.createElement('br'));

              ratingheader = tooltip.appendChild(document.createElement('a'));
              ratingheader.appendChild(document.createTextNode('Rating: '));
              ratingheader.setAttribute('class', 'tooltipheader');
              ratingtext = tooltip.appendChild(document.createElement('a'));
              ratingtext.appendChild(document.createTextNode(imgrating));
              tooltip.appendChild(document.createElement('br'));

              userheader = tooltip.appendChild(document.createElement('a'));
              userheader.appendChild(document.createTextNode('User: '));
              userheader.setAttribute('class', 'tooltipheader');
              usertext = tooltip.appendChild(document.createElement('a'));
              usertext.appendChild(document.createTextNode(imguser));
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
      document.getElementById('tooltip').setAttribute('style', 'left:' + (X + 20) + 'px; top:' + (Y - 70) + 'px');
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
   window.addEventListener("DOMNodeInserted", function() {
      //This is needed if the content is loaded dynamically (e.g. by AutoPagerize)
      //The timeout is needed because else we will call getPreviews() way too often,
      //while the content is added (this would freeze the browser!).
      window.clearTimeout(preview_timeout);
      preview_timeout = window.setTimeout(getPreviews, 1500);
   }, false);
}, false);