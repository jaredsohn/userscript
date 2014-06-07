//
// This is a Greasemonkey user script. 
//    To install it, you need to be running the Firefox web broswer and have
//    the Greasemonkey XUL extension installed. 
//    * You can download firefox at  http://www.mozilla.com/firefox/
//    * You can download greasemonkey at  http://greasemonkey.mozdev.org/
//    This version of the script was originally published at
//    http://userscripts.org/scripts/show/3377
//
// License: GNU General Public License, version 2 or higher (see http://www.gnu.org/copyleft/gpl.html)
//    READ THIS LICENSE BEFORE USING OR MODIFYING THIS SCRIPT'S CODE
//
// Testing: As of this version, the script was tested only on Fedora Linux 4 with
//    Firefox 1.5.0.1 and Greasemonkey 0.6.4 -- it has not been tested with any
//    other software setup.  If you are interested in providing feedback,
//    please do so by leaving comments on this script's page at
//    http://userscripts.org/scripts/show/3377
//
// Warning: This user script in no way represents epilogue.net or any of its
//    affiliates, and carries no warrantee of any kind.  Use of this
//    script is at the user's own risk.  In no way is it guaranteed to work or
//    to work safely. 
//
//    Also, do not expect this script to work if epilogue.net makes any
//    changes to their site structure or content.
//
// Version: ThumbPrint 0.2.1 beta (previously named ExtraThumb in v0.1)
//
// Changelog:
//    0.1 initial version
//    0.2 Moved buttons to a fixed position div bar, added invert-selection button, and changed many other features.
//    0.2.1 bugfix: alert box now (correctly) appears only the first time
//             zoom value is changed
//          bugfix: removing an image, enlarging other images, then
//             unremoving an image no longer distorts the zoom on that image.
//          feature: Added a button to remove hidden images
//          feature: Added a button to change image link targets to just the fullsize image
//          feature: Changing the zoom will now change the size of replaced thumbnails.
//          tweak: Tweaked the color scheme.  I still don't like it.
//          tweak: Changed the button organization on the fixed toolbar
//
// ==UserScript==
// @name           ThumbPrint
// @namespace      http://kimballrobinson.netfirms.com/userscripts
// @description    ThumbPrint is a tool for changing Epilogue.net thumbnails to target images.  Select images, invert selection, set zoom factor, hide images or view a page with just the images and their titles. (Last update March 14, 2006)
// @include        *.epilogue.net*
// ==/UserScript==
//
// Author:  Kimball Robinson
//    Finishing my degree to become a Bachelor of Science in Computer Science
//
// Email: k j r nine nine zero four four at yahoo dot com 
//    Do not expect a prompt reply at this email address.
//
// Known Bugs:
//    Once an image is enlarged to a zoom factor, it can't be changed again without reloading.


// document.getElementsByTagName('body').appendChild(document.createElement('div');

