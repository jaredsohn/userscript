// 4rthur highlightnew
// version 0.2.2
// 2005-04-22
// Copyright (c) 2005, Rob Sargant, mucked about with by munkt0n, mangled by boogs, pillaged by sargant again
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "4rthur quickreply", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          4rthur highlightnew
// @namespace     http://www.sargant.com
// @description   highlights all new posts since last refresh
// @include       http://4rthur.com/board/
// @include       http://*.4rthur.com/board/
// @include       http://4rthur.com/board/index.php*
// @include       http://*.4rthur.com/board/index.php*
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// Versions
//
// 0.1 - sargant
//         Initial script
//
// 0.1.1 - sargant
//         Fixed it somehow.  No idea.
//         Compatible with 4rthur quickReply 0.5.5 and above
//
// 0.2 - sargant
//         No, now it's fixed.  I'm thick.
//
// 0.2.1 - sargant
//         now with data:URI magic and classes instead of style altering.  orange bar doesn't distort text.
//
// 0.2.2 - sargant
//         previous/next bar.  boogs did it but i couldn't find the file, so I redid it.

window.GM_4rthur_postFinder_clicked = function(clicked)
{
  upLink = document.getElementById('GM_postFinder_upLink');
  downLink = document.getElementById('GM_postFinder_downLink');
  
  if(clicked == 1)
  {
    upLink.setAttribute('class', 'GM_4rthur_postFinderLinkDisabled_up');
    upLink.setAttribute('href', 'javascript:void(0);');
  }
  else
  {
    upLink.setAttribute('class', 'GM_4rthur_postFinderLink_up');
    upLink.setAttribute('href', 'javascript:GM_4rthur_postFinder_clicked('+(clicked-1)+')');
  }
  
  if(clicked == newPostArray.length)
  {
    downLink.setAttribute('class', 'GM_4rthur_postFinderLinkDisabled_down');
    downLink.setAttribute('href', 'javascript:void(0);');
  }
  else
  {
    downLink.setAttribute('class', 'GM_4rthur_postFinderLink_down');
    downLink.setAttribute('href', 'javascript:GM_4rthur_postFinder_clicked('+(clicked+1)+')');
  }
  
  window.location = '#GM_postFinder_' + newPostArray[clicked-1];
}

// Append a style class for new posts
document.getElementsByTagName('style')[0].innerHTML += 
".GM_newPost {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAABCAIAAACZnPOkAAAADklEQVR42mP8f4YBGQAAGjkBzd2FCVoAAAAASUVORK5CYII%3D); background-repeat: repeat-y; background-position: top left;}" +
".GM_postFinderNumber {color: #000; font-weight: bold}" + 
".GM_postFinderFloatingBoxTop {position: fixed; top: 100%; left: 100%; width: 195px; height: 16px;  padding: 2px 0px 0px 5px; margin: -16px 0px 0px -195px; background: #ccc; color: #000; font-size: 10px}" +

"a.GM_4rthur_postFinderLink_up {border: 1px solid #ccc; padding-left: 15px; margin: 0px 0px 0px 15px; color: #000; background: no-repeat center left  url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJCAYAAADkZNYtAAAAXklEQVR42mNgwALSjBn%2BMxAD0owZ%2Fv9%2Fx%2FCfoAaYwv9nIBinBnSFODWkGUMlVyEpXIXgwzQwouucuZuBgeEeBKd3otrOMussAyO%2BUECWZ8JwPNRUbIAFXSA9HXdoAQBS%2FkeOiv1d7gAAAABJRU5ErkJggg%3D%3D)}" + 
"a.GM_4rthur_postFinderLink_down {border: 1px solid #ccc; padding-left: 15px; margin: 0px 0px 0px 5px; color: #000; background: no-repeat center left  url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJCAYAAADkZNYtAAAAVUlEQVR42mNkQAJpxgz%2FGdDArLMMjAzYQJoxw%2F%2F%2F76D4DMN%2FdM1MWHXdg2I0wILNarxOQ7Ee6oT%2FZ3A7B6LhDBpehUUhVg34FKJoIEYhvvBmYGBgAADB7U7g%2BaQP9AAAAABJRU5ErkJggg%3D%3D)}" + 

