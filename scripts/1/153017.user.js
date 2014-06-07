// ==UserScript==
// @name          4Chan image post filter
// @description	  Allows you to filter out all non-image 4chan posts
// @author        thingywhat
// @include       http://boards.4chan.org/*/res/*
// ==/UserScript==

function removeNonImage()
{
  var posts = document.querySelectorAll('div.postContainer.replyContainer');

  for(var i = 0; i < posts.length; i++)
    if(posts[i].querySelector('div.file') === null)
      posts[i] = false;

  document.querySelector('div.thread').innerHTML = '';

  for(var i = 0; i < posts.length; i++)
    if(posts[i])
      document.querySelector('div.thread').innerHTML += posts[i].innerHTML;

    document.querySelector('span.removeNonImg').innerHTML = '';
}

document.addEventListener("DOMContentLoaded",
			  function(){
  document.querySelector('div.navLinks').innerHTML
    += '<span class="removeNonImg">[ <a href="#" onClick="removeNonImage()">'
      + 'Remove non-image posts</a> ]</span>';
  },
			  false);