(function() {

   var buttonarea; // the div fixed DOM element with buttons.

   function addGlobalStyle(css) {
      // this function modified from another source, with permission from
      //    http://diveintogreasemonkey.org/patterns/add-css.html

      css = css.replace(/;/, " ! important;");
      var head, style;
      head = document.getElementsByTagName('head')[0];
      if (!head) { return; }
      style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      head.appendChild(style);
   }

   // addGlobalStyle('div.gmbutton  { cursor: pointer; width: 30%; border: solid 1px #dc3; font-size: small; color: #dc3; padding: 1px; margin: 3px; margin-right: 5px; background: #567; float: left; width: auto}');
   addGlobalStyle('span.gmbutton  { cursor: pointer; width: 30%; border: solid 1px #dc3; font-size: small; color: #dc3; padding: 1px; margin: 3px; margin-right: 5px; background: #567;}');
   addGlobalStyle('img.gmbutton   { cursor: pointer; border: solid 1px #dc3; color: #dc3; padding: 3px; margin-right: 5px; background: #567; float: left}');               
   addGlobalStyle('span.gmspacer  { opacity: 0; padding: 0; padding-left: 2em; margin: 0;}');
               
   // addGlobalStyle('.lowgmbutton     { margin: 0; cursor: pointer; font-size: small; border-right: solid 2px #000000; border-top: solid 2px #000000; border-left: solid 2px #000000; padding-right: 2px; padding-left: 2px; color: blue; padding: 0; background: #999999; height: 100%; width: 100%;}');

   var addedButtons = false; // whether the main buttons have been added. (only do it once)

   for (imageNum = 0 ; imageNum < document.images.length ; imageNum++)
   {
      var imgSrcLocation = document.images[imageNum].src;
      if (imgSrcLocation.match(/images.*thumb/))
      {
         // The first time I find a gallery image, I know I want some buttons
         // for the gallery as a whole.  If I never find a gallery image,
         // though, I should not display the button bar:
         if (!addedButtons)
         {
            addButtons();
         }

         buttonarea = document.getElementById('TNLbuttons');

         // find image parent...
         imageTdParent = document.images[imageNum].parentNode;
         for (i = 1; ! imageTdParent.tagName.match(/\btd\b/i); i++)
            imageTdParent = imageTdParent.parentNode;
         if (i > 4)
            imageTdParent = document.images[imageNum].parentNode; // went too far up the DOM tree. Just use the closest parent possible.

         imageSelectInstructions = document.createElement('div');
         imageTdParent.id              = "imgParentNode" + imageNum;
         document.images[imageNum].id  = "galleryPic" + imageNum ;
         imageSelectInstructions.id    = "selectInstructions" + imageNum;
         
         //determine image author...
         if (imageTdParent.innerHTML.match(/>\s*by\s+\b([^>]*)\b\s*</)
               || document.title.match(/\s*\b(\w+.*)\b\s+Gallery\s+-/)
               || imageTdParent.innerHTML.match(/href=.list\.pl.gallery=\d+.\>([^\<\>]+)\<\/a\>/i))
         {
            artistName = RegExp.$1;
            if (document.images[imageNum].alt)
               document.images[imageNum].alt = artistName + ".." + document.images[imageNum].alt;
            else 
               document.images[imageNum].alt = artistName + "..";
         }
         
         with (imageSelectInstructions.style)
         {
            background = "#aaa";
            border = "none";
            width = "90%";
            opacity = "0"; // SHOULD be changed while mouse hovers in the table cell
            margin = "1px";
            padding = "1px";
         }
         imageSelectInstructions.innerHTML = " <small><small> Click to (un)select<br>Ctrl or Shift-click to (un)hide </small></small>";
         imageTdParent.appendChild(imageSelectInstructions);


         imageTdParent.addEventListener("mouseover",
               function (evt) {
                  instructionId = this.id.replace(/imgParentNode/, "selectInstructions");
                  imageSelectInstructions = document.getElementById(instructionId);
                  if (imageSelectInstructions)
                     imageSelectInstructions.style.opacity = ".95";
               },
               true);

         imageTdParent.addEventListener("mouseout",
               function (evt) {
                  instructionId = this.id.replace(/imgParentNode/, "selectInstructions");
                  imageSelectInstructions = document.getElementById(instructionId);
                  if (imageSelectInstructions)
                     imageSelectInstructions.style.opacity = "0";
               },
               true);

         imageTdParent.addEventListener(
               "dblclick",
               function (evt) {
               },
               true);

         imageTdParent.addEventListener (
               "click",
               function (evt) {

                  if (buttonarea.style.display.match(/none/))
                  {
                     fadeinbuttons(0, "TNLbuttons", 1);
                     buttonarea.style.display = "block";
                  }

                  // shift click in cell: always hides image
                  // ctrl click in cell: hides image if non-image area was clicked
                  // click in cell: selects image unless a link was clicked (img or a tags)
                  if (! evt.target.tagName.match(/\ba\b|\bimg\b/i)
                     && ! evt.shiftKey
                     && ! evt.ctrlKey)
                  {
                     // Ctrl key 
                     imageID = this.id.replace(/imgParentNode/, "galleryPic");
                     imgSelected = document.getElementById(imageID);
                     toggleSelected(imgSelected);

                     evt.preventDefault();
                     evt.stopPropagation();
                  }
                  else if (evt.shiftKey || (evt.ctrlKey && !evt.target.tagName.match(/\ba\b|\bimg\b/)))
                  {
                     toggleHidden(this.id);

                     evt.preventDefault();
                     evt.stopPropagation();
                  }
               },
               true);
      }
   }

   function toggleHidden (imgParentId)
   {
      imageID = imgParentId.replace(/imgParentNode/i, "galleryPic");
      imgToChange = document.getElementById(imageID);
      LTNState = imgToChange.getAttribute("LTNState");

      // GM_log('hide-toggling with parent id ' + imgParentId);

      if (LTNState && LTNState.match(/hidden/i))
      {
         imgToChange.setAttribute('LTNState', LTNState.replace(/\s*\bhidden\b\s*/i, ' '));
         imgToChange.style.display = "inline";
      }
      else
      {
         if (LTNState)
            imgToChange.setAttribute('LTNState', LTNState + ' hidden');
         else
            imgToChange.setAttribute('LTNState', 'hidden');

         imgToChange.style.display = "none";
      }
   }

   function toggleSelected (img)
   {
      // overloaded function.
      toggleSelected(img, "auto");
   }

   function toggleSelected (img, toState)
   {
      if (! toState)
         toState = "auto";

      if (! img || ! img.src)
      {
         GM_log ("error: toggleSelected() called without a proper image: <" + img + ">");
         return;
      }

      var LTNState = img.getAttribute("LTNState");
      if (! LTNState)
         LTNState = "unselected";

      if (toState.match(/auto/i))
      {
         // if the image was already hidden, restore it:
         // imgToChange.height = imgToChange.getAttribute('thumbHeight');
         // imgToChange.width = imgToChange.getAttribute('thumbWidth');
         if (LTNState.match(/\bunselected\b/i))
            toState = "selected";
         else if (LTNState.match(/\bselected\b/i))
            toState = "unselected";
         // GM_log(img.alt + ': toggling select: auto -> ' + toState + ' because LTNState is ' + LTNState);
      }

      imgParent = document.getElementById(img.id.replace(/galleryPic/, "imgParentNode"));
      if (toState.match(/\bunselected\b/i))
      {
         // GM_log(img.alt + ': UNselecting');
         imgParent.style.background = imgParent.getAttribute("oldBg");
         imgParent.style.border = imgParent.getAttribute("oldBd");

         LTNState = LTNState.replace(/\s*\bselected\b/i, " unselected");
      }
      else if (toState.match(/\bselected\b/i))
      {
         // GM_log(img.alt + ': selecting');
         imgParent.setAttribute("oldBg", getComputedStyle(imgParent, '').background);
         imgParent.setAttribute("oldBd", getComputedStyle(imgParent, '').border);
         imgParent.style.background = '#edd';
         imgParent.style.border = 'red';

         LTNState = LTNState.replace(/\s*\bunselected\b/i, " selected");
      }
      else
      {
         // in some cases we do nothing (such as when LTNState = 'hidden')
      }

      img.setAttribute("LTNState", LTNState);
   }

   function fadeinbuttons(delayBeforeStart, id, fadeDurationInSeconds)
   {
      var timer = 0;
      // var id = "TNLbuttons"; // now an argument
      var numSecondsToFade = fadeDurationInSeconds // 1.5;
      var fadeSteps = 30;
      var stepSizeInMs = numSecondsToFade * 1000 / fadeSteps; // number of ms between each transition.
      var startDelay = (1 * delayBeforeStart) + (1 * stepSizeInMs); // fade won't start for 1000 ms

      
      // with the noScript extension, the setTimeout functionality might stop working.  This is a kludge workaround:
      document.getElementById(id).style.opacity = "1";
      setTimeout("document.getElementById('" + id + "').style.opacity = 0", 10); 

      //setTimeout("alert('there it is');", 1000);
      for (i = 0; i < 115; i += Math.ceil(115 / fadeSteps))
      {
         setTimeout("document.getElementById('" + id + "').style.opacity = " + (0 - Math.cos(Math.PI * i / 100)), Math.ceil(timer * stepSizeInMs + startDelay)); 
         timer++;
      }
      
   }

   function addButtons()
   {
      addedButtons = true;

      closeButtonImg = "data:image/gif,GIF89a%16%00%14%00%80%01%00%00%00%00%FF%FF%FF!%FE)Created%20with%20The%20GIMP%20by%20Kimball%20Robinson%00!%F9%04%01%0A%00%01%00%2C%00%00%00%00%16%00%14%00%00%028%04%82%A9%1B%86v%98%84%89Je%AB%BBm%AF%FCy%0C%F8%88%93H%5EV%CAA%2C%D7%99%B0%26%CFn%ADno%18%95%7D%FE%F3%B5p%AC%5D%8C7%3B%0A%93%CA%06%93%16(%00%00%3B";

      buttonarea = document.createElement('div');
      buttonarea.id = "TNLbuttons";
      buttonarea.innerHTML = ""
         + "<div style='margin: 3px'>"
         + "<img id='closeButton' class=gmbutton src='" + closeButtonImg + "'> "
         + "<span class=gmbutton id='imagesonly'>Show Selected in one page </span>  "
         + "<span class=gmbutton id='enlargeSelected'>Enlarge Selected</span>"
         + "<span class=gmbutton id='invertSelection'>Invert Selection</span>"
         + "<span class=gmbutton id='selectAll'>Select All</span> "
         + "<span class='gmspacer'></span><span class='gmspacer'></span>"
         + "<span class=gmbutton id='changeLinks'>redirect hyperlinks</span>"
         + "<span class=gmbutton id='removeHiddenImages'>Remove hidden</span>"
         + "<span class=gmbutton id='hideSelected'>(Un)Hide selected</span>"
         + "</div>"
         + "<input type=checkbox name='scaleonresize' id='scaleonresize' checked onclick=\"if (document.getElementById('enlargeScale').disabled) {document.getElementById('enlargeScale').disabled = false} else {document.getElementById('enlargeScale').disabled = true}\">"
         + "scale from thumbnail size: <input type=text id='enlargeScale' size=1>"
         + "(disable for 100%)<span class='gmspacer'></span><span style=\"color: #000; padding: 0; margin:1\"><small> Visit <a href='http://userscripts.org/scripts/show/3377'>here</a> to rate, comment, or check for updates on the ThumbPrint greasemonkey script.</small></span>"
         // + "<p style=\"font: x-large ! important; color: white; padding: 0; margin: 0;\">Inside image cells: <b>Click</b> to select image; <b>shift-click</b> to (un)hide image.</p>"
         ;

      // galleryElement.appendChild(buttonarea);
      document.body.appendChild(buttonarea);
      with (buttonarea.style)
      {
         zIndex = "9999";
         position = "fixed";
         opacity = ".5"; // this object will fade in.  But if it doesn't, it's still visible.
         top = "0";
         left = "10px";
         color = "white";
         width = "90%";
         background = "#5c718a";
         border = "1px solid #dc3"; // nicer gold color, perhaps too much like epilogue.net's color
         // border = "1px solid #fff"; // simple white border
         font = "white";
      }


      zoomTextField = document.getElementById("enlargeScale");
      zoomTextField.value = GM_getValue("zoom", 4); //keep a persistent zoom value
      zoomTextField.alt = "Change the zoom value.\nZoom is relative to the thumbnail sizes.\nThis value will be remembered between page visits.\nSet to zero to get full-sized images.";

      // now see that if the user wants to get rid of the buttonarea, all he has to do is click....
      closeButton = document.getElementById("closeButton");

      closeButton.addEventListener("click",
            function () {
               buttonarea.style.display = "none";
            },
            true);

      zoomTextField.addEventListener("change",
            function () {
               if (this.value > 10) {
                  this.value="9";
               }
               else if (this.value < 0)
               {
                  this.value="1";
               } 

               // newzoom = document.getElementById("enlargeScale").value;
               GM_setValue("zoom", this.value);
               alertedonce = GM_getValue("zoomwarnonce", false);
               if (! alertedonce)
               {
                  alert("Every time you change this zoom value it will be remembered on all pages for which this script is run." + this.value);
                  GM_setValue("zoomwarnonce", true);
               }

               // make sure all images already enlarged get this setting's effects...
               if (document.getElementById("scaleonresize").checked)
               {
                  for (imageNum = 0 ; imageNum < document.images.length ; imageNum++)
                  {
                     var img = document.images[imageNum];
                     var LTNState = img.getAttribute('LTNState');

                     if (LTNState && LTNState.match(/enlarged/i))
                     {
                        origH = img.getAttribute("origThumbHeight");
                        origW = img.getAttribute("origThumbWidth");
                        if (origH > 8)
                        {
                           img.height = origH * this.value;
                           img.width = origW * this.value;
                        }
                        else
                        {
                           // something is wrong.  Perhaps the original thumbnail never loaded.
                           // let's just suppose that most thumbnails are about 40x40.  This is probably a bad assumption, but I'll use it anyway.
                           hwratio = img.height / img.width;
                           img.width = 40 * this.value;
                           // img.height = img.width * hwratio;
                        }
                     }
                  }
               }
            },
            true);

      document.getElementById('hideSelected').addEventListener(
            "click",
            function()
            {
               for (imageNum = 0 ; imageNum < document.images.length ; imageNum++)
               {
                  var img = document.images[imageNum];
                  var LTNState = img.getAttribute('LTNState');

                  if (img.id && img.id.match(/galleryPic/i)
                     && LTNState && LTNState.match(/\bselected/i))
                  {
                     imgParentId = img.id.replace(/galleryPic/, "imgParentNode");
                     // toggleSelected(img);
                     toggleHidden(imgParentId);
                  }
               }
            },
            true);

      document.getElementById("removeHiddenImages").addEventListener(
            "click",
            function()
            {
               for (imageNum = 0 ; imageNum < document.images.length ; imageNum++)
               {
                  var img = document.images[imageNum];
                  if (img.id.match(/galleryPic/i))
                  {
                     var LTNState = img.getAttribute('LTNState');
                     // GM_log("removeHiddenImages: looking at image " + img.id + " of index " + imageNum + " with LTNState of " + LTNState + " and alt <" + img.alt + ">");

                     if (LTNState && LTNState.match(/hidden/i))
                     {
                        numImagesBeforeRemoval = document.images.length;
                        toggleSelected(img, "unselected");
                        document.getElementById(img.id.replace(/galleryPic/, "imgParentNode")).innerHTML = "";
                        // in case we removed some spacer images or other things, be sure to reset the index correctly:
                        imageNum -= (numImagesBeforeRemoval - document.images.length);
                     }
                  }
               }
            },
            true);

      document.getElementById("changeLinks").addEventListener(
            "click",
            function()
            {
               this.innerHTML = "Changing link targets...";
               this.style.background = "#333";
               this.style.color = "#2f2";

               for (imageNum = 0 ; imageNum < document.images.length ; imageNum++)
               {
                  var img = document.images[imageNum];
                  var LTNState = img.getAttribute('LTNState');
                  var imgAnchor;

                  if (img.parentNode.tagName.match(/\ba\b/i))
                     imgAnchor = img.parentNode;
                  else if (img.parentNode.parentNode.tagName.match(/\ba\b/i))
                     imgAnchor = img.parentNode;

                  if (img.src.match(/thumb\//) || LTNState && LTNState.match(/enlarged/))
                  {
                     imgAnchor.href = img.src.replace(/thumb\//, "");
                  }
               }

               this.innerHTML = "Link targets changed";
               this.style.background = "#000";
               this.style.color = "#ccc";
            },
            true);

      document.getElementById("enlargeSelected").addEventListener(
         "click",
         function ()
         {
            for (imageNum = 0 ; imageNum < document.images.length ; imageNum++)
            {
               var img = document.images[imageNum];
               var LTNState = img.getAttribute('LTNState');

               if (img.src.match(/images.*thumb/) 
                  && LTNState && LTNState.match(/\bselected/i))
               {
                  img.setAttribute("origThumbHeight", img.height);
                  img.setAttribute("origThumbWidth", img.width);
                  
                  toggleSelected(img); // don't leave it selected.
                  LTNState = img.getAttribute('LTNState');

                  // change the image source location to the larger image.
                  img.src = img.src.replace(/thumb\//, "");

                  // if the image knows its own width and height, this will work:
                  img.setAttribute("enlargedNaturalHeight", img.height);
                  img.setAttribute("enlargedNaturalWidth", img.width);

                  // change image scale
                  if (document.getElementById("scaleonresize").checked)
                  {
                     scale = document.getElementById("enlargeScale").value;

                     newImgHeight = Math.ceil(img.getAttribute("origThumbHeight") * scale);
                     newImgWidth = Math.ceil(img.getAttribute("origThumbWidth") * scale);

                     img.height = newImgHeight;
                     img.width = newImgWidth;
                  }
   
                  img.setAttribute('LTNState', LTNState + " enlarged");

                  imgParent = document.getElementById(img.id.replace(/galleryPic/, "imgParentNode"));
                  imgParent.style.background = "#ccf";
               }
            }
         },
         true);

      // Make an event listener for the button "imagesonly":
            // The anonymous function will re-write the document with image
            // data and images from the table cells containing the images.
      document.getElementById("imagesonly").addEventListener(
         "click",
         function ()
         {
            var imagesToShow = "";
            var numImgs = 0;
            for (imageNum = 0 ; imageNum < document.images.length ; imageNum++)
            {
               var imgSrcLocation = document.images[imageNum].src;
               var LTNState = document.images[imageNum].getAttribute("LTNState");

               // NOTE: we can't match the img.src to '.*thumb.*' since
               // some may already be enlarged versions:
               if (LTNState
                  && LTNState.match(/(\bselected|enlarged)/i)
                  && imgSrcLocation.match(/net\/users.*\.(jpg|jpeg|gif|pcx|pict|png|tga|tiff|xpm|pgm|exif|tga)$/i))
               {

                  numImgs++;
                  imagesToShow = imagesToShow + document.images[imageNum].parentNode.parentNode.innerHTML + "<br>\n";
               }
            }

            // replace all thumbnail source images with full image URLs:
            imagesToShow = imagesToShow.replace(/thumb\//g, "");
            // remove all height and width declarations.
            imagesToShow = imagesToShow.replace(/(height|width)\s*=[^\s]+/ig, "");
            // create the desired document with a header just like the current title:
            imagesToShow = "<h1>" + document.title + " (selected images)</h1><br>\ntotal " + numImgs + " images<br>\n" + imagesToShow + "\n\n<p>--end--</p>";

            document.write(imagesToShow);
            document.close();
         },
         true);

      document.getElementById("selectAll").addEventListener(
         "click",
         function ()
         {
            for (imageNum = 0 ; imageNum < document.images.length ; imageNum++)
            {
               var img = document.images[imageNum];
               var LTNState = img.getAttribute("LTNState");

               if (img.src.match(/images.*thumb/) && (! LTNState || LTNState.match(/unselected/)))
                  toggleSelected(img, "selected");
            }
         },
         true);

      document.getElementById("invertSelection").addEventListener(
         "click",
         function ()
         {
            for (imageNum = 0 ; imageNum < document.images.length ; imageNum++)
            {
               var imgSrcLocation = document.images[imageNum].src;
               if (imgSrcLocation.match(/images.*thumb/))
                  toggleSelected(document.images[imageNum]);
            }
         },
         true);

      //document.getElementById('TNLbuttons').addEventListener('click',
      window.addEventListener('load',
            function () {
               fadeinbuttons(500, "TNLbuttons", 1.5);
            },
            true);

      // buttonarea.addEventListener("mouseover",
      //       function (evt) {
      //          this.style.opacity = ".99";
      //       },
      //       true);

      // buttonarea.addEventListener("mouseout",
      //       function (evt) {
      //          this.style.opacity = ".80";
      //       },
      //       true);
   }
})();