"a.GM_4rthur_postFinderLink_up:hover {border-color: #ccc #666 #666 #ccc; padding-left: 15px; margin: 0px 0px 0px 15px;}" +
"a.GM_4rthur_postFinderLink_down:hover {border-color: #ccc #666 #666 #ccc; padding-left: 15px; margin: 0px 0px 0px 5px;}" +

"a.GM_4rthur_postFinderLinkDisabled_up, " + 
"a.GM_4rthur_postFinderLinkDisabled_up:hover {border: 1px solid #ccc; padding-left: 15px; margin: 0px 0px 0px 15px; color: #999; background: no-repeat center left url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJCAYAAADkZNYtAAAAVElEQVR42pXOwQ2AQAgEwMVYCc1RCyVQC73Qir68cAQx7pPMAkATd7%2B6OXUwIgAAIkKvOMMnuUATrAX6grlAZrYgM2%2BgLhh%2Fjgio6jIHfuSsZ6ffb0yNNtUd1TY4AAAAAElFTkSuQmCC)}" +
"a.GM_4rthur_postFinderLinkDisabled_down, " + 
"a.GM_4rthur_postFinderLinkDisabled_down:hover {border: 1px solid #ccc; padding-left: 15px; margin: 0px 0px 0px 5px; color: #999; background: no-repeat center left url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJCAYAAADkZNYtAAAAYElEQVR42pWOyw3AIAxDX6pOwnKMwAwZgVnYxavQEyiiUKnvlI%2Bd2Ai01nrsJZFzttHfLEja1gAXP7Dd60hKac4NoNbavy5Kwt1thj8ZhhDA4mI1ROFLHA2r8EgpZRvpAZHsM2%2BnM3z%2BAAAAAElFTkSuQmCC)}";

// Create vars
var allImages, thisImage, highestPostNumber, highestPostNumberMemory, newPostArray;

// Load the highest viewed post number from memory, and copy it to 2 variables
highestPostNumber = GM_getValue("highestPostNumber", 0);
highestPostNumberMemory = highestPostNumber;

newPostArray = new Array;

// Get refs to all images
allImages = document.getElementsByTagName('img');

for (var i = 0; i < allImages.length; i++)
{
  thisImage = allImages[i];
  
  thisImageSrc = thisImage.getAttribute('src');
  thisImageAlt = thisImage.getAttribute('alt');
  
  // Only process if you get the Terry Waite's radiator
  if(thisImageSrc == "/board/clip.png" && thisImageAlt == "permalink")
  {
    // Grab the number at the end (post ID)
    postNumber = thisImage.parentNode.getAttribute('href').match(/\d+$/)[0];
    if(postNumber > highestPostNumber)
    {
      // d'oh!  forgot to make sure the post number was the new highest
      // sargant 18/05/05
      if(postNumber > highestPostNumberMemory)
      {
        // assign a now higher number
        highestPostNumberMemory = postNumber;
      }
      // add the class to the new post
      thisImage.parentNode.setAttribute("name", "GM_postFinder_" + postNumber);
      newPostArray[newPostArray.length] = postNumber;
      thisImage.parentNode.parentNode.setAttribute("class", "GM_newPost " + thisImage.parentNode.parentNode.getAttribute("class"));
    }
  }
}

// Output a box containing all the new post details
if(newPostArray.length > 0)
{
  var floatingBox2 = document.createElement('div');
  floatingBox2.setAttribute('class', 'GM_postFinderFloatingBoxTop');

  floatingBox2.innerHTML = 
  " New posts: <span class='GM_postFinderNumber'>" + newPostArray.length + "</span> " + 
  "<a href='javascript:void(0)' id='GM_postFinder_upLink' class='GM_4rthur_postFinderLinkDisabled_up'>Up</a>" + 
  "<a href='javascript:GM_4rthur_postFinder_clicked(1)'  id='GM_postFinder_downLink' class='GM_4rthur_postFinderLink_down'>Down</a>";
  
  document.getElementsByTagName('body')[0].appendChild(floatingBox2);
}

// put the new highest value into memory.
GM_setValue("highestPostNumber", highestPostNumberMemory);